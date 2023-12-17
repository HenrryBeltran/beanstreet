"use client";

import { Listbox } from "@headlessui/react";
import { Check, ChevronUp } from "lucide-react";

const sortOption = [
  { id: 1, name: "Default", value: "default" },
  { id: 2, name: "Name", value: "name" },
  { id: 3, name: "Lower to higher price", value: "price-asc" },
  { id: 4, name: "Higher to lower price", value: "price-desc" },
];

export default function SortButton() {
  return (
    <Listbox as="div" className="relative h-min">
      <Listbox.Button className="flex items-center gap-1 text-stone-800">
        {({ open }) => (
          <>
            <span className="font-medium leading-none md:text-lg">Sort by</span>
            <ChevronUp
              data-open={open}
              absoluteStrokeWidth
              strokeWidth={2}
              className="scale-90 transition-transform duration-300 data-[open=true]:rotate-180 md:scale-100"
              size={20}
            />
          </>
        )}
      </Listbox.Button>
      <Listbox.Options
        as="ul"
        className="absolute right-0 top-full mt-2 w-fit animate-[appear_0.24s_cubic-bezier(0.22,0.61,0.36,1)] whitespace-nowrap rounded-md bg-stone-200/60 py-2 text-sm text-stone-800 shadow-lg shadow-stone-700/30 outline-none md:text-base"
      >
        {sortOption.map(option => (
          <Listbox.Option key={option.id} value={option.value} as="li">
            {({ selected }) => (
              <button
                data-selected={selected}
                className="flex w-full items-center gap-1.5 px-4 py-1.5 hover:bg-stone-300/70 data-[selected=true]:bg-stone-300/70"
              >
                <Check
                  aria-hidden={!selected}
                  className="aria-hidden:invisible"
                  absoluteStrokeWidth
                  strokeWidth={1.5}
                  size={20}
                />
                <span>{option.name}</span>
              </button>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
