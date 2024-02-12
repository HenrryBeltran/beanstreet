import FloatBanner from "@/components/FloatBanner";
import LinkButton from "@/components/LinkButton";
import Navbar from "@/components/Navbar";
import { Facebook, Instagram, TikTok, Twitter, Youtube } from "@/components/SocialIcons";
import Clipboard from "@/components/client/Clipboard";
import { ChevronsDown } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import beanStreetHero from "../../../public/bean-street-hero.jpg";
import SocialHeroLink from "./SocialHeroLink";
import Appear from "./Appear";
import ScrollDownMotionIcon from "./ScrollDownMotionIcon";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col bg-stone-950/60">
      <Image
        className="absolute top-0 -z-20 h-[100svh] object-cover object-center"
        src={beanStreetHero}
        alt="Hero Bean Street Cover"
        placeholder="blur"
        quality={80}
        priority
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
        <span
          style={{ animation: "grow-in-y 1.25s cubic-bezier(0.22,0.61,0.36,1)" }}
          className="m-0 block h-80 w-[1.5px] origin-bottom rounded-full bg-stone-300"
        ></span>
      </div>
      <div
        style={{ animation: "grow-in-y 1.25s cubic-bezier(0.22,0.61,0.36,1)" }}
        className="absolute bottom-24 right-6 hidden origin-top flex-col items-center gap-8 text-stone-300 md:flex"
      >
        <span className="m-0 block h-72 w-[1.5px] rounded-full bg-stone-300"></span>
        <div className="flex flex-col items-center justify-center gap-6 text-stone-200">
          <SocialHeroLink
            id="instagram-link"
            href="https://instagram.com"
            ariaLabel="Instagram link"
            delay={1.3}
          >
            <Instagram />
          </SocialHeroLink>
          <SocialHeroLink
            id="facebook-link"
            href="https://facebook.com"
            ariaLabel="Facebook link"
            delay={1.4}
          >
            <Facebook />
          </SocialHeroLink>
          <SocialHeroLink
            id="twitter-link"
            href="https://twitter.com"
            ariaLabel="Twitter link"
            delay={1.5}
          >
            <Twitter />
          </SocialHeroLink>
          <SocialHeroLink
            id="tiktok-link"
            href="https://tiktok.com"
            ariaLabel="Tiktok link"
            delay={1.6}
          >
            <TikTok />
          </SocialHeroLink>
          <SocialHeroLink
            id="youtube-link"
            href="https://youtube.com"
            ariaLabel="Youtube link"
            delay={1.7}
          >
            <Youtube />
          </SocialHeroLink>
        </div>
      </div>
      <Navbar theme="dark" crystal={true} />
      <Suspense>
        <FloatBanner />
      </Suspense>
      <div className="flex h-full grow items-center justify-center">
        <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center text-center">
          <h1
            style={{ animation: "appear-depth 1.5s cubic-bezier(0.22,0.61,0.36,1)" }}
            className="max-w-[80vw] font-serif text-[min(15vw,128px)] leading-[0.9] tracking-tighter text-white"
          >
            Welcome to Bean Street
          </h1>
          <Appear id="hero-p" duration={0.7} delay={0.5}>
            <p className="mb-12 mt-4 max-w-xs leading-relaxed text-stone-100 md:max-w-md md:text-xl md:leading-8">
              Our cozy and modern coffee shop is the perfect place to relax and enjoy a
              cup of coffee with friends or alone.
            </p>
          </Appear>
          <Appear id="shop-button" duration={0.7} delay={0.7}>
            <LinkButton href="/shop" placeholder="Shop Now" size="lg" />
          </Appear>
        </div>
      </div>
      <ScrollDownMotionIcon />
    </section>
  );
}
