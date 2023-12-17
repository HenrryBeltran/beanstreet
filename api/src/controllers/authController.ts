import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import type { CookieOptions, RequestHandler } from "express";
import { v4 as uuid_v4 } from "uuid";
import { db } from "../drizzle/index.js";
import { InsertUserSchema, user, type SelectUser } from "../drizzle/schemas.js";

const SignInCredentialsSchema = InsertUserSchema.partial({ name: true }).pick({
  email: true,
  password: true,
});

const cookieOptions: CookieOptions = {
  path: "/",
  httpOnly: true,
  domain: process.env.DOMAIN,
  secure: process.env.NODE_ENVIRONMENT === "production",
  maxAge: 1000 * 60 * 60 * 24 * 92,
};

export const signIn: RequestHandler = async (req, res) => {
  const validatedCredentials = SignInCredentialsSchema.safeParse(req.body);

  if (!validatedCredentials.success) {
    return res.status(403).json({
      message: "Invalid credentials",
      error: validatedCredentials.error.flatten().fieldErrors,
    });
  }

  const { email, password } = validatedCredentials.data;

  let foundUser: SelectUser | undefined;

  try {
    [foundUser] = await db.select().from(user).where(eq(user.email, email));
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Database Error: Failed to validate credentials", error });
  }

  if (!foundUser) {
    return res.status(403).json({
      message: "This email is not register.",
      path: "email",
    });
  }

  let passwordMatch: boolean;

  try {
    passwordMatch = await bcrypt.compare(password, foundUser.password);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Validation Error: Failed to validate password", error });
  }

  if (!passwordMatch) {
    return res.status(403).json({
      message: "Wrong password.",
      path: "password",
    });
  }

  const sessionId = uuid_v4();

  try {
    await db.update(user).set({ session: sessionId }).where(eq(user.id, foundUser.id));
  } catch (error) {
    return res.status(500).json({ message: "Database Error: Failed to update session" });
  }

  return res
    .status(202)
    .cookie("sid", sessionId, cookieOptions)
    .json({ message: "Successfully sign in" });
};

export const signUp: RequestHandler = async (req, res) => {
  const validatedCredentials = InsertUserSchema.partial({ role: true }).safeParse(
    req.body,
  );

  if (!validatedCredentials.success) {
    return res.status(403).json({
      message: "Invalid credentials",
      error: validatedCredentials.error.flatten().fieldErrors,
    });
  }

  const { name, email, password } = validatedCredentials.data;

  let findDuplicateEmail: SelectUser | undefined;

  try {
    [findDuplicateEmail] = await db.select().from(user).where(eq(user.email, email));
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Database Error: Failed to validate credentials", error });
  }

  if (findDuplicateEmail) {
    return res.status(409).json({
      message: "This email already exists.",
      path: "email",
    });
  }

  let hashedPassword: string;

  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Validation Error: Failed to process password", error });
  }

  const sessionId = uuid_v4();

  try {
    await db
      .insert(user)
      .values({
        name,
        email,
        password: hashedPassword,
        session: sessionId,
        role: ["customer"],
      })
      .returning({ userId: user.id });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Database Error: Failed to register user", error });
  }

  return res
    .cookie("sid", sessionId, cookieOptions)
    .status(201)
    .json({ message: "Successfully sign up" });
};

export const logout: RequestHandler = async (req, res) => {
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
    return res.sendStatus(500);
  }

  try {
    await db.update(user).set({ session: null }).where(eq(user.id, foundUserSession.id));
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Database Error: Failed to update user session", error });
  }

  const clearCookieOption = cookieOptions;
  delete clearCookieOption.maxAge;

  return res
    .clearCookie("sid", {
      ...clearCookieOption,
      expires: new Date(1970, 2, 1),
    })
    .json({ message: "Successfully logout" });
};

export const getSession: RequestHandler = async (req, res) => {
  let foundUser: SelectUser;
  try {
    const { foundUserSession, message, status, error } = await authentication(
      req.cookies,
    );

    if (!foundUserSession) {
      return res.status(status).json({ message, error });
    }

    foundUser = foundUserSession;
  } catch (error) {
    return res.sendStatus(500);
  }

  return res
    .status(200)
    .json({ user: { name: foundUser.name }, message: "Found user session" });
};

export const authentication = async (cookies: { sid: string } | undefined) => {
  if (!cookies?.sid) {
    return {
      foundUserSession: undefined,
      status: 401,
      message: "Unauthorized",
    };
  }

  let foundUserSession: SelectUser | undefined;

  try {
    [foundUserSession] = await db
      .select()
      .from(user)
      .where(eq(user.session, cookies.sid));

    if (!foundUserSession) {
      return {
        foundUserSession: undefined,
        status: 404,
        message: "User session not found",
      };
    }
  } catch (error) {
    return {
      foundUserSession: undefined,
      status: 500,
      message: "Database Error: Failed to found user session",
      error,
    };
  }

  return { foundUserSession, status: 200, message: "User sesion authenticated" };
};
