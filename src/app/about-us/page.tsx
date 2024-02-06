import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Bean Street - About Us",
  description: "Project Website of a Coffe Shop called Bean Street",
};

export const viewport: Viewport = {
  themeColor: "#292524",
};

export default function AboutUsPage() {
  return (
    <main className="bg-stone-700">
      <Navbar />
      <Banner theme="dark" />
      <header className="grid grid-cols-1 grid-rows-2 place-items-center gap-4 bg-stone-800 px-6 py-16 lg:h-80 lg:grid-cols-2 lg:grid-rows-1 lg:gap-0 lg:px-[var(--global-viewport-padding)] lg:py-0">
        <h1 className="max-w-xl text-balance px-6 text-center font-serif text-[11vw] font-medium leading-none tracking-tight text-stone-50 lg:px-12 lg:text-6xl">
          Find Bean Street Near You
        </h1>
        <p className="max-w-xl text-pretty px-6 text-center text-base font-light leading-relaxed text-stone-200 lg:px-12 lg:text-2xl">
          Find a cozy spot to relax and enjoy your delicious drink, whether with friends
          or alone.
        </p>
      </header>
      <Footer />
    </main>
  );
}
