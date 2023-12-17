import Footer from "@/components/Footer";
import { Viewport } from "next";
import AboutUsOverview from "./AboutUsOverview";
import Hero from "./Hero";
import SelectedCoffees from "./SelectedCoffees";

export const viewport: Viewport = {
  themeColor: "#292524",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutUsOverview />
      <SelectedCoffees />
      <Footer />
    </main>
  );
}
