import { db } from "@/drizzle";
import { insertUserSchema } from "@/drizzle/schemas";
import { Try } from "@/utils/safeTry";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { v4 as uuid_v4 } from "uuid";
import { cookiesOptions } from "../cookiesOptions";

export async function POST(req: Request) {
  const body = await req.json();
  const validatedCredentials = insertUserSchema.partial({ role: true }).safeParse(body);

  if (!validatedCredentials.success) {
    return Response.json(
      {
        message: "Invalid credentials",
        error: validatedCredentials.error.flatten().fieldErrors,
      },
      { status: 403 },
    );
  }

  const { name, email, password } = validatedCredentials.data;

  const { error: foundError, result: findDuplicateEmail } = await Try(
    db
      .selectFrom("user")
      .select(["id", "password"])
      .where("user.email", "=", email)
      .executeTakeFirst(),
  );

  if (foundError) {
    return Response.json(
      {
        message: "Database Error: Failed to validate credentials",
        error: foundError,
      },
      { status: 500 },
    );
  }

  if (findDuplicateEmail) {
    return Response.json(
      {
        message: "This email already exists.",
        path: "email",
      },
      { status: 409 },
    );
  }

  const { error: passwordError, result: hashedPassword } = await Try(
    bcrypt.hash(password, 10),
  );

  if (passwordError) {
    return Response.json(
      {
        message: "Validation Error: Failed to process password",
        error: passwordError,
      },
      { status: 500 },
    );
  }

  const sessionId = uuid_v4();

  const { error: insertError } = await Try(
    db
      .insertInto("user")
      .values({
        name,
        email,
        password: hashedPassword,
        session: sessionId,
        role: ["customer"],
      })
      .execute(),
  );

  if (insertError) {
    return Response.json(
      { message: "Database Error: Failed to register user", error: insertError },
      { status: 500 },
    );
  }

  cookies().set({
    name: "sid",
    value: sessionId,
    ...cookiesOptions,
  });

  return Response.json({ message: "Successfully sign up" }, { status: 201 });
}
