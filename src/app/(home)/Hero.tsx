import FloatBanner from "@/components/FloatBanner";
import LinkButton from "@/components/LinkButton";
import Navbar from "@/components/Navbar";
import { Facebook, Instagram, TikTok, Twitter, Youtube } from "@/components/SocialIcons";
import Clipboard from "@/components/client/Clipboard";
import { ChevronsDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import beanStreetHero from "../../../public/bean-street-hero.jpg";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col bg-stone-950/60">
      <Image
        className="absolute top-0 -z-20 h-[100svh] object-cover object-center"
        src={beanStreetHero}
        alt="Hero Bean Street Cover"
        placeholder="blur"
        priority={true}
        quality={80}
        fill
        sizes="100svh"
      />
      <div className="absolute bottom-24 left-6 hidden flex-col items-center gap-8 text-stone-300 md:flex">
        <Clipboard
          value="info@beanstreet.project"
          className="rotate-180 transition-colors [writing-mode:vertical-rl] hover:text-stone-50"
        >
          info@beanstreet.project
        </Clipboard>
        <span className="m-0 block h-80 w-[1.5px] rounded-full bg-stone-300"></span>
      </div>
      <div className="absolute bottom-24 right-6 hidden flex-col items-center gap-8 text-stone-300 md:flex">
        <span className="m-0 block h-72 w-[1.5px] rounded-full bg-stone-300"></span>
        <div className="flex flex-col items-center justify-center gap-6 text-stone-200">
          <Link
            className="transition-colors hover:text-stone-50"
            href="https://instagram.com"
            target="_blank"
            aria-label="Instagram link"
          >
            <Instagram />
          </Link>
          <Link
            className="transition-colors hover:text-stone-50"
            href="https://facebook.com"
            target="_blank"
            aria-label="Facebook link"
          >
            <Facebook />
          </Link>
          <Link
            className="transition-colors hover:text-stone-50"
            href="https://twitter.com"
            target="_blank"
            aria-label="Twitter link"
          >
            <Twitter />
          </Link>
          <Link
            className="transition-colors hover:text-stone-50"
            href="https://tiktok.com"
            target="_blank"
            aria-label="Tiktok link"
          >
            <TikTok />
          </Link>
          <Link
            className="transition-colors hover:text-stone-50"
            href="https://youtube.com"
            target="_blank"
            aria-label="Youtube link"
          >
            <Youtube />
          </Link>
        </div>
      </div>
      <Navbar theme="dark" crystal={true} />
      <Suspense>
        <FloatBanner />
      </Suspense>
      <div className="flex h-full grow items-center justify-center">
        <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center text-center">
          <h1 className="max-w-[80vw] font-serif text-[min(15vw,128px)] leading-[0.9] tracking-tighter text-white">
            Welcome to Bean Street
          </h1>
          <p className="mb-12 mt-4 max-w-xs leading-relaxed text-stone-100 md:max-w-md md:text-xl md:leading-8">
            Our cozy and modern coffee shop is the perfect place to relax and enjoy a cup
            of coffee with friends or alone.
          </p>
          <LinkButton href="/shop" placeholder="Shop Now" size="lg" />
        </div>
      </div>
      <ChevronsDown
        size={64}
        strokeWidth={2}
        absoluteStrokeWidth={true}
        className="mx-auto mb-8 mt-10 text-stone-200"
      />
    </section>
  );
}
