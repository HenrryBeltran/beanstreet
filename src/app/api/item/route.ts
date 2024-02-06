import { Try } from "@/utils/safeTry";
import { allItemsQuery } from "@/drizzle/commonQueries";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sort = url.searchParams.get("sort") as "name" | "price" | undefined;
  const direction = url.searchParams.get("d") as "asc" | "desc" | undefined;

  const { error, result } = await Try(allItemsQuery.execute());

  if (error) {
    return Response.json(
      { message: "Database Error: Failed to get all items", error },
      { status: 500 },
    );
  }

  const resultOrder = (
    by: "name" | "price" = "name",
    direction: "asc" | "desc" = "asc",
  ) =>
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
