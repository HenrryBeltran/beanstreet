import type { Config } from "drizzle-kit";

export default {
  schema: "./src/drizzle/schemas.ts",
  out: "./src/drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DB_URI!,
  },
} satisfies Config;
