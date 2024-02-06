import Providers from "@/utils/Providers";
import type { Metadata } from "next";
import { Libre_Bodoni, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
const bodoni = Libre_Bodoni({
  subsets: ["latin"],
  variable: "--font-bodoni",
});

export const metadata: Metadata = {
  title: "Bean Street",
  description: "Project Website of a Coffe Shop called Bean Street",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`${poppins.variable} ${bodoni.variable}`}>
      <body className="bg-stone-50">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
