"use client";

import { animate } from "motion";
import Link from "next/link";
import { ReactNode, useEffect } from "react";

type Props = {
  id: string;
  href: string;
  ariaLabel: string;
  delay: number;
  children: ReactNode;
};

export default function SocialHeroLink({ id, href, ariaLabel, delay, children }: Props) {
  useEffect(() => {
    animate(
      `#${id}`,
      { opacity: [0, 1] },
      { duration: 0.5, delay: delay, easing: "ease-out" },
    );
  });

  return (
    <Link
      id={id}
      className="opacity-0 transition-colors hover:text-stone-50"
      href={href}
      target="_blank"
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
