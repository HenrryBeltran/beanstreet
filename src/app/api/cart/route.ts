import { db } from "@/drizzle";
import { insertCartItemSchema } from "@/drizzle/schemas";
import { Try } from "@/utils/safeTry";
import { cookies } from "next/headers";
import snakecaseKeys from "snakecase-keys";
import { v4 as uuid_v4 } from "uuid";
import { z } from "zod";
import { cookiesOptions } from "../auth/cookiesOptions";

// Get all items from the cart
export async function GET() {
  const cookieStore = cookies();
  const userSession = cookieStore.get("sid")?.value ?? null;
  const guestSession = cookieStore.get("gid")?.value ?? null;

  if (!userSession && !guestSession) {
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

  const { error, result } = await Try(
    db
      .selectFrom("cart_item")
      .selectAll()
      .where(
        foundUser ? "user_id" : "guest_id",
        "=",
        foundUser ? foundUser.id : guestSession,
      )
      .orderBy("updated_at")
      .execute(),
  );

  if (error) {
    return Response.json(
      { message: "Database Error: Failed to found item on your cart" },
      { status: 500 },
    );
  }

  return Response.json({ result });
}

// Update an item from the cart
export async function PATCH(req: Request) {
  const body = await req.json();

  const validateItemOrder = insertCartItemSchema
    .partial()
    .required({ id: true })
    .safeParse(body);

  if (!validateItemOrder.success) {
    return Response.json(
      {
        message: "Invalid fields",
        error: validateItemOrder.error.flatten().fieldErrors,
      },
      { status: 403 },
    );
  }

  const cookieStore = cookies();
  let userSession = cookieStore.get("sid")?.value ?? null;
  let guestSession = cookieStore.get("gid")?.value ?? null;

  if (userSession) {
    const validateSession = z.string().uuid().safeParse(userSession);

    if (!validateSession.success) {
      userSession = null;
    }
  }

  if (guestSession) {
    const validateSession = z.string().uuid().safeParse(guestSession);

    if (!validateSession.success) {
      guestSession = null;
    }
  }

  // if user don't have a guest id, then provide one
  if (!userSession && !guestSession) {
    guestSession = uuid_v4();
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

  if (foundUser === undefined && guestSession) {
    cookieStore.set("gid", guestSession, cookiesOptions);
  }

  const validData = snakecaseKeys(validateItemOrder.data);
  const validCart = { ...validData, updatedAt: new Date() };

  const { error } = await Try(
    db
      .updateTable("cart_item")
      .set({ ...validCart })
      .where("cart_item.id", "=", validCart.id)
      .where(
        foundUser ? "cart_item.user_id" : "cart_item.guest_id",
        "=",
        foundUser ? foundUser.id : guestSession,
      )
      .execute(),
  );

  if (error) {
    return Response.json(
      { message: "Database Error: Failed to updated cart item", error },
      { status: 500 },
    );
  }

  return Response.json({ message: "Item updated in your cart" });
}

// Delete an item from the cart
export async function DELETE(req: Request) {
  const cookieStore = cookies();
  const userSession = cookieStore.get("sid")?.value ?? null;
  const guestSession = cookieStore.get("gid")?.value ?? null;

  if (!userSession && !guestSession) {
    return Response.json({ message: "Invalid credentials" }, { status: 403 });
  }

  const body = await req.json();

  const validateItemId = insertCartItemSchema
    .pick({ id: true })
    .required({ id: true })
    .safeParse(body);

  if (!validateItemId.success) {
    return Response.json(
      {
        message: "Invalid fields Provided",
        error: validateItemId.error.flatten().fieldErrors,
      },
      { status: 403 },
    );
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

  const { error, result } = await Try(
    db
      .deleteFrom("cart_item")
      .where("cart_item.id", "=", validateItemId.data.id)
      .where(
        foundUser ? "cart_item.user_id" : "cart_item.guest_id",
        "=",
        foundUser ? foundUser.id : guestSession,
      )
      .returning("cart_item.id")
      .executeTakeFirst(),
  );

  if (error) {
    return Response.json(
      { message: "Database Error: Failed to find cart item", error },
      { status: 500 },
    );
  }

  if (!result?.id) {
    return Response.json({ message: "Invalid credentials" }, { status: 403 });
  }

  return Response.json({ message: "Cart item deleted from cart successfully" });
}
