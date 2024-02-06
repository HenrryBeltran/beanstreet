"use client";

import { SessionResult } from "@/lib/getSession";
import { timeline } from "motion";
import Link from "next/link";
import { MouseEventHandler, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  theme: "dark" | "light";
  isOpen?: boolean; // Check if this is going to stay here
  session: SessionResult | null;
};

export default function NavDropdownMenu({ theme, session }: Props) {
  const handleMouseOver: MouseEventHandler = (e) => {
    const link = e.currentTarget.querySelector(".item");
    const mark = e.currentTarget.querySelector(".mark");
    timeline([
      [link!, { x: 24 }, { duration: 0.24, easing: "ease-out" }],
      [mark!, { opacity: 1 }, { duration: 0.24, easing: "ease-out", at: "-0.2" }],
    ]);
  };

  const handleMouseLeave: MouseEventHandler = (e) => {
    const link = e.currentTarget.querySelector(".item");
    const mark = e.currentTarget.querySelector(".mark");
    timeline([
      [mark!, { opacity: 0 }, { duration: 0.24, easing: "ease-out" }],
      [link!, { x: 0 }, { duration: 0.24, easing: "ease-out", at: "-0.2" }],
    ]);
  };

  return (
    <div
      data-theme={theme}
      id="drop-down"
      className="invisible absolute -right-6 -top-3 z-40 h-0 w-screen origin-top overflow-y-scroll data-[theme=dark]:bg-stone-800 data-[theme=light]:bg-stone-50"
    >
      <ul
        data-theme={theme}
        className="space-y-5 px-6 pb-6 pt-[4.5rem] data-[theme=dark]:text-stone-300 data-[theme=light]:text-stone-700"
      >
        <MenuLink
          className="drop-down-li"
          href="/"
          theme={theme}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          Home
        </MenuLink>
        <MenuLink
          className="drop-down-li"
          href="/shop"
          theme={theme}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          Shop
        </MenuLink>
        <MenuLink
          className="drop-down-li"
          href="/locations"
          theme={theme}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          Locations
        </MenuLink>
        <MenuLink
          className="drop-down-li"
          href="/about-us"
          theme={theme}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          About Us
        </MenuLink>
        {!session && (
          <>
            <MenuLink
              className="drop-down-li"
              as="a"
              href="/sign-in"
              theme={theme}
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            >
              Sign In
            </MenuLink>
            <MenuLink
              className="drop-down-li"
              as="a"
              href="/sign-up"
              theme={theme}
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            >
              Sign Up
            </MenuLink>
          </>
        )}
        <MenuLink
          className="drop-down-li"
          as="a"
          href="/cart"
          theme={theme}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          Cart
        </MenuLink>
      </ul>
    </div>
  );
}

type LinkProps = {
  as?: "Link" | "a";
  className: string;
  href: string;
  theme: "dark" | "light";
  children: ReactNode;
  onMouseOver?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
};

function MenuLink({
  as = "Link",
  className,
  href,
  theme,
  children,
  onMouseOver,
  onMouseLeave,
}: LinkProps) {
  function handleClick() {
    const body = document.querySelector("body");

    if (body) {
      body.style.height = "auto";
      body.style.overflow = "visible";
    }
  }

  return (
    <li
      className="relative text-4xl font-medium"
      onClick={handleClick}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <span
        data-theme={theme}
        className="mark absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full opacity-0 data-[theme=dark]:bg-stone-50 data-[theme=light]:bg-stone-950"
      />
      {as === "Link" ? (
        <Link
          data-theme={theme}
          href={href}
          className={twMerge(
            "item relative z-10 block transition-colors duration-700 tap-highlight-transparent hover:data-[theme=dark]:text-stone-50 hover:data-[theme=light]:text-stone-950",
            className,
          )}
        >
          {children}
        </Link>
      ) : (
        <a
          data-theme={theme}
          href={href}
          className={twMerge(
            "item relative z-10 block transition-colors duration-700 tap-highlight-transparent hover:data-[theme=dark]:text-stone-50 hover:data-[theme=light]:text-stone-950",
            className,
          )}
        >
          {children}
        </a>
      )}
    </li>
  );
}
