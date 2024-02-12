"use client";

import { animate } from "motion";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  className?: string;
  value: string;
};

export default function Clipboard({ children, className, value }: Props) {
  const [tooltip, setTooltip] = useState("Copy");

  useEffect(() => {
    animate(
      "#clipboard",
      { opacity: [0, 1] },
      { duration: 0.5, delay: 1.3, easing: "ease-out" },
    );
  });

  async function checkClipboard() {
    const clip = await navigator.clipboard.readText();

    if (clip === value) {
      setTooltip("Copied!");
    } else {
      setTooltip("Copy");
    }
  }

  return (
    <span
      id="clipboard"
      className={twMerge("group relative cursor-pointer opacity-0", className)}
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        checkClipboard();
      }}
    >
      {children}
      <span className="pointer-events-none absolute top-1/2 z-10 mr-14 inline-block -translate-y-1/2 rotate-90 rounded-md border border-stone-600 bg-stone-700 px-2 py-4 font-medium text-stone-50 opacity-0 transition-colors duration-700 group-hover:opacity-100">
        {tooltip}
      </span>
    </span>
  );
}
