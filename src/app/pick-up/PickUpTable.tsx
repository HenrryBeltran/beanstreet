"use client";

import { getOrders } from "@/lib/getOrders";
import { Disclosure } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { ChevronUp, Loader2, MapPinned } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { addHours, format } from "date-fns";

export default function PickUpTable() {
  const { data: orders, isLoading } = useQuery({
    queryFn: getOrders,
    queryKey: ["orders"],
    refetchOnWindowFocus: false,
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

  if (!orders || orders.length === 0) {
    return (
      <div className="mx-6 flex min-h-[32rem] flex-col items-center justify-center lg:mx-[var(--global-viewport-padding)]">
        <MapPinned
          className="text-stone-500"
          absoluteStrokeWidth
          strokeWidth={4}
          size={128}
        />
        <h2 className="mt-8 font-serif text-2xl font-bold tracking-tight text-stone-800 lg:text-3xl">
          You don&apos;t have any orders
        </h2>
        <p className="mt-2 max-w-lg text-pretty text-center text-sm text-stone-600">
          You can check here when your order is ready to pick up. Check out our coffees &
          more in the shop that will surely make your tummy happy!
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

  return (
    <div className="mx-6 flex flex-col gap-16 pb-16 lg:mx-[var(--global-viewport-padding)] lg:flex-row lg:justify-between">
      <div className="flex-grow">
        <ul className="divide-y divide-stone-300">
          {orders &&
            orders.map((order) => (
              <Disclosure key={order.ticket.toString()}>
                <Disclosure.Button className="mb-2 flex w-full items-center justify-between rounded-md p-2 text-left hover:bg-stone-200/50 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <div className="space-x-8">
                    <span className="font-medium text-stone-800">
                      #{order.ticket.padStart(6, "0")}
                    </span>
                    <span className="inline-block w-24 text-right text-sm text-stone-600">
                      {order.items
                        .map((item) => item.quantity)
                        .reduce((acc, current) => acc + current)}{" "}
                      Items
                    </span>
                    <span className="text-sm text-stone-600">
                      {format(
                        addHours(new Date(order.createdAt), -5),
                        "dd/MM/yyyy - HH:mm",
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-8">
                    <span className="space-x-4 font-medium text-stone-800">
                      <span>Total</span>
                      <span className="inline-block w-24 text-right font-bold">
                        ${order.grandTotalPrice}
                      </span>
                    </span>
                    <ChevronUp className="h-5 w-5 text-stone-800 transition-transform ui-open:rotate-180 ui-open:transform" />
                  </div>
                </Disclosure.Button>
                <Disclosure.Panel
                  as="ul"
                  className="divide-y divide-stone-300 overflow-hidden"
                >
                  {order.items.map((item) => (
                    <li key={item.id.slice(0, -4)} className="flex gap-8 py-2 lg:gap-12">
                      <div className="flex flex-grow flex-col gap-0 lg:flex-row lg:gap-8">
                        <Link href={item.url ?? "/shop"} className="block">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_SITE_URL}/items/${item.slug}.jpg`}
                            width={96}
                            height={96}
                            quality={80}
                            sizes="(min-width: 1024px) 48px, 96px"
                            className="aspect-square h-12 w-12 object-cover object-center lg:h-24 lg:w-24"
                            alt={`${item.name} image`}
                          />
                        </Link>
                        <ul className="mt-2 flex flex-col gap-1.5 text-sm text-stone-600 lg:mt-0 [&>li]:leading-tight">
                          <li className="font-serif text-lg font-bold text-stone-800 hover:text-stone-600 lg:mt-0 lg:text-xl">
                            <Link href={item.url ?? "/shop"}>{item.name}</Link>
                          </li>
                          {(item.size ||
                            item.milk ||
                            item.sweetener ||
                            item.warmed ||
                            item.adjustOrder) && (
                            <li className="flex flex-col gap-1">
                              {item.size && (
                                <span>
                                  {item.size} - {item.sizeUnit}
                                </span>
                              )}
                              {item.milk && item.milk !== "None" && (
                                <span>{item.milk}</span>
                              )}
                              {item.sweetener && (
                                <span>Sugar - {item.sweetenerTsp} tsp</span>
                              )}
                              {item.warmed !== null && (
                                <span>{item.warmed ? "Warmed" : "Not warmed"}</span>
                              )}
                              {item.adjustOrder !== null && (
                                <span>{item.adjustOrder}</span>
                              )}
                            </li>
                          )}
                        </ul>
                      </div>
                      <div className="flex flex-col items-start justify-start gap-8 xl:flex-row">
                        <div className="flex items-center gap-2 xl:gap-4">
                          <span className="text-sm text-stone-600">Quantity</span>
                          <span className="sm text-stone-600 xl:w-12">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="ml-auto">
                          <div className="mb-2 flex flex-col gap-1">
                            <span className="text-lg font-medium leading-none text-stone-700 xl:w-32 xl:text-right">
                              $
                              {(
                                Number(item.unitPriceWDiscount ?? item.unitPrice) *
                                item.quantity
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </Disclosure.Panel>
              </Disclosure>
            ))}
        </ul>
      </div>
    </div>
  );
}
