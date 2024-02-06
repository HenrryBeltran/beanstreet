import { db } from "@/drizzle";
import { Try } from "@/utils/safeTry";
import { sql } from "kysely";

export async function GET() {
  const { error, result } = await Try(
    db
      .selectFrom("drink")
      .leftJoin("offer", "offer.id", "drink.offer_id")
      .leftJoin("size", "size.id", "drink.default_size")
      .leftJoin("milk", "milk.id", "drink.default_milk")
      .select(({ ref }) => [
        "drink.name",
        "drink.slug",
        "drink.section_name",
        "drink.section_slug",
        "drink.type",
        sql<string>`CAST(${ref("base_price")} + ${ref(
          "size.extra_cost",
        )} + COALESCE(${ref("milk.extra_cost")}, 0.00) AS numeric(100, 2))`.as("price"),
        sql<string | null>`CAST((${ref("base_price")} + ${ref(
          "size.extra_cost",
        )} + COALESCE(${ref("milk.extra_cost")}, 0.00)) * (1.00 - (${ref(
          "offer.discount",
        )} * 0.01)) AS numeric(100, 2))`.as("price_w_discount"),
        "offer.discount",
      ])
      .where("selected", "=", true)
      .orderBy("name", "asc")
      .execute(),
  );

  if (error) {
    return Response.json(
      { message: "Database Error: Failed to get drinks", error },
      { status: 500 },
    );
  }

  return Response.json({ result });
}
