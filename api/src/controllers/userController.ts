import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import type { RequestHandler } from "express";
import { db } from "../drizzle/index.js";
import { InsertUserSchema, user, type SelectUser } from "../drizzle/schemas/user.js";
import { authentication } from "./authController.js";

export const updateUser: RequestHandler = async (req, res) => {
  let foundUserSession: SelectUser | undefined;

  try {
    const {
      foundUserSession: foundSession,
      message,
      status,
      error,
    } = await authentication(req.cookies);

    foundUserSession = foundSession;

    if (!foundUserSession) {
      return res.status(status).json({ message, error });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }

  const validatedFields = InsertUserSchema.omit({ password: true }).safeParse(req.body);

  if (!validatedFields.success) {
    return res.status(403).json({
      message: "Invalid fields",
      error: validatedFields.error.flatten().fieldErrors,
    });
  }

  const { name, email, address, phoneNumber } = validatedFields.data;

  try {
    await db
      .update(user)
      .set({ name, email, address, phoneNumber })
      .where(eq(user.id, foundUserSession.id));
    res.status(200).json({ message: "User successfully updated" });
  } catch (error) {
    res.status(500).json({ message: "Database Error: Failed to update user", error });
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  let foundUserSession: SelectUser | undefined;

  try {
    const {
      foundUserSession: foundSession,
      message,
      status,
      error,
    } = await authentication(req.cookies);

    foundUserSession = foundSession;

    if (!foundUserSession) {
      return res.status(status).json({ message, error });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }

  const validatedPassword = InsertUserSchema.omit({ name: true, email: true }).safeParse(
    req.body,
  );

  if (!validatedPassword.success) {
    return res.status(403).json({
      message: "Invalid password",
      error: validatedPassword.error.flatten().fieldErrors,
    });
  }

  try {
    const matchPassword = await bcrypt.compare(
      validatedPassword.data.password,
      foundUserSession.password,
    );

    if (!matchPassword) {
      return res.status(403).json({ message: "Wrong password.", path: "password" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error: Failed to compare password", error });
  }

  try {
    await db.delete(user).where(eq(user.id, foundUserSession.id));
    return res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Database Error: Failed to delete user", error });
  }
};
