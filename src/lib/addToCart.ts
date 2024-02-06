import { addItemToCartSchema } from "@/app/api/cart/[slug]/cartSchema";
import { Try } from "@/utils/try";
import { z } from "zod";

type CartItem = z.infer<typeof addItemToCartSchema>;

export async function addToCart(cartItem: CartItem, slug: string) {
  const { error: fetchError, result: response } = await Try(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${slug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
      credentials: "include",
    }),
  );

  if (!response) {
    console.error("~ Fetch Error: Failed to post item order.", fetchError);
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
    console.error("~ Server Error: Failed to parse items data.", parseError);
    return null;
  }

  return data;
}
