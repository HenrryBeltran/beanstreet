import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <main className="relative">
      <Navbar theme="light" />
      <section className="w-full px-6 pb-32 pt-16 lg:px-[var(--global-viewport-padding)]">
        <h1 className="text-xl font-light text-stone-600 lg:text-2xl">404</h1>
        <h2 className="mt-3 font-serif text-5xl font-bold text-stone-800 lg:text-6xl">
          Oops! Something&apos;s wrong here...
        </h2>
        <p className="mt-6 leading-relaxed text-stone-600">
          We can&apos;t find the page you&apos;re looking for. You can head back to home.
        </p>
        <a href="/" aria-label="Go to home">
          Home
        </a>
      </section>
      <Footer />
    </main>
  );
}
