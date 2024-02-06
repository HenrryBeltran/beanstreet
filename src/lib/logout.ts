import { Try } from "@/utils/try";

type GetHandler = () => Promise<boolean | null>;

export const logout: GetHandler = async () => {
  const { error: responseError, result: response } = await Try(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "GET",
      credentials: "include",
    }),
  );

  if (responseError) {
    console.error(`Fetch Error: Failed to fetch get session. ${responseError}`);
    return null;
  }

  const { error: parseError } = await Try<{ message: string }>(response.json());

  if (parseError) {
    console.error(`Server Error: Failed to parse get session response. ${parseError}`);
    return null;
  }

  if (!response.ok) {
    return null;
  }

  return true;
};
