import { Suspense } from "react";
import ItemsContainer, { ItemsContainerSkeleton } from "./ItemsContainer";
import { ShopTitle, ShopTitleFallback } from "./ShopTitle";
import Sidenav, { SidenavMobile } from "./Sidenav";
import SortButton from "./SortButton";
import { Items } from "@/lib/getAllItems";

type Props = {
  title?: string;
  sectionSlug?: string;
  isASection?: boolean;
  initialSearch?: string;
  getCount?: () => Promise<{ count: number } | null>;
  getItems?: () => Promise<Items | null>;
};

export default async function ShopContainer({
  title,
  sectionSlug,
  isASection,
  initialSearch,
  getCount,
  getItems,
}: Props) {
  return (
    <div className="relative">
      <SidenavMobile section={sectionSlug} />
      <div className="sticky top-0 z-10 flex items-end justify-between bg-stone-50 px-6 py-6 md:py-8 xl:px-[var(--global-viewport-padding)]">
        <Suspense fallback={<ShopTitleFallback title={title} />}>
          <ShopTitle title={title} getCount={getCount} />
        </Suspense>
        <SortButton isASection={isASection ?? false} initialSearch={initialSearch} />
      </div>
      <div className="flex gap-6 md:px-6 xl:mx-[var(--global-viewport-padding)] xl:gap-16 xl:px-0">
        <Sidenav isASection={isASection ?? false} section={sectionSlug} />
        <Suspense fallback={<ItemsContainerSkeleton />}>
          <ItemsContainer getItems={getItems} />
        </Suspense>
      </div>
    </div>
  );
}
