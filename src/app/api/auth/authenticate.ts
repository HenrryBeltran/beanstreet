import { db } from "@/drizzle";
import { Try } from "@/utils/safeTry";

export async function authenticate(cookies: { sid?: string } | undefined) {
  if (!cookies?.sid) {
    return {
      foundUserSession: undefined,
      status: 401,
      message: "Unauthorized",
    };
  }

  const { error: foundError, result: foundUserSession } = await Try(
    db
      .selectFrom("user")
      .select(["user.id", "user.name", "user.email", "user.role", "user.password"])
      .where("user.session", "=", cookies.sid)
      .executeTakeFirst(),
  );

  if (foundError) {
    return {
      foundUserSession: undefined,
      status: 500,
      message: "Database Error: Failed to found user session",
      error: foundError,
    };
  }

  if (!foundUserSession) {
    return {
      foundUserSession: undefined,
      status: 404,
      message: "User session not found",
    };
  }

  return { foundUserSession, status: 200, message: "User sesion authenticated" };
}
