"use client";

import { getCartCount } from "@/lib/getCart";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag } from "lucide-react";

type Props = {
  theme: "dark" | "light";
};

export default function ShoppingCartButton({ theme }: Props) {
  const { data } = useQuery({
    queryFn: getCartCount,
    queryKey: ["cart", "count"],
  });

  return (
    <a href="/cart" className="group relative tap-highlight-transparent">
      <ShoppingBag
        className="transition-[stroke-width] duration-200 group-hover:stroke-2"
        size={24}
        strokeWidth={1.5}
        absoluteStrokeWidth={false}
      />
      {data && data.count > 0 && (
        <div
          data-theme={theme}
          className="absolute left-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full data-[theme=dark]:bg-stone-100 data-[theme=light]:bg-stone-800"
        >
          <span
            data-theme={theme}
            className="text-sm font-medium leading-none data-[theme=dark]:text-stone-800 data-[theme=light]:text-stone-50"
          >
            {data.count}
          </span>
        </div>
      )}
    </a>
  );
}

export function ShoppingCartButtonFallback() {
  return (
    <a href="/cart" className="group relative tap-highlight-transparent">
      <ShoppingBag
        className="transition-[stroke-width] duration-200 group-hover:stroke-2"
        size={24}
        strokeWidth={1.5}
        absoluteStrokeWidth={false}
      />
    </a>
  );
}
