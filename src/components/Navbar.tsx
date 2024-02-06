import { getSession } from "@/lib/getSession";
import Link from "next/link";
import { Suspense } from "react";
import { twMerge } from "tailwind-merge";
import ShoppingCartButton, { ShoppingCartButtonFallback } from "./ShoppingCartButton";
import MenuButton from "./client/MenuButton";
import NavLinkMarker from "./client/NavLink";
import Profile from "./client/Profile";

type Props = {
  theme?: "dark" | "light";
  crystal?: boolean;
};

export default async function Navbar({ theme = "dark", crystal = false }: Props) {
  const session = await getSession();

  return (
    <nav
      data-theme={theme}
      data-crystal={crystal}
      className="h-12 px-6 data-[crystal=true]:!bg-transparent data-[theme=dark]:bg-stone-950/70 data-[theme=light]:bg-stone-50 md:h-[60px]"
    >
      <div
        data-theme={theme}
        className="relative mx-auto flex h-full max-w-screen-xl items-center justify-between data-[theme=dark]:text-stone-100 data-[theme=light]:text-stone-800"
      >
        <Link
          href="/"
          className="group flex h-min w-min flex-col items-center whitespace-nowrap tap-highlight-transparent"
        >
          <span
            data-theme={theme}
            className="font-serif text-[14.5px] font-bold leading-none tracking-tight transition-colors duration-200 data-[theme=dark]:text-stone-200 data-[theme=light]:text-stone-700 group-hover:data-[theme=dark]:text-white group-hover:data-[theme=light]:text-stone-950 md:text-lg md:leading-none"
          >
            Bean Street
          </span>
          <span
            data-theme={theme}
            className="text-[9.5px] font-medium leading-none tracking-widest data-[theme=dark]:text-stone-300 data-[theme=light]:text-stone-600 group-hover:data-[theme=dark]:text-stone-100 group-hover:data-[theme=light]:text-stone-950 md:scale-100 md:text-xs md:leading-none"
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
          <Profile theme={theme} session={session} />
          <Suspense fallback={<ShoppingCartButtonFallback />}>
            <ShoppingCartButton theme={theme} />
          </Suspense>
          <MenuButton theme={theme} session={session} />
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
