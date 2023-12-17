"use client";

import { getSession } from "@/lib/getSession";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import ProfileDropdown from "./ProfileDropdown";

type Props = {
  theme: "dark" | "light";
};

export default function Profile({ theme }: Props) {
  const { data, isLoading } = useQuery({
    queryFn: getSession,
    queryKey: ["session"],
  });

  if (isLoading) {
    return;
  }

  return (
    <>
      {data ? (
        <ProfileDropdown theme={theme} username={data.user?.name} />
      ) : (
        <>
          <div className="flex gap-6">
            <Link
              data-theme={theme}
              href="/sign-in"
              className="hidden rounded-full border px-3.5 py-2 font-medium leading-4 data-[theme=dark]:border-stone-100 data-[theme=light]:border-stone-800 data-[theme=dark]:text-stone-100 data-[theme=light]:text-stone-800 lg:block"
            >
              Login
            </Link>
            <Link
              data-theme={theme}
              href="/sign-up"
              className="hidden rounded-full border px-3.5 py-2 font-medium leading-4 data-[theme=dark]:border-stone-100 data-[theme=light]:border-stone-800 data-[theme=dark]:bg-stone-100 data-[theme=light]:bg-stone-800 data-[theme=dark]:text-stone-800 data-[theme=light]:text-stone-50 md:block"
            >
              Sign Up
            </Link>
          </div>
          <Link
            data-theme={theme}
            href="/sign-up"
            className="text-sm font-medium transition-colors duration-200 tap-highlight-transparent data-[theme=dark]:text-stone-200 data-[theme=ligth]:text-stone-700 hover:data-[theme=dark]:text-white hover:data-[theme=light]:text-stone-950 md:hidden"
          >
            Sign Up
          </Link>
        </>
      )}
    </>
  );
}
