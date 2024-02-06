import { db } from "@/drizzle";
import { Try } from "@/utils/safeTry";
import camelcaseKeys from "camelcase-keys";
import { cookies } from "next/headers";
import Stripe from "stripe";
import { z } from "zod";
import { authenticate } from "../../auth/authenticate";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2023-10-16" });

const itemOrderSchema = z.object({ id: z.string().uuid().array() });

export async function POST(req: Request) {
  const cookieStore = cookies();
  const sid = cookieStore.get("sid")?.value;

  const { error: authError, result: authResult } = await Try(authenticate({ sid }));

  if (authError) {
    return Response.json({ error: authError }, { status: 500 });
  }

  if (!authResult.foundUserSession) {
    return Response.json(
      { message: authResult.message, error: authResult.error },
      { status: authResult.status },
    );
  }

  const body = await req.json();
  const validateItemOrder = itemOrderSchema.safeParse(body);

  if (!validateItemOrder.success) {
    return Response.json(
      {
        message: "Invalid fields",
        error: validateItemOrder.error.flatten().fieldErrors,
      },
      { status: 403 },
    );
  }

  const { error, result } = await Try(
    db
      .selectFrom("cart_item")
      .select([
        "id",
        "name",
        "size",
        "size_unit",
        "milk",
        "sweetener",
        "sweetener_tsp",
        "warmed",
        "adjust_order",
        "unit_price",
        "unit_price_w_discount",
        "discount",
        "quantity",
      ])
      .where((eb) =>
        eb.or(validateItemOrder.data.id.map((itemId) => eb("id", "=", itemId))),
      )
      .execute(),
  );

  if (error) {
    return Response.json({ error }, { status: 500 });
  }

  const items = camelcaseKeys(result, { preserveConsecutiveUppercase: true });

  const { error: checkoutError, result: checkoutSession } = await Try(
    stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: authResult.foundUserSession.email,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pick-up`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      line_items: items.map((item) => {
        const price = item.unitPriceWDiscount ?? item.unitPrice;
        const unitPriceCents = Number(price) * 100;

        const description = [
          item.size !== null ? `${item.size} - ${item.sizeUnit}` : null,
          item.milk !== null && item.milk === "None" ? null : item.milk,
          item.sweetener === null || item.sweetener === false
            ? null
            : `Sugar - ${item.sweetenerTsp} tsp`,
          item.warmed === null ? null : item.warmed,
          item.adjustOrder,
        ]
          .filter((n) => n)
          .join(", ");

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              description: description === "" ? undefined : description,
            },
            unit_amount: unitPriceCents,
          },
          quantity: item.quantity,
        };
      }),
    }),
  );

  if (checkoutError) {
    return Response.json({ error: checkoutError }, { status: 500 });
  }

  return Response.json({ checkoutUrl: checkoutSession.url });
}
