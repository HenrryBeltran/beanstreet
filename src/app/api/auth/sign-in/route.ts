import { db } from "@/drizzle";
import { insertUserSchema } from "@/drizzle/schemas";
import { Try } from "@/utils/safeTry";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { v4 as uuid_v4 } from "uuid";
import { cookiesOptions } from "../cookiesOptions";

const signInCredentialsSchema = insertUserSchema.partial({ name: true }).pick({
  email: true,
  password: true,
});

export async function POST(req: Request) {
  const body = await req.json();
  const validatedCredentials = signInCredentialsSchema.safeParse(body);

  if (!validatedCredentials.success) {
    return Response.json(
      {
        message: "Invalid credentials",
        error: validatedCredentials.error.flatten().fieldErrors,
      },
      { status: 403 },
    );
  }

  const { email, password } = validatedCredentials.data;

  const { error: foundUserError, result: foundUser } = await Try(
    db
      .selectFrom("user")
      .select(["id", "password"])
      .where("user.email", "=", email)
      .executeTakeFirst(),
  );

  if (foundUserError) {
    return Response.json(
      {
        message: "Database Error: Failed to validate credentials",
        error: foundUserError,
      },
      { status: 500 },
    );
  }

  if (!foundUser) {
    return Response.json(
      {
        message: "This email is not register.",
        path: "email",
      },
      { status: 403 },
    );
  }

  const { error: passwordError, result: passwordMatch } = await Try(
    bcrypt.compare(password, foundUser.password),
  );

  if (passwordError) {
    return Response.json(
      {
        message: "Validation Error: Failed to validate password",
        error: passwordError,
      },
      { status: 500 },
    );
  }

  if (!passwordMatch) {
    return Response.json(
      {
        message: "Wrong password.",
        path: "password",
      },
      { status: 403 },
    );
  }

  const sessionId = uuid_v4();

  const { error: sessionError } = await Try(
    db
      .updateTable("user")
      .set({ session: sessionId })
      .where("user.id", "=", foundUser.id)
      .execute(),
  );

  if (sessionError) {
    return Response.json(
      { message: "Database Error: Failed to update session" },
      { status: 500 },
    );
  }

  cookies().set({
    name: "sid",
    value: sessionId,
    ...cookiesOptions,
  });

  return Response.json({ message: "Successfully sign in" }, { status: 200 });
}
