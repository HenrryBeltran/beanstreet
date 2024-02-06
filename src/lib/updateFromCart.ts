import { Try } from "@/utils/try";
import { insertCartItemSchema } from "@/drizzle/schemas";
import { z } from "zod";

const schema = insertCartItemSchema.partial().required({ id: true });
export type CartItemToUpdate = z.infer<typeof schema>;

export async function updateFromCart(cartItem: CartItemToUpdate) {
  const { error: fetchError, result: response } = await Try(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
      credentials: "include",
    }),
  );

  if (!response) {
    console.error("~ Fetch Error: Failed to update cart item.", fetchError);
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
