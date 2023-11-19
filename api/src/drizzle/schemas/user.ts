import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { itemOrder } from "./orders";

export const rolesEnum = pgEnum("role", ["viewer", "customer", "manager"]);

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 64 }).notNull(),
  email: varchar("email", { length: 320 }).unique().notNull(),
  password: text("password").notNull(),
  role: rolesEnum("role").default("customer").notNull(),
  address: text("address"),
  phoneNumber: text("phone_number"),
  session: uuid("session").unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userRelations = relations(user, ({ many }) => ({
  itemOrder: many(itemOrder),
}));

export const SelectUserSchema = createSelectSchema(user);
export const InsertUserSchema = createInsertSchema(user, {
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
