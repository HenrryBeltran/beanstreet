import { allItemsCountQuery } from "@/drizzle/commonQueries";
import { Try } from "@/utils/safeTry";

type Context = {
  params: {
    slug: string;
  };
};

export async function GET(_: Request, ctx: Context) {
  const slug = ctx.params.slug;

  const { error, result } = await Try(
    allItemsCountQuery.where("section_slug", "=", slug!).executeTakeFirst(),
  );

  if (error) {
    return Response.json(
      { message: "Database Error: Failed to get items", error },
      { status: 500 },
    );
  }

  return Response.json({ count: Number(result?.count) });
}
