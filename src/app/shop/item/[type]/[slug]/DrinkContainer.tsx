import { getDrinkBySlug } from "@/lib/getItemBySlug";
import Link from "next/link";
import { redirect } from "next/navigation";
import DrinkEditor from "./DrinkEditor";
import ItemInfo from "./ItemInfo";

type Props = {
  params: {
    type: string;
    slug: string;
  };
};

export default async function DrinkContainer({ params }: Props) {
  const data = await getDrinkBySlug(params.type, params.slug);

  if (!data) {
    redirect("/shop");
  }

  return (
    <>
      <div className="px-6 py-8 lg:mx-[var(--global-viewport-padding)] lg:px-0">
        <ul className="flex gap-1 text-sm leading-none text-stone-500 lg:text-base">
          <li>
            <Link href="/shop" className="transition-colors hover:text-stone-800">
              Shop
            </Link>
          </li>
          <li>
            <span>•</span>
          </li>
          <li>
            <Link
              href={`/shop/${data.result.sectionSlug}`}
              className="transition-colors hover:text-stone-800"
            >
              {data.result.sectionName}
            </Link>
          </li>
          <li>
            <span>•</span>
          </li>
          <li>
            <span className="text-stone-800">{data.result.name}</span>
          </li>
        </ul>
      </div>
      <div className="grid grid-flow-row grid-cols-1 gap-12 px-6 pb-16 pt-8 sm:mx-[var(--global-md-viewport-padding)] sm:px-0 lg:grid-cols-2 lg:grid-rows-1 lg:gap-16 lg:pb-32 xl:gap-32">
        <ItemInfo
          title={data?.result.name}
          description={data.result.description}
          slug={data.result.slug}
        />
        <DrinkEditor result={data.result} />
      </div>
    </>
  );
}
