import getSelectedItems from "@/lib/getSelectedItems";
import CarouselCard from "./CarouselCard";
import CarouselScroll from "./client/CarouselScroll";

export default async function CarouselContainer({ type }: { type: "drinks" | "food" }) {
  const data = await getSelectedItems(type);

  return (
    <CarouselScroll itemLength={data.result.length ?? 0}>
      {data.result.map(item => (
        <CarouselCard item={item} key={item.slug} />
      ))}
    </CarouselScroll>
  );
}

export function CarouselSkeleton() {
  return (
    <div className="relative h-[428px] overflow-hidden">
      <div className="overflow-hidden pb-16 lg:scroll-p-[var(--global-viewport-padding)]">
        <div className="w-fit px-6 lg:px-[var(--global-viewport-padding)]">
          <ul className="grid w-max grid-flow-col grid-rows-1 gap-6">
            <li className="relative w-fit snap-start space-y-3 pb-3">
              <div className="h-80 w-80 animate-pulse bg-stone-200" />
              <div className="h-5 w-64 animate-pulse bg-stone-200" />
              <div className="h-3.5 w-40 animate-pulse bg-stone-200" />
              <div className="h-4 w-20 animate-pulse bg-stone-200" />
            </li>
            <li className="relative w-fit snap-start space-y-3 pb-3">
              <div className="h-80 w-80 animate-pulse bg-stone-200" />
              <div className="h-5 w-64 animate-pulse bg-stone-200" />
              <div className="h-3.5 w-40 animate-pulse bg-stone-200" />
              <div className="h-4 w-20 animate-pulse bg-stone-200" />
            </li>
            <li className="relative w-fit snap-start space-y-3 pb-3">
              <div className="h-80 w-80 animate-pulse bg-stone-200" />
              <div className="h-5 w-64 animate-pulse bg-stone-200" />
              <div className="h-3.5 w-40 animate-pulse bg-stone-200" />
              <div className="h-4 w-20 animate-pulse bg-stone-200" />
            </li>
            <li className="relative w-fit snap-start space-y-3 pb-3">
              <div className="h-80 w-80 animate-pulse bg-stone-200" />
              <div className="h-5 w-64 animate-pulse bg-stone-200" />
              <div className="h-3.5 w-40 animate-pulse bg-stone-200" />
              <div className="h-4 w-20 animate-pulse bg-stone-200" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
