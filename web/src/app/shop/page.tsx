import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import ShopContainer from "./ShopContainer";
import Footer from "@/components/Footer";

export default function ShopPage() {
  return (
    <main className="relative">
      <Navbar theme="light" />
      <Banner theme="light" />
      <ShopContainer />
      <div className="h-32 w-full" />
      <Footer />
    </main>
  );
}
