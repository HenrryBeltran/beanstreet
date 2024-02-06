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
      <header className="mx-6 my-8 lg:mx-[var(--global-viewport-padding)]">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-stone-800  lg:text-4xl">
          Pick Up
        </h1>
        <p className="mt-2 text-stone-600">Your order is ready to pick up.</p>
      </header>
      <PickUpTable />
      <Footer />
    </main>
  );
}
