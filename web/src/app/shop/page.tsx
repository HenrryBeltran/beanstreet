import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import ShopContainer from "./ShopContainer";

export default function ShopPage() {
  return (
    <main>
      <Navbar theme="light" />
      <Banner theme="light" />
      <ShopContainer />
    </main>
  );
}
