import { relations } from "drizzle-orm";
import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { item } from "./items";

export const offer = pgTable("offer", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: text("name").unique().notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description").notNull(),
  discount: integer("discount").notNull(),
});

export const offerRelations = relations(offer, ({ many }) => ({
  item: many(item),
}));
