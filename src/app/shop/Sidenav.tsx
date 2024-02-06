import { X } from "lucide-react";
import Link from "next/link";

type Props = {
  isASection: boolean;
  section?: string;
};

export default function Sidenav({ isASection, section }: Props) {
  return (
    <aside className="sticky top-[104px] hidden h-fit max-w-[156px] space-y-8 md:block">
      <ul className="space-y-4">
        <li className="text-lg font-bold leading-none text-stone-800">Drinks</li>
        <NavigationLinks
          href="/shop/hot-coffees"
          section={section}
          sectionLink="hot-coffees"
        >
          Hot Coffees
        </NavigationLinks>
        <NavigationLinks
          href="/shop/hot-drinks"
          section={section}
          sectionLink="hot-drinks"
        >
          Hot Drinks
        </NavigationLinks>
        <NavigationLinks
          href="/shop/cold-coffees"
          section={section}
          sectionLink="cold-coffees"
        >
          Cold Coffees
        </NavigationLinks>
      </ul>
      <ul className="space-y-4">
        <li className="text-lg font-bold leading-none text-stone-800">Food</li>
        <NavigationLinks
          href="/shop/sandwiches-and-more"
          section={section}
          sectionLink="sandwiches-and-more"
        >
          Sandwiches & More
        </NavigationLinks>
        <NavigationLinks href="/shop/pastries" section={section} sectionLink="pastries">
          Pastries
        </NavigationLinks>
      </ul>
      {isASection && (
        <div className="relative">
          <Link
            href="/shop"
            className="peer inline-block font-medium leading-none text-red-500 transition-all ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:font-bold"
          >
            Clear filters
          </Link>
          <span className="pointer-events-none invisible absolute -left-5 top-1/2 block h-fit w-fit -translate-y-1/2 translate-x-full text-red-500 opacity-0 transition-all delay-75 duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] peer-hover:visible peer-hover:translate-x-0 peer-hover:opacity-100">
            <X absoluteStrokeWidth strokeWidth={2} size={16} />
          </span>
        </div>
      )}
    </aside>
  );
}

export function SidenavMobile({ section }: { section?: string }) {
  return (
    <aside className="flex h-fit p-6 md:hidden">
      <ul className="flex-1 space-y-4">
        <li className="text-lg font-bold leading-none text-stone-800">Drinks</li>
        <NavigationLinks
          href="/shop/hot-coffees"
          section={section}
          sectionLink="hot-coffees"
        >
          Hot Coffees
        </NavigationLinks>
        <NavigationLinks
          href="/shop/hot-drinks"
          section={section}
          sectionLink="hot-drinks"
        >
          Hot Drinks
        </NavigationLinks>
        <NavigationLinks
          href="/shop/cold-coffees"
          section={section}
          sectionLink="cold-coffees"
        >
          Cold Coffees
        </NavigationLinks>
      </ul>
      <ul className="flex-1 space-y-4">
        <li className="text-lg font-bold leading-none text-stone-800">Food</li>
        <NavigationLinks
          href="/shop/sandwiches-and-more"
          section={section}
          sectionLink="sandwiches-and-more"
        >
          Sandwiches & More
        </NavigationLinks>
        <NavigationLinks href="/shop/pastries" section={section} sectionLink="pastries">
          Pastries
        </NavigationLinks>
        {section && (
          <li className="relative leading-none">
            <Link
              href="/shop"
              className="peer inline-block font-medium text-red-500 transition-all ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:font-bold"
            >
              Clear filters
            </Link>
            <span className="pointer-events-none invisible absolute -left-[1.125rem] top-1/2 block h-fit w-fit -translate-y-1/2 translate-x-full text-red-500 opacity-0 transition-all delay-75 duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] peer-hover:visible peer-hover:translate-x-0 peer-hover:opacity-100">
              <X absoluteStrokeWidth strokeWidth={2} size={16} />
            </span>
          </li>
        )}
      </ul>
    </aside>
  );
}

type LinkProps = {
  href: string;
  section?: string; // section get by navigation pathname
  sectionLink: string; // current section name to compare
  children?: React.ReactNode;
};

function NavigationLinks({ href, section, sectionLink, children }: LinkProps) {
  return (
    <li className="relative leading-none text-stone-700">
      <Link
        href={href}
        style={{ fontWeight: section === sectionLink ? 700 : 400 }}
        className="peer whitespace-nowrap transition-all ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:!font-bold"
      >
        {children}
      </Link>
      <span
        style={{
          visibility: section === sectionLink ? "visible" : "hidden",
          opacity: section === sectionLink ? 1 : 0,
          transform:
            section === sectionLink
              ? "translate(0, var(--tw-translate-y))"
              : "translate(var(--tw-translate-x), var(--tw-translate-y))",
        }}
        className="pointer-events-none invisible absolute -left-3.5 top-1/2 block h-2 w-2 -translate-y-1/2 translate-x-full rounded-full bg-stone-700 opacity-0 transition-all delay-75 duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] peer-hover:!visible peer-hover:!translate-x-0 peer-hover:!opacity-100 md:-left-4"
      />
    </li>
  );
}
