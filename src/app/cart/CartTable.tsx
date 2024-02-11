"use client";

import { deleteFromCart } from "@/lib/deleteFromCart";
import { getCart } from "@/lib/getCart";
import { updateFromCart } from "@/lib/updateFromCart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CartItem from "./CartItem";
import CheckoutButton from "./CheckoutButton";
import PaymentIcons from "./PaymentIcons";

export default function CartTable() {
  const [currentItemId, setCurrentItemId] = useState("");
  const queryClient = useQueryClient();

  const {
    data: cart,
    isLoading,
    isRefetching,
  } = useQuery({ queryFn: getCart, queryKey: ["cart"], refetchOnWindowFocus: false });

  const {
    mutate: updateItem,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
  } = useMutation({
    mutationFn: updateFromCart,
    onMutate: (data) => {
      setCurrentItemId(data.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const { mutate: deleteItem, isPending: isDeletePending } = useMutation({
    mutationFn: deleteFromCart,
    onMutate: (data) => {
      setCurrentItemId(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  if (isLoading) {
    return (
      <div className="mx-6 flex min-h-[32rem] flex-col items-center justify-start py-16 lg:mx-[var(--global-viewport-padding)]">
        <Loader2
          className="animate-spin text-sky-500"
          absoluteStrokeWidth
          strokeWidth={2}
          size={48}
        />
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="mx-6 flex min-h-[32rem] flex-col items-center justify-center lg:mx-[var(--global-viewport-padding)]">
        <ShoppingCart
          className="text-stone-500"
          absoluteStrokeWidth
          strokeWidth={4}
          size={128}
        />
        <h2 className="mt-8 font-serif text-2xl font-bold tracking-tight text-stone-800 lg:text-3xl">
          Your cart is empty!
        </h2>
        <p className="mt-2 max-w-lg text-pretty text-center text-sm text-stone-600">
          You haven&apos;t added anything yet. Check out our coffees & more in the shop
          that will surely make your tummy happy!
        </p>
        <Link
          href="/shop"
          className="my-8 rounded-full bg-stone-700 px-5 py-2 text-stone-50 transition-colors hover:bg-stone-500"
        >
          Go to shop
        </Link>
      </div>
    );
  }

  const grandTotal = cart
    .map(({ unitPrice, quantity }) => (Number(unitPrice) * quantity).toFixed(2))
    .reduce((acc, current) => (Number(current) + Number(acc)).toFixed(2));

  const grandTotalWithDiscount = cart
    .map(({ unitPrice, unitPriceWDiscount, quantity }) =>
      (Number(unitPriceWDiscount ?? unitPrice) * quantity).toFixed(2),
    )
    .reduce((acc, current) => (Number(current) + Number(acc)).toFixed(2));

  const haveDiscount = cart
    .map(({ discount }) => discount)
    .some((value) => typeof value === "number");

  return (
    <div className="mx-6 flex flex-col gap-16 pb-16 lg:mx-[var(--global-viewport-padding)] lg:flex-row lg:justify-between">
      <div className="flex-grow lg:max-w-screen-md">
        <ul className="divide-y divide-stone-300">
          {cart &&
            cart
              .sort(
                (a, b) =>
                  new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
              )
              .map((item) => (
                <CartItem
                  key={item.id.slice(0, -4)}
                  item={item}
                  currentItemId={currentItemId}
                  isUpdatePending={isUpdatePending}
                  isUpdateSuccess={isUpdateSuccess}
                  isDeletePending={isDeletePending}
                  isRefetching={isRefetching}
                  updateItem={updateItem}
                  deleteItem={deleteItem}
                />
              ))}
        </ul>
      </div>
      <div
        data-refetching={isRefetching}
        className="group h-min flex-grow space-y-4 text-stone-800 lg:max-w-80 xl:max-w-sm xl:text-lg"
      >
        <div className="space-y-2 rounded-md border border-stone-300/70 p-6 ">
          {haveDiscount && (
            <>
              <div className="flex justify-between font-semibold">
                <span>Total wihout discount</span>
                <span className="transition-colors group-data-[refetching=true]:text-stone-400">
                  ${grandTotal}
                </span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Discount</span>
                <span className="font-normal transition-colors group-data-[refetching=true]:text-stone-400">
                  - ${(Number(grandTotal) - Number(grandTotalWithDiscount)).toFixed(2)}
                </span>
              </div>
            </>
          )}
          <div className="flex justify-between font-semibold">
            <span className="leading-tight">Grand Total</span>
            <span className="transition-colors group-data-[refetching=true]:text-stone-400">
              ${haveDiscount ? grandTotalWithDiscount : grandTotal}
            </span>
          </div>
          <CheckoutButton cart={cart} />
        </div>
        <div className="p-6">
          <h4 className="mb-1 text-sm font-bold leading-none text-stone-700">
            Delivery Info
          </h4>
          <p className="mb-4 text-pretty text-sm leading-tight text-stone-600">
            This is only a website project, all items are for exhibition.
          </p>
          <h4 className="mb-1 text-sm font-bold leading-none text-stone-700">
            Payment Info
          </h4>
          <p className="mb-4 text-pretty text-sm leading-tight text-stone-600">
            We accept the following methods of payment.
          </p>
          <PaymentIcons />
        </div>
      </div>
    </div>
  );
}
