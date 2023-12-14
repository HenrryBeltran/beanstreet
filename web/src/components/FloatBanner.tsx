import { ChevronRight } from "lucide-react";
import Link from "next/link";

export type Offer = {
  result: {
    name: string;
    slug: string;
    description: string;
    discount: number;
    offerType: string[];
  };
};

export default async function FloatBanner() {
  const res = await fetch(`${process.env.API_URL}/offer/main`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();

  if (!data) {
    return <div />;
  }

  return (
    <div className="mx-auto mt-6 flex w-fit justify-center rounded-2xl border-[1.5px] border-stone-200 px-6 py-4 text-sm text-stone-200 [animation:falling_1s_cubic-bezier(0.22,0.61,0.36,1)]">
      <span>
        {`${data.result.description} `}
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
