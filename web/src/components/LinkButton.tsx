import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Props = {
  href: string;
  placeholder: string;
  dark?: boolean;
  size?: "sm" | "base" | "lg";
};

export default function LinkButton({ href, placeholder, dark, size }: Props) {
  return (
    <Link
      href={href}
      data-dark-theme={dark ?? false}
      data-size={size ?? "base"}
      className="flex w-fit items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-stone-100 text-stone-800 data-[dark-theme=true]:bg-stone-800 data-[size=base]:px-5 data-[size=base]:py-2 data-[size=lg]:px-5 data-[size=lg]:py-2 data-[size=sm]:px-4 data-[size=sm]:py-1.5 data-[dark-theme=true]:text-stone-100 md:data-[size=lg]:gap-2.5 md:data-[size=lg]:px-6 md:data-[size=lg]:py-3"
    >
      <span
        data-size={size ?? "base"}
        className="font-medium data-[size=base]:text-lg data-[size=lg]:text-lg data-[size=sm]:text-base md:data-[size=lg]:text-xl"
      >
        {placeholder}
      </span>
      <ArrowRight
        data-size={size ?? "base"}
        className="data-[size=base]:h-5 data-[size=lg]:h-5 data-[size=sm]:h-4 data-[size=base]:w-5 data-[size=lg]:w-5 data-[size=sm]:w-4 md:data-[size=lg]:h-6 md:data-[size=lg]:w-6"
        absoluteStrokeWidth={false}
        strokeWidth={2}
      />
    </Link>
  );
}
