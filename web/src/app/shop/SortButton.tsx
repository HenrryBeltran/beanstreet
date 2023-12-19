"use client";

import { Listbox } from "@headlessui/react";
import { Check, ChevronUp } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const sortOption = [
  { id: 1, name: "Default", value: "default", query: [] },
  { id: 2, name: "Name", value: "name", query: [{ key: "sort", value: "name" }] },
  {
    id: 3,
    name: "Lower to higher price",
    value: "price-asc",
    query: [
      { key: "sort", value: "price" },
      { key: "d", value: "asc" },
    ],
  },
  {
    id: 4,
    name: "Higher to lower price",
    value: "price-desc",
    query: [
      { key: "sort", value: "price" },
      { key: "d", value: "desc" },
    ],
  },
];

export default function SortButton() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [selectedOption, setSelectedOption] = useState(sortOption[0]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (selectedOption.value !== "default") {
      selectedOption.query.forEach(query => {
        params.set(query.key, query.value);
      });
    } else {
      params.delete("sort");
      params.delete("d");
    }

    replace(`${pathname}?${params.toString()}`);
  }, [selectedOption, searchParams, pathname, replace]);

  return (
    <Listbox
      as="div"
      className="relative h-min"
      value={selectedOption}
      onChange={setSelectedOption}
    >
      <Listbox.Button className="flex select-none items-center gap-1 text-stone-800 outline-none">
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
        className="absolute right-0 top-full mt-2 w-fit animate-[appear_0.24s_cubic-bezier(0.22,0.61,0.36,1)] whitespace-nowrap rounded-md bg-stone-200/60 py-2 text-sm text-stone-800 shadow-lg shadow-stone-700/30 outline-none backdrop-blur-lg md:text-base"
      >
        {sortOption.map(option => (
          <Listbox.Option key={option.id} value={option} as="li">
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
