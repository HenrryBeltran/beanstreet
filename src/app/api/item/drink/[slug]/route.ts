import { db } from "@/drizzle";
import { Try } from "@/utils/safeTry";
import { sql } from "kysely";
import { jsonArrayFrom } from "kysely/helpers/postgres";

type Context = {
  params: {
    slug: string;
  };
};

export async function GET(_: Request, ctx: Context) {
  const slug = ctx.params.slug;

  const { error, result } = await Try(
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
            .select(["size.id", "size.name", "size.unit", "extra_cost"])
            .where("drink.slug", "=", slug!)
            .orderBy("size.order asc"),
        ).as("size_options"),
      ])
      .where("drink.slug", "=", slug!)
      .executeTakeFirst(),
  );

  if (error) {
    return Response.json(
      { message: "Database Error: Failed to get item", error },
      { status: 500 },
    );
  }

  if (result === undefined) {
    return Response.json(
      { message: "Database Error: Failed to get drink" },
      { status: 500 },
    );
  }

  return Response.json({ result });
}
