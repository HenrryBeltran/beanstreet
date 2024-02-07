import LinkButton from "@/components/LinkButton";
import Image from "next/image";
import aboutUs from "../../../public/about-us-story.jpg";

export default function AboutUsHeader() {
  return (
    <header className="grid grid-flow-row grid-cols-1 bg-orange-100 lg:grid-cols-2 lg:grid-rows-1 lg:py-0">
      <Image
        src={aboutUs}
        placeholder="blur"
        alt="About us story"
        quality={80}
        className="w-full object-cover object-center lg:h-full lg:object-left"
      />
      <div className="w-full bg-orange-100 p-6 lg:p-11">
        <h1 className="text-xl font-medium leading-none tracking-tight text-orange-600 lg:text-2xl">
          Our Story
        </h1>
        <h2 className="my-4 max-w-lg text-balance font-serif text-[8vw] font-bold capitalize leading-none tracking-tight text-stone-800 lg:text-5xl">
          The best place to enjoy coffee in town!
        </h2>
        <p className="max-w-lg text-pretty text-left text-base font-light leading-relaxed text-stone-700 lg:text-lg lg:leading-relaxed">
          Bean Street Coffee Shop was founded by two coffee lovers, Jane and John. They
          had a passion for coffee, but found it difficult to find a coffee shop that
          offered the perfect blend of quality, atmosphere, and service. So they decided
          to open their own coffee shop that would offer just that.
        </p>
        <br />
        <p className="max-w-lg text-pretty text-left text-base font-light leading-relaxed text-stone-700 lg:text-lg lg:leading-relaxed">
          Today, Bean Street is still run by Jane and John, who are committed to providing
          their customers with the best coffee experience possible. They continue to
          source only the best coffee beans and ingredients, and to create unique and
          delicious coffee blends that their customers love.
        </p>
        <LinkButton
          href="/shop"
          className="mt-10"
          placeholder="Shop Now"
          ariaLabel="Shop link"
          dark
        />
      </div>
    </header>
  );
}
