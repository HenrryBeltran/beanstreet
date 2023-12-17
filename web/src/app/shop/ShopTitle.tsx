import { getAllCountItems } from "@/lib/getAllItems";

export async function ShopTitle() {
  const data = await getAllCountItems();

  return (
    <h1 className="font-serif text-4xl font-bold leading-none text-stone-800">
      All {data && `(${data.count})`}
    </h1>
  );
}

export function ShopTitleFallback() {
  return (
    <h1 className="font-serif text-4xl font-bold leading-none text-stone-800">All</h1>
  );
}
