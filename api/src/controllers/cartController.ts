import { and, eq, sql } from "drizzle-orm";
import { CookieOptions, RequestHandler } from "express";
import { v4 as uuid_v4 } from "uuid";
import { db } from "../drizzle/index.js";
import { InsertItemOrderSchema, itemOrder } from "../drizzle/schemas/orders.js";
import { user } from "../drizzle/schemas/user.js";

const cookieOptions: CookieOptions = {
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_DEVELOPMENT === "production",
  domain: process.env.DOMAIN,
  sameSite: "none",
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 12),
};

export const getAllItemsFromCart: RequestHandler = async (req, res) => {
  const userSession = req.cookies.sid ?? null;
  const guestSession = req.cookies.gid ?? null;

  if (!userSession && !guestSession) {
    return res.status(403).json({ message: "Invalid credentials" });
  }

  const [foundUser] = await db.select().from(user).where(eq(user.session, userSession));

  if (foundUser) {
    try {
      const result = await db
        .select()
        .from(itemOrder)
        .where(eq(itemOrder.userId, foundUser.id))
        .orderBy(itemOrder.updatedAt);

      return res.json({ result });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Database Error: Failed to found items on your cart" });
    }
  }

  try {
    const result = await db
      .select()
      .from(itemOrder)
      .where(eq(itemOrder.guestId, guestSession))
      .orderBy(itemOrder.updatedAt);

    return res.json({ result });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Database Error: Failed to found items on your cart" });
  }
};

export const getItemsCountFromCart: RequestHandler = async (req, res) => {
  const userSession = req.cookies.sid ?? null;
  const guestSession = req.cookies.gid ?? null;

  if (!userSession && !guestSession) {
    return res.status(403).json({ message: "Invalid credentials" });
  }

  const [foundUser] = await db.select().from(user).where(eq(user.session, userSession));

  if (foundUser) {
    try {
      const result = await db
        .select({
          count: sql<number>`CAST(SUM(${itemOrder.quantity}) AS int)`,
        })
        .from(itemOrder)
        .where(eq(itemOrder.userId, foundUser.id));

      return res.json({ result });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Database Error: Failed to found items on your cart" });
    }
  }

  try {
    const result = await db
      .select({
        count: sql<number>`CAST(SUM(${itemOrder.quantity}) AS int)`,
      })
      .from(itemOrder)
      .where(eq(itemOrder.guestId, guestSession));

    return res.json({ result });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Database Error: Failed to found items on your cart" });
  }
};

export const addToCart: RequestHandler = async (req, res) => {
  const validateItemOrder = InsertItemOrderSchema.safeParse(req.body);

  if (!validateItemOrder.success) {
    return res.status(403).json({
      message: "Invalid fields",
      error: validateItemOrder.error.flatten().fieldErrors,
    });
  }

  const userSession = req.cookies.sid ?? null;
  let guestSession = req.cookies.gid ?? null;

  // if user don't have a guest id, then provide one
  if (!userSession && !guestSession) {
    guestSession = uuid_v4();
    res.cookie("gid", guestSession, cookieOptions);
  }

  const [foundUser] = await db.select().from(user).where(eq(user.session, userSession));

  const userId = foundUser?.id ?? null;

  try {
    const orderData = validateItemOrder.data;

    await db.insert(itemOrder).values({ ...orderData, userId, guestId: guestSession });

    return res.json({ message: "Order saved in your cart" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Database Error: Failed to save order in the cart", error });
  }
};

export const updateItemFromCart: RequestHandler = async (req, res) => {
  const validateItemOrder = InsertItemOrderSchema.required({ id: true }).safeParse(
    req.body,
  );

  if (!validateItemOrder.success) {
    return res.status(403).json({
      message: "Invalid fields",
      error: validateItemOrder.error.flatten().fieldErrors,
    });
  }

  const userSession = req.cookies.sid ?? null;
  let guestSession = req.cookies.gid ?? null;

  // if user don't have a guest id, then provide one
  if (!userSession && !guestSession) {
    guestSession = uuid_v4();
    res.cookie("gid", userSession, cookieOptions);
  }

  const orderData = { ...validateItemOrder.data, updatedAt: new Date() };
  const [foundUser] = await db.select().from(user).where(eq(user.session, userSession));

  if (foundUser) {
    try {
      await db
        .update(itemOrder)
        .set({ ...orderData })
        .where(and(eq(itemOrder.id, orderData.id), eq(itemOrder.userId, foundUser.id)));

      return res.json({ message: "Order updated in your cart" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Database Error: Failed to updated item order", error });
    }
  }

  try {
    await db
      .update(itemOrder)
      .set({ ...orderData })
      .where(and(eq(itemOrder.id, orderData.id), eq(itemOrder.guestId, guestSession)));

    return res.json({ message: "Order updated in your cart" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Database Error: Failed to updated item order", error });
  }
};

export const deleteFromTheCart: RequestHandler = async (req, res) => {
  const userSession = req.cookies.sid ?? null;
  const guestSession = req.cookies.gid ?? null;

  if (!userSession && !guestSession) {
    return res.status(403).json({ message: "Invalid credentials" });
  }

  const validateItemId = InsertItemOrderSchema.pick({ id: true })
    .required({ id: true })
    .safeParse(req.body);

  if (!validateItemId.success) {
    return res.status(403).json({
      message: "Invalid fields Provided",
      error: validateItemId.error.flatten().fieldErrors,
    });
  }

  const [foundUser] = await db.select().from(user).where(eq(user.session, userSession));

  if (foundUser) {
    try {
      const [{ itemOrderId }] = await db
        .delete(itemOrder)
        .where(
          and(
            eq(itemOrder.id, validateItemId.data.id),
            eq(itemOrder.userId, foundUser.id),
          ),
        )
        .returning({ itemOrderId: itemOrder.id });

      if (!itemOrderId) {
        return res.status(403).json({ message: "Invalid credentials" });
      }

      return res.json({ message: "Item order deleted from cart successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Database Error: Failed to find item order", error });
    }
  }

  try {
    const [{ itemOrderId }] = await db
      .delete(itemOrder)
      .where(
        and(
          eq(itemOrder.id, validateItemId.data.id),
          eq(itemOrder.guestId, guestSession),
        ),
      )
      .returning({ itemOrderId: itemOrder.id });

    if (!itemOrderId) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    return res.json({ message: "Item order deleted from cart successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Database Error: Failed to find item order", error });
  }
};
