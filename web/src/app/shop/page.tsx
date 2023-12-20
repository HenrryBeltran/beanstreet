import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ShopContainer from "./ShopContainer";
import { getAllItems } from "@/lib/getAllItems";

type Props = {
  searchParams?: {
    sort?: string;
    d?: string;
  };
};

export default function ShopPage({ searchParams }: Props) {
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
    <main className="relative">
      <Navbar theme="light" />
      <Banner theme="light" />
      <ShopContainer
        initialSearch={initialSearch}
        getItems={() => getAllItems(urlSearchParams)}
      />
      <div className="h-32 w-full" />
      <Footer />
    </main>
  );
}
