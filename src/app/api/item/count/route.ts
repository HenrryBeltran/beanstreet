import { allItemsCountQuery } from "@/drizzle/commonQueries";
import { Try } from "@/utils/safeTry";

export async function GET() {
  const { error, result } = await Try(allItemsCountQuery.executeTakeFirst());

  if (error) {
    return Response.json(
      { message: "Database Error: Failed to get items", error },
      { status: 500 },
    );
  }

  return Response.json({ count: Number(result?.count) });
}
