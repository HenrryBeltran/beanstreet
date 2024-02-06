import { Try } from "@/utils/try";

export async function deleteFromCart(id: string) {
  const { error: fetchError, result: response } = await Try(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
      credentials: "include",
    }),
  );

  if (!response) {
    console.error("~ Fetch Error: Failed to delete cart item.", fetchError);
    return null;
  }

  const { error: parseError, result: data } = await Try<{
    message: string;
    error?: object;
  }>(response.json());

  if (!response.ok) {
    console.error("~ Error: Unsuccessful response.", fetchError, JSON.stringify(data));
    return null;
  }

  if (parseError) {
    console.error("~ Server Error: Failed on parse.", parseError);
    return null;
  }

  return data;
}
