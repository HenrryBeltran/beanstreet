import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Page not found",
  description:
    "We can't find the page you&apos;re looking for. You can head back to home.",
};

export default function NotFound() {
  return (
    <main className="relative">
      <Navbar theme="light" />
      <section className="flex w-full flex-col items-center justify-center gap-12 px-6 py-32 lg:flex-row lg:px-[var(--global-viewport-padding)]">
        <h1 className="text-[28vw] font-light leading-none text-stone-400 lg:text-[18vw]">
          404
        </h1>
        <div className="flex max-w-sm flex-col justify-center lg:block lg:max-w-lg">
          <h2 className="mt-3 text-balance text-center font-serif text-5xl font-bold text-stone-800 lg:text-left lg:text-6xl">
            Something&apos;s wrong here...
          </h2>
          <p className="mt-6 text-pretty text-center text-base leading-relaxed text-stone-600 lg:text-left lg:text-lg lg:leading-relaxed">
            We can&apos;t find the page you&apos;re looking for. You can head back to
            home.
          </p>
          <a
            href="/"
            aria-label="Go to home"
            className="mt-8 inline-block rounded-full bg-stone-800 px-6 py-3 text-center text-xl font-medium leading-none text-stone-50 transition-colors hover:bg-stone-700 lg:text-left"
          >
            Go Home
          </a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
