import { Suspense } from "react";
import { ShopTitle, ShopTitleFallback } from "./ShopTitle";
import SortButton from "./SortButton";

export default async function ShopContainer() {
  return (
    <>
      <div className="flex items-end justify-between px-6 py-8 lg:mx-[var(--global-viewport-padding)] lg:px-0">
        <Suspense fallback={<ShopTitleFallback />}>
          <ShopTitle />
        </Suspense>
        <SortButton />
      </div>
    </>
  );
}
