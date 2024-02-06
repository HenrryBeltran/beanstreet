import { db } from "@/drizzle";
import { Try } from "@/utils/safeTry";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2023-10-16" });
const endpointSecret = process.env.STRIPE_WEBHOOK_KEY as string;

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return Response.json({ message: "Only POST request are allowed." }, { status: 500 });
  }

  const body = await req.json();

  let event;
  const payloadString = JSON.stringify(body, null, 2);

  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret,
  });

  try {
    event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
  } catch (error) {
    return new Response(`Webhook Error: ${(error as { message: string }).message}`, {
      status: 400,
    });
  }

  if (event.type === "checkout.session.completed") {
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      { expand: ["line_items"] },
    );

    const lineItems = sessionWithLineItems.line_items;

    if (!lineItems) {
      return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }

    const userEmail = event.data.object.customer_email;

    const { error: deleteError, result: cartItem } = await Try(
      db
        .deleteFrom("cart_item")
        .using("user")
        .where(({ eb, and, ref }) =>
          and([
            eb("cart_item.user_id", "=", ref("user.id")),
            eb("user.email", "=", userEmail),
          ]),
        )
        .returning([
          "cart_item.id",
          "cart_item.name",
          "cart_item.slug",
          "cart_item.size",
          "cart_item.size_unit",
          "cart_item.milk",
          "cart_item.type",
          "cart_item.sweetener",
          "cart_item.sweetener_tsp",
          "cart_item.warmed",
          "cart_item.adjust_order",
          "cart_item.unit_price",
          "cart_item.unit_price_w_discount",
          "cart_item.discount",
          "cart_item.quantity",
          "cart_item.url",
          "cart_item.user_id",
          "cart_item.created_at",
          "cart_item.updated_at",
        ])
        .execute(),
    );

    if (deleteError) {
      return Response.json(
        {
          message: "Database Error: Error trying to delete the user cart",
          error: deleteError,
        },
        { status: 500 },
      );
    }

    const cart = camelcaseKeys(cartItem, { preserveConsecutiveUppercase: true });

    const { error: orderError, result: order } = await Try(
      db
        .insertInto("order")
        .values({
          grand_total_price: cart
            .map((item) =>
              (Number(item.unitPriceWDiscount ?? item.unitPrice) * item.quantity).toFixed(
                2,
              ),
            )
            .reduce((acc, currentValue) =>
              (Number(acc) + Number(currentValue)).toFixed(2),
            ),
        })
        .returning("id")
        .executeTakeFirst(),
    );

    if (orderError) {
      return Response.json(
        {
          message: "Database Error: Creating an order",
          error: orderError,
        },
        { status: 500 },
      );
    }

    const insertCart = snakecaseKeys(cart);

    const { error: itemError } = await Try(
      db
        .insertInto("order_item")
        .values(insertCart.map((item) => ({ ...item, order_id: order?.id })))
        .execute(),
    );

    if (itemError) {
      return Response.json(
        {
          message: "Database Error: Creating an order item",
          error: itemError,
        },
        { status: 500 },
      );
    }

    return new Response();
  }

  return new Response();
}
