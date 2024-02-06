import { db } from "@/drizzle";
import { Try } from "@/utils/safeTry";
import { sql } from "kysely";

export async function GET() {
  const { error, result } = await Try(
    db
      .selectFrom([
        (eb) =>
          eb
            .selectFrom("sandwich")
            .leftJoin("offer", "offer.id", "sandwich.offer_id")
            .select(({ ref }) => [
              "sandwich.name",
              "sandwich.slug",
              "sandwich.section_name",
              "sandwich.section_slug",
              "sandwich.type",
              "sandwich.base_price as price",
              sql<string | null>`CAST(${ref("base_price")} * (1.00 - (${ref(
                "offer.discount",
              )} * 0.01)) AS numeric(100, 2))`.as("price_w_discount"),
              "offer.discount",
              "selected",
            ])
            .unionAll(
              db
                .selectFrom("pastrie")
                .leftJoin("offer", "offer.id", "pastrie.offer_id")
                .select(({ ref }) => [
                  "pastrie.name",
                  "pastrie.slug",
                  "pastrie.section_name",
                  "pastrie.section_slug",
                  "pastrie.type",
                  "pastrie.base_price as price",
                  sql<string | null>`CAST(${ref("base_price")} * (1.00 - (${ref(
                    "offer.discount",
                  )} * 0.01)) AS numeric(100, 2))`.as("price_w_discount"),
                  "offer.discount",
                  "selected",
                ]),
            )
            .as("food"),
      ])
      .select([
        "name",
        "slug",
        "section_name",
        "section_slug",
        "type",
        "price",
        "price_w_discount",
        "discount",
      ])
      .where("selected", "=", true)
      .orderBy("name", "asc")
      .execute(),
  );

  if (error) {
    return Response.json(
      { message: "Databese Error: Failed to get food", error },
      { status: 500 },
    );
  }

  return Response.json({ result });
}
