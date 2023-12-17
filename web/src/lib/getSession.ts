import { Try } from "@/utils/try";

type Result = {
  user?: { name: string };
  message: string;
};

type GetHandler = () => Promise<Result | null>;

export const getSession: GetHandler = async () => {
  const { error: responseError, result: response } = await Try(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/session`, {
      method: "GET",
      credentials: "include",
    }),
  );

  if (responseError) {
    console.error(`Fetch Error: Failed to fetch get session. ${responseError}`);
    return null;
  }

  const { error: parseError, result } = await Try<Result>(response.json());

  if (parseError) {
    console.error(`Server Error: Failed to parse get session response. ${parseError}`);
    return null;
  }

  if (!response.ok) {
    return null;
  }

  return result;
};
