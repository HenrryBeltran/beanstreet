import { allItemsQuery } from "@/drizzle/commonQueries";
import { Try } from "@/utils/safeTry";

type Context = {
  params: {
    slug: string;
  };
};

export async function GET(req: Request, ctx: Context) {
  const url = new URL(req.url);
  const slug = ctx.params.slug;
  const sort = url.searchParams.get("sort") as "price" | undefined;
  const direction = url.searchParams.get("d") as "asc" | "desc" | undefined;

  const { error, result } = await Try(
    allItemsQuery.where("items.section_slug", "=", slug!).execute(),
  );

  if (error) {
    return Response.json(
      { message: "Database Error: Failed to get items", error },
      { status: 500 },
    );
  }

  const resultOrder = (by: "price", direction: "asc" | "desc" = "asc") =>
    result.sort((a, b) => {
      const key = by === "price" ? "price_w_discount" : by;
      const valueA = a[key] ?? a["price"];
      const valueB = b[key] ?? b["price"];

      if (direction === "asc") {
        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
        return 0;
      }

      if (direction === "desc") {
        if (valueA > valueB) return -1;
        if (valueA < valueB) return 1;
        return 0;
      }

      return 0;
    });

  return Response.json({
    result: sort ? resultOrder(sort, direction ?? "asc") : result,
    count: result.length,
  });
}
