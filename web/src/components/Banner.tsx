import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Banner() {
  return (
    <div className="flex justify-center bg-stone-700 py-4 text-sm text-stone-50">
      <span>
        10% discount in all drinks. <strong>Shop now</strong>
        <Link href="/shop">
          <ChevronRight
            className="inline"
            size={20}
            strokeWidth={2}
            absoluteStrokeWidth={false}
          />
        </Link>
      </span>
    </div>
  );
}
