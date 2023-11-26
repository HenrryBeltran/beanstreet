import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  numeric,
  pgTable,
  smallint,
  text,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { offer } from "./offer";

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
  sweetenerTsp: smallint("sweetener_teaspoon"),
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

export const SelectMilkSchema = createSelectSchema(milk);
export const InsertMilkSchema = createInsertSchema(milk);

export const SelectSizeSchema = createSelectSchema(size);
export const InsertSizeSchema = createSelectSchema(size);

export const SelectDrinkSchema = createSelectSchema(drink);
export const InsertDrinkSchema = createSelectSchema(drink);

export const SelectSandwichSchema = createSelectSchema(sandwich);
export const InsertSandwichSchema = createSelectSchema(sandwich);

export const SelectPastrieSchema = createSelectSchema(pastrie);
export const InserPastrieSchema = createSelectSchema(pastrie);

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
