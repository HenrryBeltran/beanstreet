"use client";

import { addToCart } from "@/lib/addToCart";
import { Pastrie } from "@/lib/getItemBySlug";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUp, Loader2, Minus, Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import SuccessAddToCartModal from "./SuccessAddToCartModal";
import { useQueryClient } from "@tanstack/react-query";

export default function PastrieEditor({ result: pastrie }: Pastrie) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const params = new URLSearchParams(searchParams);

  const stringWarmed = searchParams.get("w");
  let parseWarmed: boolean | null = null;

  if (stringWarmed !== null) {
    parseWarmed = stringWarmed === "Warmed";
  }

  const warmed = parseWarmed ?? pastrie.warmed;

  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  async function onSubmit() {
    const result = await addToCart(
      {
        name: pastrie.name,
        slug: pastrie.slug,
        type: pastrie.type,
        warmed,
        quantity,
        url: window.location.pathname,
      },
      pastrie.slug,
    );

    if (result) {
      setIsModalOpen(true);

      queryClient.invalidateQueries({ queryKey: ["cart", "count"] });
    }
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
              data-discount={pastrie.priceWDiscount !== null}
              className="font-ligh data-[discount=false]:text-stone-800 data-[discount=true]:text-stone-500 data-[discount=true]:line-through"
            >
              ${pastrie.basePrice}
            </span>
            {pastrie.priceWDiscount && (
              <span className="font-medium text-stone-800">
                ${pastrie.priceWDiscount}
              </span>
            )}
          </div>
          {pastrie.discount && (
            <span className="rounded-full bg-orange-100 px-4 py-2 font-medium leading-none text-orange-600">
              {pastrie.discount}%
            </span>
          )}
        </div>
        <div className="space-y-6">
          {pastrie.warmed && (
            <Listbox
              value={warmed ? "Warmed" : "Not Warmed"}
              onChange={(w) => handleSearch("w", w)}
              as="div"
              className="relative space-y-2"
            >
              {({ value }) => (
                <>
                  <Listbox.Label className="block text-sm leading-none text-stone-600">
                    Warmed
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
                      {["Warmed", "Not Warmed"].map((warmedValue) => (
                        <Listbox.Option
                          key={`i-${warmedValue}`}
                          value={warmedValue}
                          className="flex w-full cursor-pointer items-center justify-between px-6 py-2.5 text-stone-700 hover:bg-stone-300/70 ui-selected:bg-stone-500 ui-selected:text-stone-50"
                        >
                          <span className="leading-none">{warmedValue}</span>
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </>
              )}
            </Listbox>
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
        item={{ type: "Pastrie", name: pastrie.name, slug: pastrie.slug, warmed }}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </>
  );
}
