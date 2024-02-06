"use client";

import { SelectCartItem } from "@/drizzle/schemas";
import { Try } from "@/utils/try";

export async function getCart() {
  const { error: fetchError, result: response } = await Try(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
      method: "GET",
      credentials: "include",
    }),
  );

  if (!response) {
    console.error("~ Fetch Error: Failed to get cart.", fetchError);
    return null;
  }

  const { error: parseError, result: data } = await Try<{ result: SelectCartItem[] }>(
    response.json(),
  );

  if (parseError) {
    console.error("~ Server Error: Failed to parse cart.", parseError);
    return null;
  }

  if (!response.ok) {
    console.error("~ Server Error: Failed to parse cart.", parseError);
    return null;
  }

  return data.result;
}

export async function getCartCount() {
  const { error: fetchError, result: response } = await Try(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/count`, {
      method: "GET",
      credentials: "include",
    }),
  );

  if (!response) {
    console.error("~ Fetch Error: Failed to get cart count.", fetchError);
    return null;
  }

  const { error: parseError, result } = await Try<{ count: number }>(response.json());

  if (parseError) {
    console.error("~ Server Error: Failed to parse cart count.", parseError);
    return null;
  }

  if (!response.ok) {
    console.log("~ Server Error: Bad respone.", response.status);
    return null;
  }

  return result;
}
