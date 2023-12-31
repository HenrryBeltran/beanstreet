import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getAllItems } from "@/lib/getAllItems";
import {
  Drink,
  Pastrie,
  Sandwich,
  getDrinkBySlug,
  getPastrieBySlug,
  getSandwichBySlug,
} from "@/lib/getItemBySlug";
import { redirect } from "next/navigation";
import ItemInfo from "./ItemInfo";
import DrinkEditor from "./DrinkEditor";
import SandwichEditor from "./SandwichEditor";
import PastrieEditor from "./PastrieEditor";
import Link from "next/link";

export const dynamicParams = false;

export async function generateStaticParams() {
  const data = await getAllItems();

  if (!data) return [];

  return data.result.map((item) => ({
    type: item.type,
    slug: item.slug,
  }));
}

type Props = {
  params: {
    type: string;
    slug: string;
  };
};

export default async function ItemPage({ params }: Props) {
  let data: Drink | Sandwich | Pastrie | null;
  let editor: React.ReactElement;

  if (params.type === "drink") {
    data = await getDrinkBySlug(params.type, params.slug);

    const { result, milkOptions, sizeOptions } = data as Drink;
    editor = (
      <DrinkEditor result={result} milkOptions={milkOptions} sizeOptions={sizeOptions} />
    );
  } else if (params.type === "sandwich") {
    data = await getSandwichBySlug(params.type, params.slug);
    editor = <SandwichEditor />;
  } else if (params.type === "pastrie") {
    data = await getPastrieBySlug(params.type, params.slug);
    editor = <PastrieEditor />;
  } else {
    redirect("/shop");
  }

  if (!data) {
    redirect("/shop");
  }

  return (
    <main>
      <Navbar theme="light" />
      <Banner theme="light" />
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
              href={`/shop/${data.result[0].section_slug}`}
              className="transition-colors hover:text-stone-800"
            >
              {data.result[0].section_name}
            </Link>
          </li>
          <li>
            <span>•</span>
          </li>
          <li>
            <span className="text-stone-800">{data.result[0].name}</span>
          </li>
        </ul>
      </div>
      <div className="grid grid-flow-row grid-cols-1 gap-12 px-6 pb-16 pt-8 sm:mx-[var(--global-md-viewport-padding)] sm:px-0 lg:grid-cols-2 lg:grid-rows-1 lg:gap-16 lg:pb-32 xl:gap-32">
        <ItemInfo
          title={data?.result[0].name}
          description={data.result[0].description}
          slug={data.result[0].slug}
        />
        {editor}
      </div>
      <Footer />
    </main>
  );
}
