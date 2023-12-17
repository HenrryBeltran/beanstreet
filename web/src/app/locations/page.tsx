import Navbar from "@/components/Navbar";
import { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#292524",
};

export default function LocationsPage() {
  return (
    <main className="bg-stone-500">
      <Navbar />
      <h1>Locations Page</h1>
    </main>
  );
}
