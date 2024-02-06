"use client";

import { SelectCartItem } from "@/drizzle/schemas";
import { checkout } from "@/lib/checkout";
import { getSession } from "@/lib/getSessionClientSide";
import { useMutation } from "@tanstack/react-query";

type Props = {
  cart: SelectCartItem[];
};

export default function CheckoutButton({ cart }: Props) {
  const { isPending, mutate } = useMutation({
    mutationFn: checkout,
  });

  async function handleCheckout() {
    const session = await getSession();

    if (session === null) {
      window.location.href = "/sign-in";
      return;
    }

    mutate(cart);
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleCheckout}
      className="!mt-8 inline-block w-full rounded-full bg-stone-800 px-6 py-3.5 text-center text-lg font-medium leading-none text-stone-100 transition-colors hover:bg-stone-700 disabled:bg-stone-500 group-data-[refetching=true]:pointer-events-none group-data-[refetching=true]:bg-stone-500"
    >
      Procedeed to checkout
    </button>
  );
}
