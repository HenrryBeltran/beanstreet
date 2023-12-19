import { Suspense } from "react";
import { ShopTitle, ShopTitleFallback } from "./ShopTitle";
import SortButton from "./SortButton";
import Sidenav, { SidenavMobile } from "./Sidenav";

export default async function ShopContainer() {
  return (
    <div className="relative">
      <SidenavMobile />
      <div className="sticky top-0 z-10 flex items-end justify-between bg-stone-50 px-6 py-6 md:py-8 xl:px-[var(--global-viewport-padding)]">
        <Suspense fallback={<ShopTitleFallback />}>
          <ShopTitle />
        </Suspense>
        <SortButton />
      </div>
      <div className="flex gap-6 px-6 xl:mx-[var(--global-viewport-padding)] xl:gap-16 xl:px-0">
        <Sidenav />
        <div className="flex-grow pt-6">
          <ul className="grid grid-flow-row grid-cols-2 gap-6 lg:grid-cols-3">
            <li className="h-96 w-full animate-pulse bg-stone-200 [animation-delay:0ms]"></li>
            <li className="h-96 w-full animate-pulse bg-stone-200 [animation-delay:100ms]"></li>
            <li className="h-96 w-full animate-pulse bg-stone-200 [animation-delay:200ms]"></li>
            <li className="h-96 w-full animate-pulse bg-stone-200 [animation-delay:300ms]"></li>
            <li className="h-96 w-full animate-pulse bg-stone-200 [animation-delay:0ms]"></li>
            <li className="h-96 w-full animate-pulse bg-stone-200 [animation-delay:100ms]"></li>
            <li className="h-96 w-full animate-pulse bg-stone-200 [animation-delay:200ms]"></li>
            <li className="h-96 w-full animate-pulse bg-stone-200 [animation-delay:300ms]"></li>
            <li className="h-96 w-full animate-pulse bg-stone-200 [animation-delay:0ms]"></li>
            <li className="h-96 w-full animate-pulse bg-stone-200 [animation-delay:100ms]"></li>
            <li className="h-96 w-full animate-pulse bg-stone-200 [animation-delay:200ms]"></li>
            <li className="h-96 w-full animate-pulse bg-stone-200 [animation-delay:300ms]"></li>
            <li className="h-96 w-full animate-pulse bg-stone-200 [animation-delay:0ms]"></li>
            <li className="h-96 w-full animate-pulse bg-stone-200 [animation-delay:100ms]"></li>
            <li className="h-96 w-full animate-pulse bg-stone-200 [animation-delay:200ms]"></li>
            <li className="h-96 w-full animate-pulse bg-stone-200 [animation-delay:300ms]"></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
