import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Props = {
  href: string;
  placeholder: string;
  dark?: boolean;
};

export default function LinkButton({ href, placeholder, dark }: Props) {
  return (
    <Link
      href={href}
      data-dark-theme={dark ?? false}
      className="flex w-fit items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-stone-100 px-5 py-2 text-stone-800 data-[dark-theme=true]:bg-stone-800 data-[dark-theme=true]:text-stone-100 md:gap-2.5 md:px-7 md:py-3"
    >
      <span className="text-lg font-medium md:text-xl">{placeholder}</span>
      <ArrowRight
        className="h-6 w-6 md:h-8 md:w-8"
        absoluteStrokeWidth={false}
        strokeWidth={2}
      />
    </Link>
  );
}
