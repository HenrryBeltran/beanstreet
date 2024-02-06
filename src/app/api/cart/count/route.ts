import { db } from "@/drizzle";
import { Try } from "@/utils/safeTry";
import { cookies } from "next/headers";
import { z } from "zod";

export async function GET() {
  const cookieStore = cookies();
  const userSession = cookieStore.get("sid")?.value ?? null;
  const guestSession = cookieStore.get("gid")?.value ?? null;

  const uuidSchema = z.string().uuid().nullish();

  const validateUserSession = uuidSchema.safeParse(userSession);
  const validateGuestSession = uuidSchema.safeParse(guestSession);

  if (!validateUserSession.success) {
    return Response.json(
      {
        message: "Invalid credentials",
        error: validateUserSession.error.flatten().fieldErrors,
      },
      { status: 403 },
    );
  }

  if (!validateGuestSession.success) {
    return Response.json(
      {
        message: "Invalid credentials",
        error: validateGuestSession.error.flatten().fieldErrors,
      },
      { status: 403 },
    );
  }

  const foundUser = await db
    .selectFrom("user")
    .select("id")
    .where("user.session", "=", userSession)
    .executeTakeFirst();

  const { error, result } = await Try(
    db
      .selectFrom("cart_item")
      .select((eb) => [eb.fn.sum("cart_item.quantity").as("count")])
      .where(
        foundUser ? "user_id" : "guest_id",
        "=",
        foundUser ? foundUser.id : guestSession,
      )
      .executeTakeFirst(),
  );

  if (error) {
    return Response.json(
      { message: "Database Error: Failed to found items on your cart", error },
      { status: 500 },
    );
  }

  return Response.json({ count: Number(result?.count) });
}
