import { Items, getAllItems } from "@/lib/getAllItems";
import ItemCard from "./ItemCard";

type Props = {
  getItems?: () => Promise<Items | null>;
};

export default async function ItemsContainer({ getItems = getAllItems }: Props) {
  const data = await getItems();

  return (
    <div className="flex-grow pt-6">
      <ul className="grid grid-flow-row grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
        {data?.result.map((item) => <ItemCard item={item} key={item.slug} />)}
      </ul>
    </div>
  );
}

export function ItemsContainerSkeleton() {
  return (
    <div className="flex-grow pt-6">
      <ul className="grid grid-flow-row grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
        <ItemCardSkeleton delay="0ms" />
        <ItemCardSkeleton delay="100ms" />
        <ItemCardSkeleton delay="200ms" />
        <ItemCardSkeleton delay="300ms" />
        <ItemCardSkeleton delay="400ms" />
        <ItemCardSkeleton delay="500ms" />
      </ul>
    </div>
  );
}

function ItemCardSkeleton({ delay }: { delay: string }) {
  return (
    <li className="w-full animate-pulse space-y-3 pb-3" style={{ animationDelay: delay }}>
      <div className="aspect-square w-full bg-stone-200" />
      <div className="h-[min(1.5rem,4.5vw)] w-3/5 rounded-md bg-stone-200" />
      <div className="h-[min(1.25rem,4vw)] w-1/4 rounded-md bg-stone-200" />
      <div className="h-[min(1.25rem,4vw)] w-1/3 rounded-md bg-stone-200" />
    </li>
  );
}
