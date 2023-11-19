"use client";

import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  className?: string;
  value: string;
};

export default function Clipboard({ children, className, value }: Props) {
  return (
    <span
      className={twMerge("cursor-pointer", className)}
      onClick={() => {
        navigator.clipboard.writeText(value);
      }}
    >
      {children}
    </span>
  );
}
