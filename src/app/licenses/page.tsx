import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function LicensesPage() {
  return (
    <main className="relative">
      <Navbar theme="light" />
      <section className="w-full px-6 pb-32 pt-16 lg:px-[calc(var(--global-viewport-padding)*2)]">
        <h1 className="mt-3 font-serif text-5xl font-bold text-stone-800 lg:text-6xl">
          Licenses
        </h1>
        <p className="mt-6 leading-relaxed text-stone-600">
          All graphical assets in this template are licensed for personal and commercial
          use. If you&apos;d like to use a specific asset, please check the license below.
        </p>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight text-stone-700">
          Photography
        </h2>
        <p className="leading-relaxed text-stone-600">
          All images in this project are sourced from Pexels and Unsplash, are free for
          commercial use. Check out the license for Pexels{" "}
          <a
            href="https://www.pexels.com/license/"
            target="_blank"
            className="font-semibold hover:underline"
          >
            here
          </a>
          , and Unsplash{" "}
          <a
            href="https://unsplash.com/license"
            target="_blank"
            className="font-semibold hover:underline"
          >
            here
          </a>
        </p>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight text-stone-700">
          Icons & SVG&apos;s
        </h2>
        <p className="leading-relaxed text-stone-600">
          All icons are from Lucide, for more info check the license for Lucide{" "}
          <a
            href="https://lucide.dev/license"
            target="_blank"
            className="font-semibold hover:underline"
          >
            here
          </a>
          .
        </p>
        <br />
        <p className="leading-relaxed text-stone-600">
          All svg&apos;s are from Freepik, for more info check the lincense for Freepik{" "}
          <a
            href="https://www.freepikcompany.com/legal?_gl=1*1cuuser*_ga*MjIyNjAwNjM3LjE3MDczMzQwNDc.*_ga_QWX66025LC*MTcwNzMzOTI4NS4yLjEuMTcwNzMzOTI5MS41NC4wLjA.*_ga_18B6QPTJPC*MTcwNzMzOTI4NS4yLjEuMTcwNzMzOTI5MS41NC4wLjA.#nav-freepik-agreement"
            target="_blank"
            className="font-semibold hover:underline"
          >
            here
          </a>
          .
        </p>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight text-stone-700">
          Fonts
        </h2>
        <p className="leading-relaxed text-stone-600">
          All fonts used in this project are available to use freely under Fontshare and
          Google Gonts, check out the license for{" "}
          <a
            href="https://www.fontshare.com/licenses/itf-ffl"
            target="_blank"
            className="font-semibold hover:underline"
          >
            Poppins here
          </a>{" "}
          and the license for{" "}
          <a
            href="https://fonts.google.com/knowledge/glossary/licensing"
            target="_blank"
            className="font-semibold hover:underline"
          >
            Libre Bodoni
          </a>{" "}
          here.
        </p>
        <br />
        <p className="leading-relaxed text-stone-600">
          Website design and code by Henrry Beltrán, for contact check my portfolio{" "}
          <a
            href="https://portfolio.henrry.site/"
            target="_blank"
            className="font-semibold hover:underline"
          >
            here
          </a>
          .
        </p>
      </section>
      <Footer />
    </main>
  );
}
