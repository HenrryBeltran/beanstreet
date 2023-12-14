import Footer from "@/components/Footer";
import AboutUsOverview from "./AboutUsOverview";
import Hero from "./Hero";
import SelectedCoffees from "./SelectedCoffees";
import { unstable_noStore as noStore } from "next/cache";

export default function HomePage() {
  noStore();

  return (
    <main>
      <Hero />
      <AboutUsOverview />
      <SelectedCoffees />
      <Footer />
    </main>
  );
}
