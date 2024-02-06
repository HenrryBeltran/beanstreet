import { db } from "@/drizzle";
import { Try } from "@/utils/safeTry";
import camelcaseKeys from "camelcase-keys";
import { sql } from "kysely";
import { jsonArrayFrom } from "kysely/helpers/postgres";
import { cookies } from "next/headers";
import snakecaseKeys from "snakecase-keys";
import { v4 as uuid_v4 } from "uuid";
import { z } from "zod";
import { cookiesOptions } from "../../auth/cookiesOptions";
import { addItemToCartSchema } from "./cartSchema";

type Context = {
  params: {
    slug: string;
  };
};

export async function POST(req: Request, ctx: Context) {
  const body = await req.json();
  const validateItemOrder = addItemToCartSchema.safeParse(body);

  if (!validateItemOrder.success) {
    return Response.json(
      {
        message: "Invalid fields",
        error: validateItemOrder.error.flatten().fieldErrors,
      },
      { status: 403 },
    );
  }

  const cookieStore = cookies();
  let userSession = cookieStore.get("sid")?.value ?? null;
  let guestSession = cookieStore.get("gid")?.value ?? null;

  if (userSession) {
    const validateSession = z.string().uuid().safeParse(userSession);

    if (!validateSession.success) {
      userSession = null;
    }
  }

  if (guestSession) {
    const validateSession = z.string().uuid().safeParse(guestSession);

    if (!validateSession.success) {
      guestSession = null;
    }
  }

  // if user don't have a guest id, then provide one
  if (!userSession && !guestSession) {
    guestSession = uuid_v4();
  }

  const { error: userError, result: foundUser } = await Try(
    db
      .selectFrom("user")
      .select("id")
      .where("user.session", "=", userSession)
      .executeTakeFirst(),
  );

  if (userError) {
    return Response.json({ error: userError }, { status: 500 });
  }

  if (foundUser === undefined && guestSession) {
    cookieStore.set("gid", guestSession, cookiesOptions);
  }

  const userId = foundUser?.id ?? null;
  const validData = snakecaseKeys(validateItemOrder.data);

  const slug = ctx.params.slug;

  let unitPrice: string;
  let unitPriceWDiscount: string;
  let discount: number | null;

  if (validData.type === "sandwich") {
    const { error: sandwichError, result: sandwichResult } = await Try(
      db
        .selectFrom("sandwich")
        .leftJoin("offer", "offer.id", "sandwich.offer_id")
        .select(({ ref }) => [
          "sandwich.id",
          "sandwich.name",
          "sandwich.slug",
          "sandwich.description",
          "sandwich.section_name",
          "sandwich.section_slug",
          "sandwich.type",
          "sandwich.base_price",
          sql<string | null>`cast(${ref("base_price")} * (1.00 - (${ref(
            "offer.discount",
          )} * 0.01)) as numeric(100, 2))`.as("price_w_discount"),
          "offer.discount",
        ])
        .where("sandwich.slug", "=", slug!)
        .executeTakeFirst(),
    );

    if (sandwichError) {
      return Response.json({ error: sandwichError }, { status: 500 });
    }

    if (sandwichResult === undefined) {
      return Response.json({ message: "Sandwich not found" }, { status: 404 });
    }

    const sandwich = camelcaseKeys(sandwichResult, {
      deep: true,
      preserveConsecutiveUppercase: true,
    });

    unitPrice = sandwich.basePrice;
    unitPriceWDiscount = (
      Number(unitPrice) *
      ((100 - (sandwich.discount ?? 0)) / 100)
    ).toFixed(2);
    discount = sandwich.discount;
  } else if (validData.type === "pastrie") {
    const { error: pastrieError, result: pastrieResult } = await Try(
      db
        .selectFrom("pastrie")
        .leftJoin("offer", "offer.id", "pastrie.offer_id")
        .select(({ ref }) => [
          "pastrie.id",
          "pastrie.name",
          "pastrie.slug",
          "pastrie.description",
          "pastrie.section_name",
          "pastrie.section_slug",
          "pastrie.type",
          "pastrie.base_price",
          sql<string | null>`cast(${ref("base_price")} * (1.00 - (${ref(
            "offer.discount",
          )} * 0.01)) as numeric(100, 2))`.as("price_w_discount"),
          "offer.discount",
          "pastrie.warmed",
        ])
        .where("pastrie.slug", "=", slug!)
        .executeTakeFirst(),
    );

    if (pastrieError) {
      return Response.json({ error: pastrieError }, { status: 500 });
    }

    if (pastrieResult === undefined) {
      return Response.json({ message: "Pastrie not found" }, { status: 404 });
    }

    const pastrie = camelcaseKeys(pastrieResult, {
      deep: true,
      preserveConsecutiveUppercase: true,
    });

    unitPrice = pastrie.basePrice;
    unitPriceWDiscount = (
      Number(unitPrice) *
      ((100 - (pastrie.discount ?? 0)) / 100)
    ).toFixed(2);
    discount = pastrie.discount;
  } else {
    const { error: drinkError, result: drinkResult } = await Try(
      db
        .selectFrom("drink")
        .leftJoin("offer", "offer.id", "drink.offer_id")
        .leftJoin("size", "size.id", "drink.default_size")
        .leftJoin("milk", "milk.id", "drink.default_milk")
        .select(({ ref }) => [
          "drink.id",
          "drink.name",
          "drink.slug",
          "drink.description",
          "drink.section_name",
          "drink.section_slug",
          "drink.type",
          "drink.default_sweetener",
          "drink.sweetener_tsp",
          "milk.name as default_milk",
          "size.name as default_size",
          sql<string>`CAST(${ref("base_price")} + ${ref(
            "size.extra_cost",
          )} + COALESCE(${ref("milk.extra_cost")}, 0.00) AS numeric(100, 2))`.as("price"),
          sql<string | null>`CAST((${ref("base_price")} + ${ref(
            "size.extra_cost",
          )} + COALESCE(${ref("milk.extra_cost")}, 0.00)) * (1.00 - (${ref(
            "offer.discount",
          )} * 0.01)) AS numeric(100, 2))`.as("price_w_discount"),
          "drink.base_price",
          "offer.discount",
          jsonArrayFrom(
            db
              .selectFrom("milk")
              .leftJoin("milk_option", "milk_option.milk_id", "milk.id")
              .leftJoin("drink", "drink.id", "milk_option.drink_id")
              .select(["milk.id", "milk.name", "milk.extra_cost"])
              .where("drink.slug", "=", slug!)
              .orderBy("milk.order asc"),
          ).as("milk_options"),
          jsonArrayFrom(
            db
              .selectFrom("size")
              .leftJoin("size_option", "size_option.size_id", "size.id")
              .leftJoin("drink", "drink.id", "size_option.drink_id")
              .select(["size.id", "size.name", "size.unit", "size.extra_cost"])
              .where("drink.slug", "=", slug!)
              .orderBy("size.order asc"),
          ).as("size_options"),
        ])
        .where("drink.slug", "=", slug!)
        .executeTakeFirst(),
    );

    if (drinkError) {
      return Response.json({ error: drinkError }, { status: 500 });
    }

    if (drinkResult === undefined) {
      return Response.json({ message: "Drink not found" }, { status: 404 });
    }

    const drink = camelcaseKeys(drinkResult, {
      deep: true,
      preserveConsecutiveUppercase: true,
    });

    const size = drink.sizeOptions.find((size) => size.name === validData.size);
    const milk = drink.milkOptions.find((milk) => milk.name === validData.milk);

    const sizeExtraCost = size?.extraCost ?? "0.00";
    const milkExtraCost = milk?.extraCost ?? "0.00";

    unitPrice = (
      Number(sizeExtraCost) +
      Number(milkExtraCost) +
      Number(drink.basePrice)
    ).toFixed(2);
    unitPriceWDiscount = (
      Number(unitPrice) *
      ((100 - (drink.discount ?? 0)) / 100)
    ).toFixed(2);
    discount = drink.discount;
  }
  const { error } = await Try(
    db
      .insertInto("cart_item")
      .values({
        ...validData,
        unit_price: unitPrice,
        unit_price_w_discount: unitPriceWDiscount,
        discount: discount,
        user_id: userId,
        guest_id: guestSession,
      })
      .execute(),
  );

  if (error) {
    return Response.json(
      { message: "Database Error: Failed to save item in the cart", error },
      { status: 500 },
    );
  }

  return Response.json({ message: "Item saved in your cart" });
}
