import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "./faq";

export default function FAQsPage() {
  return (
    <main className="relative">
      <Navbar theme="light" />
      <section className="w-full px-6 pb-32 pt-16 lg:px-[calc(var(--global-viewport-padding)*2)]">
        <h1 className="mb-6 mt-3 px-6 font-serif text-5xl font-bold text-red-500 lg:text-6xl">
          FQAS
        </h1>
        <FAQ
          question="What are your hours of operation?"
          answer="Our coffee shop is open from 7am to 11pm, Monday through Saturday, and from 8am to 8pm on Sundays."
          defaultOpen
        />
        <FAQ
          question="Do you roast your own coffee beans?"
          answer="No, we source our coffee beans from the best roasters around the world to ensure the highest quality and freshest taste."
        />
        <FAQ
          question="Do you offer vegan or gluten-free options?"
          answer="Yes, we offer a variety of vegan and gluten-free options, including our vegan matcha latte."
        />
        <FAQ
          question="Do you offer free Wi-Fi?"
          answer="Yes, we have wi-fi in our locals for the customers."
        />
      </section>
      <Footer />
    </main>
  );
}
