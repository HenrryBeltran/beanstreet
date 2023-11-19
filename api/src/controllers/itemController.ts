import { RequestHandler } from "express";
import { db } from "../drizzle/index";
import { item } from "../drizzle/schemas/items";

export const getAllItems: RequestHandler = async (_req, res) => {
  try {
    const items = await db.select().from(item);

    return res.json(items);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Database Error: Failed to get all items", error });
  }
};
