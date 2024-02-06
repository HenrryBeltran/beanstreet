"use client";

import { addToCart } from "@/lib/addToCart";
import { Sandwich } from "@/lib/getItemBySlug";
import { Loader2, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SuccessAddToCartModal from "./SuccessAddToCartModal";
import { useQueryClient } from "@tanstack/react-query";

export default function SandwichEditor({ result: sandwich }: Sandwich) {
  const [adjustOrder, setAdjustOrder] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  async function onSubmit() {
    const result = await addToCart(
      {
        name: sandwich.name,
        slug: sandwich.slug,
        type: sandwich.type,
        adjustOrder,
        quantity,
        url: window.location.pathname,
      },
      sandwich.slug,
    );

    if (result) {
      setIsModalOpen(true);
      queryClient.invalidateQueries({ queryKey: ["cart", "count"] });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 flex w-full items-center gap-5">
          <div className="flex gap-3 text-2xl">
            <span
              data-discount={sandwich.priceWDiscount !== null}
              className="font-ligh data-[discount=false]:text-stone-800 data-[discount=true]:text-stone-500 data-[discount=true]:line-through"
            >
              ${sandwich.basePrice}
            </span>
            {sandwich.priceWDiscount && (
              <span className="font-medium text-stone-800">
                ${sandwich.priceWDiscount}
              </span>
            )}
          </div>
          {sandwich.discount && (
            <span className="rounded-full bg-orange-100 px-4 py-2 font-medium leading-none text-orange-600">
              {sandwich.discount}%
            </span>
          )}
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="adjust-order"
              className="block text-sm leading-none text-stone-600"
            >
              Adjust Order
            </label>
            <textarea
              id="adjust-order"
              name="adjust-order"
              placeholder="(optional)"
              className="w-full resize-none rounded-md bg-stone-200/70 p-2 text-sm text-stone-800 outline-none placeholder:text-stone-500/70"
              rows={6}
              value={adjustOrder}
              onChange={(e) => setAdjustOrder(e.target.value)}
            />
          </div>
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
          type: sandwich.name.includes("Wrap") ? "Wrap" : "Sandwich",
          name: sandwich.name,
          slug: sandwich.slug,
          adjustOrder: adjustOrder === "" ? undefined : adjustOrder,
        }}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </>
  );
}
