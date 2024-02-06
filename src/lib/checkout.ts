import { SelectCartItem } from "@/drizzle/schemas";
import { Try } from "@/utils/try";

export async function checkout(cart: SelectCartItem[]) {
  const { error, result: response } = await Try(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: cart.map((item) => item.id) }),
      credentials: "include",
    }),
  );

  if (error) {
    console.error(error);
    return;
  }

  const { error: responseError, result } = await Try<{ checkoutUrl: string }>(
    response.json(),
  );

  if (responseError) {
    console.error(responseError);
    return;
  }

  window.location.href = result.checkoutUrl;
}
