import { relations } from "drizzle-orm";
import {
  bigserial,
  boolean,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { user } from "./user.ts";

export const order = pgTable("order", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  ticket: bigserial("ticket", { mode: "bigint" }),
  state: text("state").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const orderRelations = relations(order, ({ many }) => ({
  itemOrder: many(itemOrder),
}));

export const itemOrder = pgTable("order_item", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  totalPrice: numeric("total_price", { precision: 100, scale: 2 }).notNull(),
  name: text("name").notNull(),
  quantity: integer("quantity").notNull(),
  sweetener: boolean("sweetener"),
  sweetenerTsp: integer("sweetener_teaspoon"),
  milk: text("milk"),
  size: text("size"),
  sizeUnit: text("size_unit"),
  adjustOrder: text("adjust_order"),
  warmed: boolean("warmed"),
  urlSearchParams: text("url_search_params"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  orderId: uuid("order_id").references(() => order.id),
  guestId: uuid("guest_id"),
  userId: uuid("user_id").references(() => user.id),
});

export const itemOrderRelations = relations(itemOrder, ({ one }) => ({
  order: one(order, {
    fields: [itemOrder.orderId],
    references: [order.id],
  }),
  user: one(user, {
    fields: [itemOrder.userId],
    references: [user.id],
  }),
}));

export const SelectOrderSchema = createSelectSchema(order);
export const InsertOrderSchema = createInsertSchema(order);

export const SelectItemOrderSchema = createSelectSchema(itemOrder);
export const InsertItemOrderSchema = createInsertSchema(itemOrder);

export type SelectOrder = typeof order.$inferSelect;
export type InsertOrder = typeof order.$inferInsert;

export type SelectItemOrder = typeof itemOrder.$inferSelect;
export type InsertItemOrder = typeof itemOrder.$inferInsert;
