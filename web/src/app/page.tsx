import FloatBanner from "@/components/FloatBanner";
import Navbar from "@/components/Navbar";
import beanStreetHero from "../../public/bean-street-hero.jpg";
import Image from "next/image";
import LinkButton from "@/components/LinkButton";

export default function HomePage() {
  return (
    <main className="">
      <section className="relative min-h-screen bg-stone-950/60">
        <Image
          className="absolute top-0 -z-50 h-[100dvh] object-cover object-center"
          src={beanStreetHero}
          alt="Hero Bean Street Cover"
          placeholder="blur"
          quality={100}
          fill
          sizes="100dvh"
        />
        <Navbar theme="crystal-dark" />
        <FloatBanner />

        <div className="mx-auto flex max-w-3xl flex-col items-center py-16 text-center">
          <h1 className="max-w-[80vw] font-serif text-[min(15vw,128px)] leading-none tracking-tighter text-white">
            Welcome to Bean Street
          </h1>
          <p className="mb-14 mt-4 max-w-xs leading-relaxed text-stone-100 md:max-w-md md:text-xl md:leading-8">
            Our cozy and modern coffee shop is the perfect place to relax and enjoy a cup
            of coffee with friends or alone.
          </p>
          <LinkButton href="/shop" placeholder="Shop Now" />
        </div>
      </section>
      <section>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque necessitatibus
        explicabo voluptates quis neque aspernatur sit nulla, itaque, qui nisi quia
        eligendi fugit aliquid sint nam odio enim sequi. Expedita?
      </section>
    </main>
  );
}
