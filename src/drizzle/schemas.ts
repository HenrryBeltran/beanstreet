import { relations } from "drizzle-orm";
import {
  bigserial,
  boolean,
  integer,
  numeric,
  pgEnum,
  pgTable,
  smallint,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const rolesEnum = pgEnum("role", ["viewer", "customer", "manager"]);

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 64 }).notNull(),
  email: varchar("email", { length: 320 }).unique().notNull(),
  password: text("password").notNull(),
  role: rolesEnum("role").array().notNull(),
  address: text("address"),
  phoneNumber: text("phone_number"),
  session: uuid("session").unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userRelations = relations(user, ({ many }) => ({
  orderItem: many(orderItem),
  cartItem: many(cartItem),
}));

export const selectUserSchema = createSelectSchema(user);
export const insertUserSchema = createInsertSchema(user, {
  name: z
    .string({ required_error: "Name is required." })
    .max(64, { message: "Your name must be less than 64 characters." }),
  email: z
    .string({ required_error: "Email is required." })
    .max(320, { message: "Your email must be less than 320 characters." }),
  password: z
    .string({ required_error: "Password is required." })
    .min(8, { message: "Your password must be at least 8 characters." })
    .max(32, { message: "Your password must be less than 32 characters." }),
});

export type SelectUser = typeof user.$inferSelect;
export type InsertUser = typeof user.$inferInsert;

export const milk = pgTable("milk", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: text("name").unique().notNull(),
  extaCost: numeric("extra_cost", { precision: 100, scale: 2 }),
  order: integer("order").unique(),
});

export const milkRelations = relations(milk, ({ many }) => ({
  milkOption: many(milkOption),
}));

export const size = pgTable("size", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: text("name").unique().notNull(),
  unit: text("unit").unique().notNull(),
  extraCost: numeric("extra_cost", { precision: 100, scale: 2 }),
  order: integer("order").unique(),
});

export const sizeRelations = relations(size, ({ many }) => ({
  sizeOption: many(sizeOption),
}));

export const drink = pgTable("drink", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: text("name").unique().notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description").notNull(),
  menuDescription: text("menu_description").notNull(),
  basePrice: numeric("base_price", { precision: 100, scale: 2 }).notNull(),
  sectionName: text("section_name").notNull(),
  sectionSlug: text("section_slug").notNull(),
  type: text("type").default("drink").notNull(),
  selected: boolean("selected").default(false).notNull(),
  defaultSweetener: boolean("default_sweetener").default(false).notNull(),
  sweetenerTsp: smallint("sweetener_tsp"),
  defaultMilk: uuid("default_milk").references(() => milk.id),
  defaultSize: uuid("default_size").references(() => size.id),
  offerId: uuid("offer_id").references(() => offer.id),
});

export const drinkRelations = relations(drink, ({ one, many }) => ({
  defaultMilk: one(milk, {
    fields: [drink.defaultMilk],
    references: [milk.id],
  }),
  defaultSize: one(size, {
    fields: [drink.defaultSize],
    references: [size.id],
  }),
  offer: one(offer, {
    fields: [drink.offerId],
    references: [offer.id],
  }),
  milkOption: many(milkOption),
  sizeOption: many(sizeOption),
}));

export const milkOption = pgTable("milk_option", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  drinkId: uuid("drink_id")
    .references(() => drink.id)
    .notNull(),
  milkId: uuid("milk_id").references(() => milk.id),
});

export const milkOptionRelations = relations(milkOption, ({ one }) => ({
  drink: one(drink, {
    fields: [milkOption.drinkId],
    references: [drink.id],
  }),
  milk: one(milk, {
    fields: [milkOption.milkId],
    references: [milk.id],
  }),
}));

export const sizeOption = pgTable("size_option", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  drinkId: uuid("drink_id")
    .references(() => drink.id)
    .notNull(),
  sizeId: uuid("size_id")
    .references(() => size.id)
    .notNull(),
});

export const sizeOptionRelations = relations(sizeOption, ({ one }) => ({
  drink: one(drink, {
    fields: [sizeOption.drinkId],
    references: [drink.id],
  }),
  size: one(size, {
    fields: [sizeOption.sizeId],
    references: [size.id],
  }),
}));

export const sandwich = pgTable("sandwich", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: text("name").unique().notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description").notNull(),
  menuDescription: text("menu_description").notNull(),
  basePrice: numeric("base_price", { precision: 100, scale: 2 }).notNull(),
  sectionName: text("section_name").notNull(),
  sectionSlug: text("section_slug").notNull(),
  type: text("type").default("sandwich").notNull(),
  selected: boolean("selected").default(false).notNull(),
  adjustOrder: text("adjust_order"),
  offerId: uuid("offer_id").references(() => offer.id),
});

export const sandwichRelations = relations(sandwich, ({ one }) => ({
  offer: one(offer, {
    fields: [sandwich.offerId],
    references: [offer.id],
  }),
}));

export const pastrie = pgTable("pastrie", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: text("name").unique().notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description").notNull(),
  menuDescription: text("menu_description").notNull(),
  basePrice: numeric("base_price", { precision: 100, scale: 2 }).notNull(),
  sectionName: text("section_name").notNull(),
  sectionSlug: text("section_slug").notNull(),
  type: text("type").default("pastrie").notNull(),
  selected: boolean("selected").default(false).notNull(),
  warmed: boolean("warmed"),
  offerId: uuid("offer_id").references(() => offer.id),
});

