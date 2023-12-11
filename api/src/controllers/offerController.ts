import { arrayContains } from "drizzle-orm";
import type { RequestHandler } from "express";
import { db } from "../drizzle/index.js";
import { offer } from "../drizzle/schemas.js";

export const getMainOffer: RequestHandler = async (_, res) => {
  try {
    const { name, slug, description, discount, offerType } = offer;

    const result = await db
      .select({ name, slug, description, discount, offerType })
      .from(offer)
      .where(arrayContains(offer.offerType, ["main"]));

    return res.json({ result: result[0] });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Database Error: Failed to get main offer", error });
  }
};
