import { db } from "@/drizzle";
import { Try } from "@/utils/safeTry";
import { jsonArrayFrom } from "kysely/helpers/postgres";
import { cookies } from "next/headers";

export type Orders = {
  id: string;
  ticket: string;
  grandTotalPrice: string;
  createdAt: string;
  items: {
    id: string;
    unitPrice: number;
    discount: number | null;
    unitPriceWDiscount: number;
    name: string;
    slug: string;
    quantity: number;
    sweetener: boolean | null;
    sweetenerTsp: number | null;
    milk: string | null;
    size: string | null;
    sizeUnit: string | null;
    adjustOrder: string | null;
    warmed: boolean | null;
    url: string;
    createdAt: string;
    updatedAt: string;
    orderId: string;
    userId: string;
    type: string;
  }[];
}[];

export async function GET() {
  const cookieStore = cookies();
  const userSession = cookieStore.get("sid")?.value ?? null;

  if (!userSession) {
    return Response.json({ message: "Invalid credentials" }, { status: 403 });
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

  if (foundUser === undefined) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  const { error, result } = await Try(
    db
      .selectFrom("order_item")
      .leftJoin("order", "order.id", "order_item.order_id")
      .select((eb) => [
        "order.id",
        "order.ticket",
        "order.grand_total_price",
        "order.created_at",
        jsonArrayFrom(
          eb
            .selectFrom("order_item")
            .selectAll()
            .where("order_item.order_id", "=", eb.ref("order.id"))
            .orderBy("order_item.updated_at asc"),
        ).as("items"),
      ])
      .where("user_id", "=", foundUser.id)
      .orderBy("created_at desc")
      .groupBy("order.id")
      .execute(),
  );

  if (error) {
    return Response.json(
      { message: "Database Error: Failed to found item on your order." },
      { status: 500 },
    );
  }

  return Response.json({ result });
}
