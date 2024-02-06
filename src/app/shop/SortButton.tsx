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

type Props = {
  isASection: boolean;
  initialSearch?: string;
};

export default function SortButton({ isASection, initialSearch }: Props) {
  // Some trick code to change the sort options and the values;
  const defaultOption = isASection ? "name" : "default";
  const listSorOptions = isASection ? sortOption.slice(1) : sortOption;

  if (isASection) {
    listSorOptions[0].query = [];
  } else {
    listSorOptions[1].query = [{ key: "sort", value: "name" }];
  }

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [selectedOption, setSelectedOption] = useState(
    listSorOptions.find((option) => option.value === initialSearch) ?? listSorOptions[0],
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (selectedOption.value !== defaultOption) {
      selectedOption.query.forEach((query) => {
        params.set(query.key, query.value);
      });
    } else {
      params.delete("sort");
      params.delete("d");
    }

    replace(`${pathname}?${params.toString()}`);
  }, [selectedOption, searchParams, pathname, replace, defaultOption]);

  return (
    <Listbox
      as="div"
      className="relative h-min"
      value={selectedOption}
      onChange={setSelectedOption}
    >
      <Listbox.Button className="flex select-none items-center gap-1 text-stone-800 outline-none">
        <span className="font-medium leading-none md:text-lg">Sort by</span>
        <ChevronUp
          absoluteStrokeWidth
          strokeWidth={2}
          className="scale-90 transition-transform duration-300 ui-open:rotate-180 md:scale-100"
          size={20}
        />
      </Listbox.Button>
      <Listbox.Options
        as="ul"
        className="absolute right-0 top-full mt-2 w-fit animate-[appear_0.24s_cubic-bezier(0.22,0.61,0.36,1)] whitespace-nowrap rounded-md border border-stone-300/80 bg-stone-50 py-3 text-sm text-stone-700 shadow-lg shadow-stone-600/30 outline-none md:text-base"
      >
        {listSorOptions.map((option) => (
          <Listbox.Option key={option.id} value={option} as="li">
            {({ selected }) => (
              <button
                data-selected={selected}
                className="flex w-72 items-center justify-between px-4 py-1.5 hover:bg-stone-300/70 hover:text-stone-800 ui-selected:bg-stone-300/70 ui-selected:text-stone-800"
              >
                <span>{option.name}</span>
                <Check
                  aria-hidden={!selected}
                  className="aria-hidden:invisible"
                  absoluteStrokeWidth
                  strokeWidth={1.5}
                  size={20}
                />
              </button>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
