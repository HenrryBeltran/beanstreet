"use client";

import { addToCart } from "@/lib/addToCart";
import { Drink } from "@/lib/getItemBySlug";
import { clamp } from "@/utils/functions";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUp, Loader2, Minus, Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import SuccessAddToCartModal from "./SuccessAddToCartModal";
import { useQueryClient } from "@tanstack/react-query";

export default function DrinkEditor({ result: drink }: Drink) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const params = new URLSearchParams(searchParams);

  const stringSweetener = searchParams.get("sw");
  let parseSweeteener: boolean | null = null;

  if (stringSweetener !== null) {
    parseSweeteener = stringSweetener === "Sugar";
  }

  const sweetener = parseSweeteener ?? drink.defaultSweetener;
  const teaspoons = clamp(Number(searchParams.get("tsp")), 1, 4) ?? drink.sweetenerTsp;
  const milk = searchParams.get("m") ?? drink.defaultMilk;
  const size = searchParams.get("s") ?? drink.defaultSize;
  const sizeUnit =
    drink.sizeOptions.find((sizeOption) => sizeOption.name === size)?.unit ?? null;

  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentSizeOption = drink.sizeOptions.find((value) => value.name === size);
  const currentMilk = drink.milkOptions.find((value) => value.name === milk);
  const currentPrice = (
    Number(drink.basePrice) +
    Number(currentSizeOption?.extraCost) +
    Number(currentMilk?.extraCost ?? 0)
  ).toFixed(2);
  const currentPriceWDiscount = drink.discount
    ? ((Number(currentPrice) * (100 - drink.discount)) / 100).toFixed(2)
    : null;

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  async function onSubmit() {
    const result = await addToCart(
      {
        name: drink.name,
        slug: drink.slug,
        type: drink.type,
        size,
        sizeUnit: milk,
        sweetener,
        sweetenerTsp: teaspoons,
        quantity,
        url: window.location.pathname,
      },
      drink.slug,
    );

    if (result) {
      setIsModalOpen(true);

      queryClient.invalidateQueries({ queryKey: ["cart", "count"] });
    }
  }

  function handleSweetener(value: string) {
    if (value === "None") {
      params.delete("sw");
      params.delete("tsp");
    } else {
      params.set("sw", value);
      params.set("tsp", teaspoons.toString());
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleCounter(amount: number, condition: boolean = true) {
    if (!condition) return;

    const acc = teaspoons + amount;

    params.set("tsp", acc.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleSearch(key: string, value: string | null) {
    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 flex w-full items-center gap-5">
          <div className="flex gap-3 text-2xl">
            <span
              data-discount={drink.priceWDiscount !== null}
              className="font-ligh data-[discount=false]:text-stone-800 data-[discount=true]:text-stone-500 data-[discount=true]:line-through"
            >
              ${currentPrice}
            </span>
            {drink.priceWDiscount && (
              <span className="font-medium text-stone-800">${currentPriceWDiscount}</span>
            )}
          </div>
          {drink.discount && (
            <span className="rounded-full bg-orange-100 px-4 py-2 font-medium leading-none text-orange-600">
              {drink.discount}%
            </span>
          )}
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="block text-sm leading-none text-stone-600">Size</span>
            {drink.sizeOptions.map((option) => (
              <label
                key={option.id}
                data-checked={size === option.name}
                className="group flex items-center justify-between rounded-md bg-stone-200/70 px-6 py-3 data-[checked=true]:bg-stone-200 data-[checked=true]:outline data-[checked=true]:outline-[1.5px] data-[checked=true]:outline-stone-500"
              >
                <input
                  id={option.id}
                  type="radio"
                  name="sizes"
                  value={option.name}
                  checked={size === option.name}
                  onChange={(e) => handleSearch("s", e.currentTarget.value)}
                  hidden
                  className="peer"
                />
                <div className="flex items-center gap-6">
                  <svg
                    className="text-stone-400 group-data-[checked=true]:text-stone-700"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  >
                    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                    <line
                      className="invisible group-data-[checked=true]:visible"
                      x1="6"
                      x2="6"
                      y1="2"
                      y2="4"
                    />
                    <line
                      className="invisible group-data-[checked=true]:visible"
                      x1="10"
                      x2="10"
                      y1="2"
                      y2="4"
                    />
                    <line
                      className="invisible group-data-[checked=true]:visible"
                      x1="14"
                      x2="14"
                      y1="2"
                      y2="4"
                    />
                  </svg>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold leading-none text-stone-600 group-data-[checked=true]:text-stone-800">
                      {option.name}
                    </span>
                    <span className="text-sm leading-none text-stone-500 group-data-[checked=true]:text-stone-600">
                      {option.unit}
                    </span>
                  </div>
                </div>
                <span className="font-medium leading-none text-stone-500 peer-checked:text-stone-800">
                  ${(Number(drink.basePrice) + Number(option.extraCost)).toFixed(2)}
                </span>
              </label>
            ))}
          </div>
          <Listbox
            value={milk}
            onChange={(m) => handleSearch("m", m)}
            as="div"
            className="relative space-y-2"
          >
            <Listbox.Label className="block text-sm leading-none text-stone-600">
              Milk
            </Listbox.Label>
            <Listbox.Button className="flex w-full items-center justify-between rounded-md bg-stone-200/70 px-6 py-3 leading-none text-stone-700">
              <div className="flex items-center gap-6">
                <span>{milk ?? "None"}</span>
                {currentMilk && currentMilk.extraCost > 0 && (
                  <span className="font-medium leading-none text-stone-800">
                    + ${currentMilk.extraCost.toFixed(2)}
                  </span>
                )}
              </div>
              <ChevronUp
                absoluteStrokeWidth
                strokeWidth={1.5}
                size={20}
                className="transition-transform duration-300 ui-open:rotate-180"
              />
            </Listbox.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute right-0 top-full z-10 mt-2 w-full whitespace-nowrap rounded-md bg-stone-200/60 py-2 text-sm text-stone-800 shadow-lg shadow-stone-700/30 outline-none backdrop-blur-lg tap-highlight-transparent md:text-base">
                {drink.milkOptions.map((milkOption) => (
                  <Listbox.Option
                    key={milkOption.id ?? "none"}
                    value={milkOption.name}
                    className="flex w-full cursor-pointer items-center justify-between px-6 py-2.5 text-stone-700 hover:bg-stone-300/70 ui-selected:bg-stone-500 ui-selected:text-stone-50"
                  >
                    <span className="leading-none">{milkOption.name ?? "None"}</span>
                    {milkOption.extraCost > 0 && (
                      <span className="leading-none">
                        + ${milkOption.extraCost.toFixed(2)}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
          <Listbox
            value={sweetener ? "Sugar" : "None"}
            onChange={(sw) => handleSweetener(sw)}
            as="div"
            className="relative space-y-2"
          >
            {({ value }) => (
              <>
                <Listbox.Label className="block text-sm leading-none text-stone-600">
                  Sweetener
                </Listbox.Label>
                <Listbox.Button className="flex w-full items-center justify-between rounded-md bg-stone-200/70 px-6 py-3 leading-none text-stone-700 outline-none">
                  <span>{value}</span>
                  <ChevronUp
                    absoluteStrokeWidth
                    strokeWidth={1.5}
                    size={20}
                    className="transition-transform duration-300 ui-open:rotate-180"
                  />
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute right-0 top-full z-10 mt-2 w-full whitespace-nowrap rounded-md bg-stone-200/60 py-2 text-sm shadow-lg shadow-stone-700/30 outline-none backdrop-blur-lg tap-highlight-transparent md:text-base">
                    {["None", "Sugar"].map((sugarValue) => (
                      <Listbox.Option
                        key={`i-${sugarValue}`}
                        value={sugarValue}
                        className="flex w-full cursor-pointer items-center justify-between px-6 py-2.5 text-stone-700 hover:bg-stone-300/70 ui-selected:bg-stone-500 ui-selected:text-stone-50"
                      >
                        <span className="leading-none">{sugarValue}</span>
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </>
            )}
          </Listbox>
          {sweetener && (
            <>
              <div className="space-y-2">
                <span className="block text-sm leading-none text-stone-600">
                  Sweetener Teaspoons
                </span>
                <div className="flex w-full justify-between rounded-md bg-stone-200/70 px-6 py-3 leading-none text-stone-700">
                  <button
                    disabled={teaspoons === 1}
                    className="rounded bg-stone-800 text-stone-50 transition-colors hover:bg-stone-700 disabled:bg-transparent disabled:text-stone-500 disabled:outline disabled:outline-[1.5px] disabled:outline-stone-500"
                    onClick={() => handleCounter(-1, teaspoons !== 1)}
                    type="button"
                  >
                    <Minus absoluteStrokeWidth strokeWidth={1.5} size={16} />
                  </button>
                  <span className="text-stone-700">{teaspoons}</span>
                  <button
                    disabled={teaspoons === 4}
                    onClick={() => handleCounter(+1, teaspoons !== 4)}
                    className="rounded bg-stone-800 text-stone-50 transition-colors hover:bg-stone-700 disabled:bg-transparent disabled:text-stone-500 disabled:outline disabled:outline-[1.5px] disabled:outline-stone-500"
                    type="button"
                  >
                    <Plus absoluteStrokeWidth strokeWidth={1.5} size={16} />
                  </button>
                </div>
              </div>
            </>
          )}
          <div className="space-y-2">
            <span className="block text-sm leading-none text-stone-600">Quantity</span>
            <div className="flex w-full justify-between rounded-md bg-stone-200/70 px-6 py-3 leading-none text-stone-700">
              <button
                disabled={quantity === 1}
                className="rounded bg-stone-800 text-stone-50 transition-colors hover:bg-stone-700 disabled:bg-transparent disabled:text-stone-500 disabled:outline disabled:outline-[1.5px] disabled:outline-stone-500"
                onClick={() => setQuantity((prev) => prev - 1)}
                type="button"
              >
                <Minus absoluteStrokeWidth strokeWidth={1.5} size={16} />
              </button>
              <span className="text-stone-700">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="rounded bg-stone-800 text-stone-50 transition-colors hover:bg-stone-700"
                type="button"
              >
                <Plus absoluteStrokeWidth strokeWidth={1.5} size={16} />
              </button>
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-12 w-full rounded-full bg-stone-800 px-7 py-3.5 text-lg font-medium text-stone-100 hover:bg-stone-700 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex h-[28px] items-center justify-center">
              <Loader2
                absoluteStrokeWidth
                strokeWidth={2}
                size={25.5}
                className="animate-spin"
              />
            </div>
          ) : (
            <span className="leading-none">Add to Cart</span>
          )}
        </button>
      </form>
      <SuccessAddToCartModal
        item={{
          type: "Drink",
          name: drink.name,
          slug: drink.slug,
          size,
          sizeUnit: sizeUnit ?? undefined,
          milk: milk ?? undefined,
          sweetener: sweetener ? `Sugar - ${teaspoons} tsp` : undefined,
        }}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </>
  );
}
