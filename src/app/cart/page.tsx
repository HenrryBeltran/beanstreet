import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CartTable from "./CartTable";

export default function CartPage() {
  return (
    <main>
      <Navbar theme="light" />
      <Banner theme="light" />
      <h1 className="mx-6 my-8 font-serif text-3xl font-bold tracking-tight text-stone-800 lg:mx-[var(--global-viewport-padding)] lg:text-4xl">
        Cart
      </h1>
      <CartTable />
      <Footer />
    </main>
  );
}
