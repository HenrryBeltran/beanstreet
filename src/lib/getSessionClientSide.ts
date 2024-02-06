"use client";

import { Try } from "@/utils/try";

export type SessionResult = {
  user?: { name: string; email: string; role: ("viewer" | "customer" | "manager")[] };
  message: string;
};

type GetHandler = () => Promise<SessionResult | null>;

export const getSession: GetHandler = async () => {
  const { error: responseError, result: response } = await Try(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/session`, {
      credentials: "include",
      cache: "no-store",
      next: { tags: ["session"] },
    }),
  );

  if (responseError) {
    console.error(`Fetch Error: Failed to fetch get session. ${responseError}`);
    return null;
  }

  if (!response.ok) {
    return null;
  }

  const { error: parseError, result } = await Try<SessionResult>(response.json());

  if (parseError) {
    console.error(`Server Error: Failed to parse get session response. ${parseError}`);
    return null;
  }

  return result;
};
