import Footer from "@/components/Footer";
import AboutUsOverview from "./AboutUsOverview";
import Hero from "./Hero";
import SelectedCoffees from "./SelectedCoffees";

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
