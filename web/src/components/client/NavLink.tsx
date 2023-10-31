"use client";

import { usePathname } from "next/navigation";

export default function NavLinkMarker({ slug }: { slug: string }) {
  const pathname = usePathname();
  const isPathnameActive = pathname === `/${slug}`;

  return (
    <svg
      data-is-pathname-active={isPathnameActive}
      className="absolute -bottom-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 data-[is-pathname-active=false]:hidden"
      viewBox="0 0 6 6"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="3" cy="3" r="3" fill="currentColor" />
    </svg>
  );
}