export const pastrieRelations = relations(pastrie, ({ one }) => ({
  offer: one(offer, {
    fields: [pastrie.offerId],
    references: [offer.id],
  }),
}));

export const selectMilkSchema = createSelectSchema(milk);
export const insertMilkSchema = createInsertSchema(milk);

export const selectSizeSchema = createSelectSchema(size);
export const insertSizeSchema = createSelectSchema(size);

export const selectDrinkSchema = createSelectSchema(drink);
export const insertDrinkSchema = createSelectSchema(drink);

export const selectSandwichSchema = createSelectSchema(sandwich);
export const insertSandwichSchema = createSelectSchema(sandwich);

export const selectPastrieSchema = createSelectSchema(pastrie);
export const inserPastrieSchema = createSelectSchema(pastrie);

export type SelectMilk = typeof milk.$inferSelect;
export type InsertMilk = typeof milk.$inferInsert;

export type SelectSize = typeof size.$inferSelect;
export type InsertSize = typeof size.$inferInsert;

export type SelectDrink = typeof drink.$inferSelect;
export type InsertDrink = typeof drink.$inferInsert;

export type SelectSandwich = typeof sandwich.$inferSelect;
export type InsertSandwich = typeof sandwich.$inferInsert;

export type SelectPastrie = typeof pastrie.$inferSelect;
export type InsertPastrie = typeof pastrie.$inferInsert;

export const order = pgTable("order", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  ticket: bigserial("ticket", { mode: "bigint" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  grandTotalPrice: numeric("grand_total_price", { precision: 100, scale: 2 }).notNull(),
});

export const orderRelations = relations(order, ({ many }) => ({
  itemOrder: many(orderItem),
}));

export const orderItem = pgTable("order_item", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  unitPrice: numeric("unit_price", { precision: 100, scale: 2 }).notNull(),
  discount: integer("discount"),
  unitPriceWDiscount: numeric("unit_price_w_discount", { precision: 100, scale: 2 }),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  quantity: integer("quantity").notNull(),
  sweetener: boolean("sweetener"),
  sweetenerTsp: integer("sweetener_tsp"),
  milk: text("milk"),
  size: text("size"),
  sizeUnit: text("size_unit"),
  adjustOrder: text("adjust_order"),
  warmed: boolean("warmed"),
  type: text("type").default("drink").notNull(),
  url: text("url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  orderId: uuid("order_id").references(() => order.id),
  guestId: uuid("guest_id"),
  userId: uuid("user_id").references(() => user.id),
});

export const itemOrderRelations = relations(orderItem, ({ one }) => ({
  order: one(order, {
    fields: [orderItem.orderId],
    references: [order.id],
  }),
  user: one(user, {
    fields: [orderItem.userId],
    references: [user.id],
  }),
}));

export const cartItem = pgTable("cart_item", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  unitPrice: numeric("unit_price", { precision: 100, scale: 2 }).notNull(),
  discount: integer("discount"),
  unitPriceWDiscount: numeric("unit_price_w_discount", { precision: 100, scale: 2 }),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  quantity: integer("quantity").notNull(),
  sweetener: boolean("sweetener"),
  sweetenerTsp: integer("sweetener_tsp"),
  milk: text("milk"),
  size: text("size"),
  sizeUnit: text("size_unit"),
  adjustOrder: text("adjust_order"),
  warmed: boolean("warmed"),
  type: text("type").default("drink").notNull(),
  url: text("url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  guestId: uuid("guest_id"),
  userId: uuid("user_id").references(() => user.id),
});

export const cartItemRelations = relations(cartItem, ({ one }) => ({
  user: one(user, {
    fields: [cartItem.userId],
    references: [user.id],
  }),
}));

export const selectOrderSchema = createSelectSchema(order);
export const insertOrderSchema = createInsertSchema(order);

export const selectOrderItemSchema = createSelectSchema(orderItem);
export const insertOrderItemSchema = createInsertSchema(orderItem);

export const selectCartItemSchema = createSelectSchema(cartItem);
export const insertCartItemSchema = createInsertSchema(cartItem);

export type SelectOrder = typeof order.$inferSelect;
export type InsertOrder = typeof order.$inferInsert;

export type SelectOrderItem = typeof orderItem.$inferSelect;
export type InsertOrderItem = typeof orderItem.$inferInsert;

export type SelectCartItem = typeof cartItem.$inferSelect;
export type InsertCartItem = typeof cartItem.$inferInsert;

export const offerTypeEnum = pgEnum("offer_type", [
  "main",
  "drinks",
  "food",
  "hot-coffees",
  "hot-drinks",
  "cold-coffees",
  "sandwiches-and-more",
  "pastries",
]);

export const offer = pgTable("offer", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: text("name").unique().notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description").notNull(),
  discount: integer("discount").notNull(),
  offerType: offerTypeEnum("offer_type").array().notNull(),
});

export const offerRelations = relations(offer, ({ many }) => ({
  drink: many(drink),
  sandwich: many(sandwich),
  pastrie: many(pastrie),
}));
