"use client";

import { getCart } from "@/lib/getCart";
import { Loader2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CartQuantityListbox from "./CartQuantityListBox";
import DeleteItemButton from "./DeleteItemButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteFromCart } from "@/lib/deleteFromCart";
import { useState } from "react";
import { updateFromCart } from "@/lib/updateFromCart";
import PaymentIcons from "./PaymentIcons";
import CheckoutButton from "./CheckoutButton";

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
                <li
                  key={item.id.slice(0, -4)}
                  data-pending-delete={isDeletePending && currentItemId === item.id}
                  className="flex gap-8 py-6 transition-opacity duration-300 data-[pending-delete=true]:opacity-30 lg:gap-12"
                >
                  <div className="flex max-w-2xl flex-grow flex-col gap-4 lg:flex-row lg:gap-8">
                    <Link href={item.url ?? "/shop"} className="block">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_SITE_URL}/items/${item.slug}.jpg`}
                        width={128}
                        height={128}
                        quality={70}
                        sizes="(min-width: 1024px) 128px, 96px"
                        className="aspect-square h-24 w-24 object-cover object-center lg:h-32 lg:w-32"
                        alt={`${item.name} image`}
                      />
                    </Link>
                    <ul className="space-y-1 text-stone-600 [&>li]:leading-tight">
                      <li className="mb-2 font-serif text-xl font-bold text-stone-800 hover:text-stone-600 lg:text-2xl">
                        <Link href={item.url ?? "/shop"}>{item.name}</Link>
                      </li>
                      {item.size && (
                        <li>
                          {item.size} - {item.sizeUnit}
                        </li>
                      )}
                      {item.milk && item.milk !== "None" && <li>{item.milk}</li>}
                      {item.sweetener && <li>Sugar - {item.sweetenerTsp} tsp</li>}
                      {item.warmed !== null && (
                        <li>{item.warmed ? "Warmed" : "Not warmed"}</li>
                      )}
                      {item.adjustOrder !== null && <li>{item.adjustOrder}</li>}
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-8 xl:flex-row">
                    <div className="flex items-center gap-4 xl:gap-8">
                      <span className="text-sm text-stone-600">Quantity</span>
                      <CartQuantityListbox handleUpdate={updateItem} item={item} />
                    </div>
                    <div className="ml-auto">
                      {(isUpdatePending || isRefetching) &&
                      isUpdateSuccess &&
                      item.id === currentItemId ? (
                        <Loader2
                          className="mx-auto mb-2 min-h-6 min-w-6 animate-spin text-sky-500"
                          absoluteStrokeWidth
                          strokeWidth={2}
                          size={24}
                        />
                      ) : (
                        <div className="mb-2 flex flex-col gap-1">
                          <span className="text-lg font-semibold leading-none text-stone-700 lg:text-xl">
                            $
                            {(
                              Number(item.unitPriceWDiscount ?? item.unitPrice) *
                              item.quantity
                            ).toFixed(2)}
                          </span>
                          {item.discount && (
                            <>
                              <span className="text-base font-medium leading-none text-stone-500 line-through">
                                ${(Number(item.unitPrice) * item.quantity).toFixed(2)}
                              </span>
                            </>
                          )}
                        </div>
                      )}
                      <DeleteItemButton
                        handleDelete={() => deleteItem(item.id)}
                        isPending={isDeletePending}
                      />
                    </div>
                  </div>
                </li>
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
