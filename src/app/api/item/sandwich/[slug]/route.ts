import { db } from "@/drizzle";
import { Try } from "@/utils/safeTry";
import { sql } from "kysely";

type Context = {
  params: {
    slug: string;
  };
};

export async function GET(_: Request, ctx: Context) {
  const slug = ctx.params.slug;

  const { error, result } = await Try(
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

  if (error) {
    return Response.json(
      { message: "Database Error: Failed to get item", error },
      { status: 500 },
    );
  }

  return Response.json({ result });
}
