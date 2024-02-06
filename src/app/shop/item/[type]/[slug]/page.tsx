import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getAllItems } from "@/lib/getAllItems";
import { Suspense } from "react";
import DrinkContainer from "./DrinkContainer";
import ItemEditorSkeleton from "./ItemEditorSkeleton";
import PastrieContainer from "./PastrieContainer";
import SandwichContainer from "./SandwichContainer";

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
  return (
    <main>
      <Navbar theme="light" />
      <Banner theme="light" />
      {params.type === "drink" && (
        <Suspense fallback={<ItemEditorSkeleton />}>
          <DrinkContainer params={params} />
        </Suspense>
      )}
      {params.type === "sandwich" && (
        <Suspense fallback={<ItemEditorSkeleton />}>
          <SandwichContainer params={params} />
        </Suspense>
      )}
      {params.type === "pastrie" && (
        <Suspense fallback={<ItemEditorSkeleton />}>
          <PastrieContainer params={params} />
        </Suspense>
      )}
      <Footer />
    </main>
  );
}
