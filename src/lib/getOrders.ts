import { Orders } from "@/app/api/order/route";
import { Try } from "@/utils/try";

export async function getOrders() {
  const { error: fetchError, result: response } = await Try(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
      method: "GET",
      credentials: "include",
    }),
  );

  if (!response) {
    console.error("~ Fetch Error: Failed to get order.", fetchError);
    return null;
  }

  const { error: parseError, result: data } = await Try<{ result: Orders } | undefined>(
    response.json(),
  );

  if (parseError) {
    console.error("~ Server Error: Failed to parse order.", parseError);
    return null;
  }

  if (!response.ok) {
    console.error("~ Server Error: Failed to get order.", parseError);
    return null;
  }

  return data?.result;
}
