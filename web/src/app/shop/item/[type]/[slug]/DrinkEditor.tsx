"use client";

import { Drink } from "@/lib/getItemBySlug";
import { Listbox, RadioGroup } from "@headlessui/react";
import { ChevronUp, Minus, Plus } from "lucide-react";
import { SetStateAction, useState } from "react";

function handleCounter(
  setCount: (value: SetStateAction<number>) => void,
  amount: number,
  condition: boolean = true,
) {
  if (!condition) return;

  setCount((prev) => prev + amount);
}

export default function DrinkEditor({
  result: [drink],
  milkOptions,
  sizeOptions,
}: Drink) {
  const [sweetener, setSweetener] = useState(drink.default_sweetener);
  const [teaspoons, setTeaspoons] = useState(drink.sweetener_teaspoon);
  const [milk, setMilk] = useState(drink.default_milk);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(
    sizeOptions.find((value) => value.name === drink.default_size),
  );

  const currentMilk = milkOptions.find((value) => value.name === milk);
  const currentPrice = (
    Number(drink.base_price) +
    Number(size?.extra_cost) +
    Number(currentMilk?.extra_cost ?? 0)
  ).toFixed(2);
  const currentPriceWithDiscount = (
    (Number(currentPrice) * (100 - (drink.discount ?? 100))) /
    100
  ).toFixed(2);
  const totalPrice = (Number(currentPrice) * quantity).toFixed(2);
  const totalPriceWithDiscount = (Number(currentPriceWithDiscount) * quantity).toFixed(2);

  return (
    <form>
      <div className="mb-6 flex w-full items-center gap-5">
        <div className="flex gap-3 text-2xl">
          <span
            data-discount={drink.price_w_discount !== null}
            className="font-ligh data-[discount=false]:text-stone-800 data-[discount=true]:text-stone-500 data-[discount=true]:line-through"
          >
            ${totalPrice}
          </span>
          {drink.price_w_discount && (
            <span className="font-medium text-stone-800">${totalPriceWithDiscount}</span>
          )}
        </div>
        <span className="rounded-full bg-orange-100 px-4 py-2 font-medium leading-none text-orange-600">
          {drink.discount}%
        </span>
      </div>
      <div className="space-y-6">
        <Listbox
          value={sweetener}
          onChange={setSweetener}
          as="div"
          className="relative space-y-2"
        >
          <Listbox.Label className="block text-sm leading-none text-stone-600">
            Sweetener
          </Listbox.Label>
          <Listbox.Button className="flex w-full items-center justify-between rounded-md bg-stone-200/70 px-6 py-3 leading-none text-stone-700 outline-none">
            <span>{sweetener ? "Sugar" : "None"}</span>
            <ChevronUp
              absoluteStrokeWidth
              strokeWidth={1.5}
              size={20}
              className="transition-transform duration-300 ui-open:rotate-180"
            />
          </Listbox.Button>
          <Listbox.Options className="absolute right-0 top-full z-10 mt-2 w-full animate-[appear_0.24s_cubic-bezier(0.22,0.61,0.36,1)] whitespace-nowrap rounded-md bg-stone-200/60 py-2 text-sm shadow-lg shadow-stone-700/30 outline-none backdrop-blur-lg tap-highlight-transparent md:text-base">
            <Listbox.Option value={false}>
              {({ selected }) => (
                <span
                  data-selected={selected}
                  className="inline-block w-full cursor-pointer px-6 py-2 leading-none text-stone-700 hover:bg-stone-300/70 data-[selected=true]:bg-stone-500 data-[selected=true]:text-stone-50"
                >
                  None
                </span>
              )}
            </Listbox.Option>
            <Listbox.Option value={true}>
              {({ selected }) => (
                <span
                  data-selected={selected}
                  className="inline-block w-full cursor-pointer px-6 py-2 leading-none text-stone-700 hover:bg-stone-300/70 data-[selected=true]:bg-stone-500 data-[selected=true]:text-stone-50"
                >
                  Sugar
                </span>
              )}
            </Listbox.Option>
          </Listbox.Options>
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
                  onClick={() => handleCounter(setTeaspoons, -1, teaspoons !== 1)}
                  type="button"
                >
                  <Minus absoluteStrokeWidth strokeWidth={1.5} size={16} />
                </button>
                <span className="text-stone-700">{teaspoons}</span>
                <button
                  disabled={teaspoons === 4}
                  onClick={() => handleCounter(setTeaspoons, +1, teaspoons !== 4)}
                  className="rounded bg-stone-800 text-stone-50 transition-colors hover:bg-stone-700 disabled:bg-transparent disabled:text-stone-500 disabled:outline disabled:outline-[1.5px] disabled:outline-stone-500"
                  type="button"
                >
                  <Plus absoluteStrokeWidth strokeWidth={1.5} size={16} />
                </button>
              </div>
            </div>
          </>
        )}
        <Listbox value={milk} onChange={setMilk} as="div" className="relative space-y-2">
          <Listbox.Label className="block text-sm leading-none text-stone-600">
            Milk
          </Listbox.Label>
          <Listbox.Button className="flex w-full items-center justify-between rounded-md bg-stone-200/70 px-6 py-3 leading-none text-stone-700">
            <div className="flex items-center gap-6">
              <span>{milk ?? "None"}</span>
              {currentMilk &&
                currentMilk.extra_cost &&
                currentMilk.extra_cost !== "0.00" && (
                  <span className="font-medium leading-none text-stone-800">
                    + ${currentMilk.extra_cost}
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
          <Listbox.Options className="absolute right-0 top-full z-10 mt-2 w-full animate-[appear_0.24s_cubic-bezier(0.22,0.61,0.36,1)] whitespace-nowrap rounded-md bg-stone-200/60 py-2 text-sm text-stone-800 shadow-lg shadow-stone-700/30 outline-none backdrop-blur-lg tap-highlight-transparent md:text-base">
            {milkOptions.map((milkOption) => (
              <Listbox.Option
                key={milkOption.id ?? "none"}
                value={milkOption.name}
                className="flex w-full cursor-pointer items-center justify-between px-6 py-2 text-stone-700 hover:bg-stone-300/70 ui-selected:bg-stone-500 ui-selected:text-stone-50"
              >
                <span className="leading-none">{milkOption.name ?? "None"}</span>
                {milkOption.extra_cost && milkOption.extra_cost !== "0.00" && (
                  <span className="leading-none">+ ${milkOption.extra_cost}</span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
        <RadioGroup value={size} onChange={setSize} className="space-y-2">
          <RadioGroup.Label className="block text-sm leading-none text-stone-600">
            Size
          </RadioGroup.Label>
          {sizeOptions.map((sizeOption) => (
            <RadioGroup.Option
              key={sizeOption.id}
              value={sizeOption}
              className="group flex items-center justify-between rounded-md px-6 py-3 ui-checked:bg-stone-200 ui-checked:outline ui-checked:outline-[1.5px] ui-checked:outline-stone-500 ui-not-checked:bg-stone-200/70"
            >
              <div className="flex items-center gap-6">
                <span className="text-stone-400 ui-checked:text-stone-700">
                  <svg
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
                      className="ui-not-checked:invisible"
                      x1="6"
                      x2="6"
                      y1="2"
                      y2="4"
                    />
                    <line
                      className="ui-not-checked:invisible"
                      x1="10"
                      x2="10"
                      y1="2"
                      y2="4"
                    />
                    <line
                      className="ui-not-checked:invisible"
                      x1="14"
                      x2="14"
                      y1="2"
                      y2="4"
                    />
                  </svg>
                </span>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold leading-none text-stone-600 ui-checked:text-stone-800">
                    {sizeOption.name}
                  </span>
                  <span className="text-sm leading-none text-stone-500 ui-checked:text-stone-600">
                    {sizeOption.unit}
                  </span>
                </div>
              </div>
              <span className="font-medium leading-none text-stone-500 ui-checked:text-stone-800">
                ${(Number(drink.base_price) + Number(sizeOption.extra_cost)).toFixed(2)}
              </span>
            </RadioGroup.Option>
          ))}
        </RadioGroup>
        <div className="space-y-2">
          <span className="block text-sm leading-none text-stone-600">Quantity</span>
          <div className="flex w-full justify-between rounded-md bg-stone-200/70 px-6 py-3 leading-none text-stone-700">
            <button
              disabled={quantity === 1}
              className="rounded bg-stone-800 text-stone-50 transition-colors hover:bg-stone-700 disabled:bg-transparent disabled:text-stone-500 disabled:outline disabled:outline-[1.5px] disabled:outline-stone-500"
              onClick={() => handleCounter(setQuantity, -1, quantity !== 1)}
              type="button"
            >
              <Minus absoluteStrokeWidth strokeWidth={1.5} size={16} />
            </button>
            <span className="text-stone-700">{quantity}</span>
            <button
              onClick={() => handleCounter(setQuantity, +1)}
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
        className="mt-12 w-full rounded-full bg-stone-800 px-7 py-3.5 text-lg font-medium leading-none text-stone-100 hover:bg-stone-700"
      >
        Add to Cart
      </button>
    </form>
  );
}
