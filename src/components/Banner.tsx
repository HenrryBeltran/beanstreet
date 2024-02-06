import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getMainOffer } from "@/lib/getMainOffer";

type Props = {
  theme?: "dark" | "light";
};

export default async function Banner({ theme = "dark" }: Props) {
  const data = await getMainOffer();

  return (
    <div
      data-theme={theme}
      className="relative overflow-hidden text-sm data-[theme=dark]:bg-stone-600 data-[theme=dark]:text-stone-50 data-[theme=light]:text-stone-800"
    >
      {data && (
        <div
          data-theme={theme}
          className="relative flex w-full animate-[falling_1s_cubic-bezier(0.22,0.61,0.36,1)] justify-center py-4 data-[theme=dark]:bg-stone-700 data-[theme=light]:bg-stone-200/70"
        >
          <span>
            {`${data.result.description} `}
            <Link href="/shop" className="group">
              <strong className="group-hover:underline">Shop now</strong>
              <ChevronRight
                className="inline"
                size={20}
                strokeWidth={2}
                absoluteStrokeWidth={false}
              />
            </Link>
          </span>
        </div>
      )}
    </div>
  );
}
