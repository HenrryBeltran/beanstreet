import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function PrivacyPolicyPage() {
  return (
    <main className="relative">
      <Navbar theme="light" />
      <section className="w-full px-6 pb-32 pt-16 lg:px-[var(--global-viewport-padding)]">
        <h1 className="text-xl font-light text-stone-600 lg:text-2xl">Privacy Policy</h1>
        <h2 className="mt-3 font-serif text-5xl font-bold text-stone-800 lg:text-6xl">
          Bean Street
        </h2>
        <p className="mt-6 leading-relaxed text-stone-600">
          At Bean Street Coffee Shop, we take the privacy and security of our
          customers&apos; personal information very seriously. This policy describes how
          we collect, use, and protect the personal information of our customers.
        </p>
        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-stone-700">
          What information do we collect?
        </h3>
        <p className="leading-relaxed text-stone-600">
          We collect personal information such as names, email addresses, mailing
          addresses, phone numbers, and payment information from our customers when they
          place an order online or in-store. We also collect information such as IP
          addresses, browser types, and device identifiers when customers access our
          website.
        </p>
        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-stone-700">
          How do we use this information?
        </h3>
        <p className="leading-relaxed text-stone-600">
          We use the personal information we collect to process orders, provide customer
          service, and communicate with our customers about their orders. We also use this
          information to improve our products and services, and to send marketing
          communications to our customers.
        </p>
        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-stone-700">
          Do we share this information with third parties?
        </h3>
        <p className="leading-relaxed text-stone-600">
          We do not share our customers personal information with third parties, except as
          necessary to process orders or comply with legal requirements.
        </p>
        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-stone-700">
          How do we protect this information?
        </h3>
        <p className="leading-relaxed text-stone-600">
          We take appropriate measures to protect our customers personal information,
          including using encryption and secure servers to transmit and store this
          information.
        </p>
        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-stone-700">
          How can customers access and control their personal information?
        </h3>
        <p className="leading-relaxed text-stone-600">
          Customers can access and update their personal information by logging into their
          account on our website. They can also contact us to request that we delete their
          personal information.
        </p>
        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-stone-700">
          Do we use cookies or other tracking technologies?
        </h3>
        <p className="leading-relaxed text-stone-600">
          Yes, we use cookies and other tracking technologies to improve our website and
          personalize our customers experience.
        </p>
        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-stone-700">
          Do we make deliveries?
        </h3>
        <p className="leading-relaxed text-stone-600">
          No, we don&apos;t make deliveries. We collect personal information such as
          names, and phone numbers for the purpose of picking up the orders.
        </p>
        <p className="mt-6 leading-relaxed text-stone-600">
          If you have any questions or concerns about our privacy policy, please contact
          us at info@beanstreet.project
        </p>
      </section>
      <Footer />
    </main>
  );
}
