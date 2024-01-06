import { Try } from "@/utils/try";
import { cookies } from "next/headers";

export type SessionResult = {
  user?: { name: string };
  message: string;
};

type GetHandler = () => Promise<SessionResult | null>;

export const getSession: GetHandler = async () => {
  const cookieStore = cookies();
  const sid = cookieStore.get("sid");

  const { error: responseError, result: response } = await Try(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cookies: { sid: sid?.value } }),
      credentials: "include",
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
