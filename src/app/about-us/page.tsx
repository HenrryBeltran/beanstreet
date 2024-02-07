import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Metadata, Viewport } from "next";
import AboutUsHeader from "./AboutUsHeader";
import AboutUsOurMission from "./AboutUsOurMission";

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
      <AboutUsHeader />
      <AboutUsOurMission />
      <Footer />
    </main>
  );
}
