import type { Kyselify } from "drizzle-orm/kysely";
import { CamelCasePlugin, Kysely } from "kysely";
import { PostgresJSDialect } from "kysely-postgres-js";
import postgres from "postgres";
import {
  cartItem,
  drink,
  milk,
  milkOption,
  offer,
  order,
  orderItem,
  pastrie,
  sandwich,
  size,
  sizeOption,
  user,
} from "./schemas";

const client = postgres(process.env.DB_URI!);

interface Database {
  drink: Kyselify<typeof drink>;
  pastrie: Kyselify<typeof pastrie>;
  sandwich: Kyselify<typeof sandwich>;
  size: Kyselify<typeof size>;
  milk: Kyselify<typeof milk>;
  size_option: Kyselify<typeof sizeOption>;
  milk_option: Kyselify<typeof milkOption>;
  order: Kyselify<typeof order>;
  cart_item: Kyselify<typeof cartItem>;
  order_item: Kyselify<typeof orderItem>;
  user: Kyselify<typeof user>;
  offer: Kyselify<typeof offer>;
}

export const db = new Kysely<Database>({
  dialect: new PostgresJSDialect({
    postgres: client,
  }),
  plugins: [new CamelCasePlugin()],
});
