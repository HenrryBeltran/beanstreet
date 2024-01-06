"use client";

import { logout } from "@/lib/logout";
import { Menu, Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { CircleUserRound, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

type Props = {
  theme: "dark" | "light";
  username?: string;
};

export default function ProfileDropdown({ theme, username }: Props) {
  const { data, refetch, isSuccess } = useQuery({
    queryFn: logout,
    queryKey: ["session"],
    enabled: false,
  });

  if (isSuccess && data === 200) {
    window.location.reload();
  }

  const handleLogout = () => refetch();

  return (
    <Menu as="div" className="relative h-6 w-6">
      <Menu.Button className="group outline-none">
        <CircleUserRound
          absoluteStrokeWidth
          strokeWidth={1.5}
          className="transition-[stroke-width] duration-200 group-hover:stroke-2"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Menu.Items
          as="ul"
          data-theme={theme}
          className="group absolute -right-4 top-full z-30 mt-2 flex w-56 flex-col items-start rounded-md border pb-3 pt-2 text-sm shadow-xl outline-none data-[theme=dark]:border-stone-600 data-[theme=light]:border-stone-300/80 data-[theme=dark]:bg-stone-800 data-[theme=light]:bg-stone-50 data-[theme=dark]:text-stone-200 data-[theme=light]:text-stone-600 data-[theme=dark]:shadow-stone-900/30 data-[theme=light]:shadow-stone-500/20 md:mt-4"
        >
          <Menu.Item
            as="li"
            className="mb-3 w-full border-b px-4 pb-3 pt-1.5 group-data-[theme=dark]:border-b-stone-600 group-data-[theme=light]:border-b-stone-300/80"
          >
            <span className="font-medium leading-none group-data-[theme=dark]:text-stone-50 group-data-[theme=light]:text-stone-700">
              {username}
            </span>
          </Menu.Item>
          <Menu.Item
            as="li"
            data-theme={theme}
            className="group w-full px-4 py-2 hover:data-[theme=dark]:bg-stone-700 hover:data-[theme=light]:bg-stone-200"
          >
            {
              <Link
                className="flex w-full items-center justify-between"
                href="/account/settings"
              >
                <span>Account settings</span>
                <Settings absoluteStrokeWidth strokeWidth={1.5} size={18} />
              </Link>
            }
          </Menu.Item>
          <Menu.Item
            as="li"
            data-theme={theme}
            className="group w-full px-4 py-2 hover:data-[theme=dark]:bg-stone-700 hover:data-[theme=light]:bg-stone-200"
          >
            {
              <button
                className="flex w-full items-center justify-between"
                onClick={handleLogout}
              >
                <span>Logout</span>
                <LogOut absoluteStrokeWidth strokeWidth={1.5} size={18} />
              </button>
            }
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
