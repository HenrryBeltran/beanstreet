import { getAllCountItems } from "@/lib/getAllItems";

type Props = {
  title?: string;
  getCount?: () => Promise<{ count: number } | null>;
};

export async function ShopTitle({ title, getCount = getAllCountItems }: Props) {
  const data = await getCount();

  return (
    <h1 className="font-serif text-3xl font-bold leading-none text-stone-800 md:text-4xl">
      {title ?? "All"} {data && `(${data.count})`}
    </h1>
  );
}

export function ShopTitleFallback({ title }: { title?: string }) {
  return (
    <h1 className="font-serif text-3xl font-bold leading-none text-stone-800 md:text-4xl">
      {title ?? "All"}
    </h1>
  );
}
