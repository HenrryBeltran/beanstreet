import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import MenuButton from "./MenuButton";
import NavLinkMarker from "./client/NavLink";
import { twMerge } from "tailwind-merge";

type Props = {
  theme?: "crystal-dark" | "dark" | "ligth";
};

export default function Navbar({ theme }: Props) {
  return (
    <nav className="sticky left-0 top-0 h-12 px-6 data-[theme=dark]:bg-stone-950/70 md:h-[60px]">
      <div
        data-theme={theme ?? "dark"}
        className="relative mx-auto flex h-full max-w-7xl items-center justify-between text-stone-100"
      >
        <Link
          href="/"
          className="flex h-min w-min flex-col items-center whitespace-nowrap"
        >
          <h1 className="font-serif text-[14.5px] font-bold leading-none tracking-tight text-stone-50 md:text-lg md:leading-none">
            Bean Street
          </h1>
          <h2 className="text-[9.5px] font-medium leading-none tracking-widest text-stone-300 md:scale-100 md:text-xs md:leading-none">
            Coffee Shop
          </h2>
        </Link>
        <ul className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex md:gap-8">
          <NavLink className="hidden lg:inline" name="Home" slug="" />
          <NavLink name="Shop" slug="shop" />
          <NavLink name="Locations" slug="locations" />
          <NavLink name="About Us" slug="about-us" />
        </ul>
        <div className="flex items-center gap-6 md:gap-8">
          <div className="flex gap-6">
            <Link
              href="/sign-in"
              className="hidden rounded-full border border-stone-100 px-3.5 py-2 font-medium leading-4 text-stone-100 lg:block"
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className="hidden rounded-full border border-stone-100 bg-stone-100 px-3.5 py-2 font-medium leading-4 text-stone-800 md:block"
            >
              Sign Up
            </Link>
          </div>
          <Link href="/sign-up" className="text-sm font-medium md:hidden">
            Sign Up
          </Link>
          <Link href="/cart" className="relative">
            <ShoppingBag strokeWidth={1.5} />
            <div className="absolute left-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-stone-100">
              <span className="text-sm font-medium leading-none text-stone-800">2</span>
            </div>
          </Link>
          <MenuButton />
        </div>
      </div>
    </nav>
  );
}

type LinkProps = {
  name: string;
  slug: string;
  className?: string;
};

function NavLink({ name, slug, className = "" }: LinkProps) {
  return (
    <li className={twMerge("relative", className)}>
      <Link href={`/${slug}`} color="currentColor">
        {name}
      </Link>
      <NavLinkMarker slug={slug} />
    </li>
  );
}
