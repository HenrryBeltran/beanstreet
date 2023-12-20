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
};

export default function SectionShopPage({ params }: Props) {
  const title = sections.find((section) => section.slug === params.section)?.name;

  return (
    <main>
      <Navbar theme="light" />
      <Banner theme="light" />
      <ShopContainer
        title={title}
        sectionSlug={params.section}
        isASection={true}
        getCount={() => getItemsCountBySection(params.section)}
        getItems={() => getItemsBySection(params.section)}
      />
      <div className="h-32 w-full" />
      <Footer />
    </main>
  );
}
