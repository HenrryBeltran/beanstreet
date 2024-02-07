"use client";

import { Disclosure } from "@headlessui/react";
import { Minus, Plus } from "lucide-react";

type Props = {
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

export default function FAQ({ question, answer, defaultOpen }: Props) {
  return (
    <Disclosure as="div" className="text-stone-700" defaultOpen={defaultOpen ?? false}>
      <Disclosure.Button className="flex w-full items-start justify-between gap-6 rounded-md px-6 py-2 hover:bg-stone-200/70">
        <h2 className="text-left text-lg font-semibold tracking-tight lg:text-xl">
          {question}
        </h2>
        <Plus
          absoluteStrokeWidth
          strokeWidth={2}
          size={24}
          className="min-w-6 ui-open:hidden"
        />
        <Minus
          absoluteStrokeWidth
          strokeWidth={2}
          size={24}
          className="hidden ui-open:block ui-open:min-w-6"
        />
      </Disclosure.Button>
      <Disclosure.Panel className="px-6 py-2 text-stone-600">{answer}</Disclosure.Panel>
    </Disclosure>
  );
}
