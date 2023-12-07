import { relations } from "drizzle-orm";
import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { drink, pastrie, sandwich } from "./items.ts";

export const offer = pgTable("offer", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: text("name").unique().notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description").notNull(),
  discount: integer("discount").notNull(),
});

export const offerRelations = relations(offer, ({ many }) => ({
  drink: many(drink),
  sandwich: many(sandwich),
  pastrie: many(pastrie),
}));
