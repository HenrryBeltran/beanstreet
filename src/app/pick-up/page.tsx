import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PickUpTable from "./PickUpTable";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function TakeOutPage() {
  const session = await getSession();

  if (session === null) {
    redirect("/sign-in");
  }

  return (
    <main>
      <Navbar theme="light" />
      <Banner theme="light" />
      <h1 className="mx-6 my-8 font-serif text-3xl font-bold tracking-tight text-stone-800 lg:mx-[var(--global-viewport-padding)] lg:text-4xl">
        Pick Up
      </h1>
      <PickUpTable />
      <Footer />
    </main>
  );
}
