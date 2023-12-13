import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import MenuButton from "./MenuButton";
import NavLinkMarker from "./client/NavLink";

type Props = {
  theme?: "crystal-dark" | "dark" | "light";
};

export default function Navbar({ theme }: Props) {
  return (
    <nav
      data-theme={theme ?? "dark"}
      className="h-12 px-6 data-[theme=crystal-dark]:bg-transparent data-[theme=dark]:bg-stone-950/70 data-[theme=light]:bg-stone-50 md:h-[60px]"
    >
      <div
        data-theme={theme ?? "dark"}
        className="relative mx-auto flex h-full max-w-screen-xl items-center justify-between data-[theme=crystal-dark]:text-stone-100 data-[theme=dark]:text-stone-100 data-[theme=light]:text-stone-800"
      >
        <Link
          href="/"
          className="flex h-min w-min flex-col items-center whitespace-nowrap"
        >
          <span
            data-theme={theme ?? "dark"}
            className="font-serif text-[14.5px] font-bold leading-none tracking-tight data-[theme=crystal-dark]:text-stone-50 data-[theme=dark]:text-stone-50 data-[theme=light]:text-stone-800 md:text-lg md:leading-none"
          >
            Bean Street
          </span>
          <span
            data-theme={theme ?? "dark"}
            className="text-[9.5px] font-medium leading-none tracking-widest data-[theme=crystal-dark]:text-stone-300 data-[theme=dark]:text-stone-300 data-[theme=light]:text-stone-600 md:scale-100 md:text-xs md:leading-none"
          >
            Coffee Shop
          </span>
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
              data-theme={theme ?? "dark"}
              href="/sign-in"
              className="hidden rounded-full border px-3.5 py-2 font-medium leading-4 data-[theme=crystal-dark]:border-stone-100 data-[theme=dark]:border-stone-100 data-[theme=light]:border-stone-800 data-[theme=crystal-dark]:text-stone-100 data-[theme=dark]:text-stone-100 data-[theme=light]:text-stone-800 lg:block"
            >
              Login
            </Link>
            <Link
              data-theme={theme ?? "dark"}
              href="/sign-up"
              className="hidden rounded-full border px-3.5 py-2 font-medium leading-4 data-[theme=crystal-dark]:border-stone-100 data-[theme=dark]:border-stone-100 data-[theme=light]:border-stone-800 data-[theme=crystal-dark]:bg-stone-100 data-[theme=dark]:bg-stone-100 data-[theme=light]:bg-stone-800 data-[theme=crystal-dark]:text-stone-800 data-[theme=dark]:text-stone-800 data-[theme=light]:text-stone-50 md:block"
            >
              Sign Up
            </Link>
          </div>
          <Link href="/sign-up" className="text-sm font-medium md:hidden">
            Sign Up
          </Link>
          <Link href="/cart" className="relative">
            <ShoppingBag size={24} strokeWidth={1.5} absoluteStrokeWidth={false} />
            <div
              data-theme={theme ?? "dark"}
              className="absolute left-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full data-[theme=crystal-dark]:bg-stone-100 data-[theme=dark]:bg-stone-100 data-[theme=light]:bg-stone-800"
            >
              <span
                data-theme={theme ?? "dark"}
                className="text-sm font-medium leading-none data-[theme=crystal-dark]:text-stone-800 data-[theme=dark]:text-stone-800 data-[theme=light]:text-stone-50"
              >
                2
              </span>
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
