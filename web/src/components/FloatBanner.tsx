import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function FloatBanner() {
  return (
    <div className="mx-auto mt-8 flex w-fit justify-center rounded-2xl border-[1.5px] border-stone-200 px-6 py-4 text-sm text-stone-200">
      <span>
        10% discount in all drinks.{" "}
        <span className="whitespace-nowrap">
          <strong>Shop now</strong>
          <Link href="/shop">
            <ChevronRight className="inline" width={20} height={20} strokeWidth={2} />
          </Link>
        </span>
      </span>
    </div>
  );
}
