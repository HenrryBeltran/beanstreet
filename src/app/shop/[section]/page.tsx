import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getItemsBySection, getItemsCountBySection } from "@/lib/getItemsBySection";
import ShopContainer from "../ShopContainer";

export const dynamicParams = false;

const sections = [
  { slug: "hot-coffees", name: "Hot Coffees" },
  { slug: "hot-drinks", name: "Hot Drinks" },
  { slug: "cold-coffees", name: "Cold Coffees" },
  { slug: "sandwiches-and-more", name: "Sandwiches & More" },
  { slug: "pastries", name: "Pastries" },
];

export const generateStaticParams = async () =>
  sections.map((section) => ({ section: section.slug }));

type Props = {
  params: { section: string };
  searchParams?: {
    sort?: string;
    d?: string;
  };
};

export default function SectionShopPage({ params, searchParams }: Props) {
  const title = sections.find((section) => section.slug === params.section)?.name;

  let urlSearchParams: string | undefined;

  if (searchParams?.sort !== undefined) {
    urlSearchParams = "?" + new URLSearchParams(searchParams).toString();
  } else {
    urlSearchParams = undefined;
  }

  const initialSearch = searchParams?.sort?.concat(
    searchParams?.d ? "-" : "",
    searchParams?.d ?? "",
  );

  return (
    <main>
      <Navbar theme="light" />
      <Banner theme="light" />
      <ShopContainer
        title={title}
        sectionSlug={params.section}
        isASection={true}
        initialSearch={initialSearch}
        getCount={() => getItemsCountBySection(params.section)}
        getItems={() => getItemsBySection(params.section, urlSearchParams)}
      />
      <div className="h-32 w-full" />
      <Footer />
    </main>
  );
}
