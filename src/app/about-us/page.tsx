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
    <main className="bg-stone-500">
      <Navbar />
      <h1>About Us Page</h1>
    </main>
  );
}
