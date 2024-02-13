import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = {
  href: string;
  placeholder: string;
  dark?: boolean;
  size?: "sm" | "base" | "lg";
  ariaLabel?: string;
  className?: string;
};

export default function LinkButton(props: Props) {
  return (
    <Link
      href={props.href}
      data-dark-theme={props.dark ?? false}
      data-size={props.size ?? "base"}
      aria-label={props.ariaLabel}
      className={twMerge(
        "group relative flex w-fit items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap rounded-full bg-stone-100 text-stone-800 transition-colors duration-300 hover:text-stone-900 data-[dark-theme=true]:bg-stone-800 data-[size=base]:px-5 data-[size=base]:py-2 data-[size=lg]:px-5 data-[size=lg]:py-2 data-[size=sm]:px-4 data-[size=sm]:py-1.5 data-[dark-theme=true]:text-stone-100 hover:data-[dark-theme=true]:text-stone-50 md:data-[size=lg]:gap-2.5 md:data-[size=lg]:px-6 md:data-[size=lg]:py-3",
        props.className,
      )}
    >
      <span
        data-dark-theme={props.dark ?? false}
        data-size={props.size ?? "base"}
        className="pointer-events-none absolute top-[110%] block w-full rounded-full bg-stone-300 text-transparent transition-all duration-300 group-hover:top-0 data-[dark-theme=true]:bg-stone-600 data-[size=base]:px-5 data-[size=base]:py-2 data-[size=lg]:px-5 data-[size=lg]:py-2 data-[size=sm]:px-4 data-[size=sm]:py-1.5 data-[size=base]:text-lg data-[size=lg]:text-lg data-[size=sm]:text-base md:data-[size=lg]:gap-2.5 md:data-[size=lg]:px-6 md:data-[size=lg]:py-3 md:data-[size=lg]:text-xl"
      >
        empty
      </span>
      <span
        data-size={props.size ?? "base"}
        className="z-10 font-medium data-[size=base]:text-lg data-[size=lg]:text-lg data-[size=sm]:text-base md:data-[size=lg]:text-xl"
      >
        {props.placeholder}
      </span>
      <ArrowRight
        data-size={props.size ?? "base"}
        className="z-10 data-[size=base]:h-5 data-[size=lg]:h-5 data-[size=sm]:h-4 data-[size=base]:w-5 data-[size=lg]:w-5 data-[size=sm]:w-4 md:data-[size=lg]:h-6 md:data-[size=lg]:w-6"
        absoluteStrokeWidth={false}
        strokeWidth={2}
      />
    </Link>
  );
}
