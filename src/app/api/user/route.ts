import { db } from "@/drizzle";
import { insertUserSchema } from "@/drizzle/schemas";
import { Try } from "@/utils/safeTry";
import { authenticate } from "../auth/authenticate";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

// Update user account (name, email, password)
export async function PATCH(req: Request) {
  const cookieStore = cookies();
  const sid = cookieStore.get("sid")?.value;

  const { error: authError, result: authResult } = await Try(authenticate({ sid }));

  if (authError) {
    return Response.json({ error: authError }, { status: 500 });
  }

  if (!authResult.foundUserSession) {
    return Response.json(
      { message: authResult.message, error: authResult.error },
      { status: authResult.status },
    );
  }

  const body = await req.json();

  const validatedFields = insertUserSchema
    .partial({
      role: true,
      email: true,
      password: true,
    })
    .safeParse(body);

  if (!validatedFields.success) {
    return Response.json(
      {
        message: "Invalid fields",
        error: validatedFields.error.flatten().fieldErrors,
      },
      { status: 403 },
    );
  }

  if (validatedFields.data.email) {
    const { error: emailError, result: emailResult } = await Try(
      db
        .selectFrom("user")
        .select(["email"])
        .where("email", "=", validatedFields.data.email)
        .executeTakeFirst(),
    );

    if (emailError) {
      return Response.json(
        {
          message: "Validation Error: Failed to process password",
          error: emailError,
        },
        { status: 500 },
      );
    }

    if (emailResult && emailResult.email !== authResult.foundUserSession.email) {
      return Response.json(
        {
          message: "This email already exists.",
          path: "email",
        },
        { status: 409 },
      );
    }
  }

  let password = authResult.foundUserSession.password;

  if (validatedFields.data.password) {
    const { error: passwordError, result: hashedPassword } = await Try(
      bcrypt.hash(validatedFields.data.password, 10),
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

    password = hashedPassword;
  }

  const name = validatedFields.data.name ?? authResult.foundUserSession.name;
  const email = validatedFields.data.email ?? authResult.foundUserSession.email;

  const { error } = await Try(
    db
      .updateTable("user")
      .set({ name, email, password })
      .where("user.id", "=", authResult.foundUserSession.id)
      .execute(),
  );

  if (error) {
    Response.json(
      { message: "Database Error: Failed to update user", error },
      { status: 500 },
    );
  }

  Response.json({ message: "User successfully updated" });
}

// Delete an account
export async function DELETE(req: Request) {
  const cookieStore = cookies();
  const sid = cookieStore.get("sid")?.value;
  const { error: authError, result: authResult } = await Try(authenticate({ sid }));

  if (authError) {
    return Response.json({ error: authError });
  }

  if (!authResult.foundUserSession) {
    return Response.json(
      { message: authResult.message, error: authResult.error },
      { status: authResult.status },
    );
  }

  const body = await req.json();
  const validatedPassword = insertUserSchema.pick({ password: true }).safeParse(body);

  if (!validatedPassword.success) {
    return Response.json(
      {
        message: "Invalid password",
        error: validatedPassword.error.flatten().fieldErrors,
      },
      { status: 403 },
    );
  }

  const { error: passwordError, result: matchPassword } = await Try(
    bcrypt.compare(validatedPassword.data.password, authResult.foundUserSession.password),
  );

  if (passwordError) {
    return Response.json(
      {
        message: "Server Error: Failed to compare password",
        error: passwordError,
      },
      { status: 500 },
    );
  }

  if (!matchPassword) {
    return Response.json(
      { message: "Wrong password.", path: "password" },
      { status: 403 },
    );
  }

  await Try(
    db
      .deleteFrom("cart_item")
      .where("cart_item.user_id", "=", authResult.foundUserSession.id)
      .execute(),
  );

  const { error } = await Try(
    db.deleteFrom("user").where("user.id", "=", authResult.foundUserSession.id).execute(),
  );

  if (error) {
    return Response.json(
      { message: "Database Error: Failed to delete user", error },
      { status: 500 },
    );
  }

  return Response.json({ message: "User successfully deleted" });
}
