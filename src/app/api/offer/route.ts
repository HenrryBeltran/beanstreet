import { db } from "@/drizzle";
import { Try } from "@/utils/safeTry";

// Get main offer
export async function GET() {
  const { error, result } = await Try(
    db
      .selectFrom("offer")
      .select(["name", "slug", "description", "discount", "offer_type"])
      .where((eb) => eb("offer_type", "@>", eb.ref("offer_type")))
      .executeTakeFirst(),
  );

  if (error) {
    return Response.json(
      { message: "Database Error: Failed to get main offer", error },
      { status: 500 },
    );
  }

  return Response.json({ result });
}
