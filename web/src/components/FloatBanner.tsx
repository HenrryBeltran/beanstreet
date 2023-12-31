import { getMainOffer } from "@/lib/getMainOffer";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function FloatBanner() {
  const data = await getMainOffer();

  if (!data) {
    return <div />;
  }

  return (
    <div className="mx-auto mt-6 flex w-fit justify-center rounded-2xl border-[1.5px] border-stone-200 px-6 py-4 text-sm text-stone-200 [animation:falling_1s_cubic-bezier(0.22,0.61,0.36,1)]">
      <span>
        {`${data.result.description} `}
        <Link className="whitespace-nowrap" href="/shop">
          <span className="inline-flex items-center">
            <strong className="underline-offset-2 hover:underline">Shop now</strong>
            <ChevronRight className="inline" width={20} height={20} strokeWidth={2} />
          </span>
        </Link>
      </span>
    </div>
  );
}
