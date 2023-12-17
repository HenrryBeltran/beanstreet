"use client";

import { logout } from "@/lib/logout";
import { Menu } from "@headlessui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleUserRound, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

type Props = {
  theme: "dark" | "light";
  username?: string;
};

export default function ProfileDropdown({ theme, username }: Props) {
  const queryClient = useQueryClient();

  const { data, refetch } = useQuery({
    queryFn: logout,
    queryKey: ["session"],
    enabled: false,
  });

  useEffect(() => {
    if (data === 200) {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    }
  }, [data, queryClient]);

  function handleLogout() {
    refetch();
  }

  return (
    <Menu as="div" className="relative h-6 w-6">
      <Menu.Button className="group outline-none">
        <CircleUserRound
          absoluteStrokeWidth
          strokeWidth={1.5}
          className="transition-[stroke-width] duration-200 group-hover:stroke-2"
        />
      </Menu.Button>
      <Menu.Items
        as="ul"
        data-theme={theme}
        className="absolute -right-4 top-full mt-4 flex flex-col items-start rounded-md py-2 text-sm font-medium shadow-xl outline-none data-[theme=dark]:bg-stone-800 data-[theme=light]:bg-stone-200 data-[theme=dark]:shadow-stone-900/40 data-[theme=light]:shadow-stone-600/25"
      >
        <Menu.Item
          as="li"
          data-theme={theme}
          className="mb-2 w-full border-b px-4 pb-3 pt-1.5 data-[theme=dark]:border-b-stone-700 data-[theme=light]:border-b-stone-300"
        >
          <span className="font-bold leading-none">{username}</span>
        </Menu.Item>
        <Menu.Item
          as="li"
          data-theme={theme}
          className="group w-full px-4 py-1.5 hover:data-[theme=dark]:bg-stone-700 hover:data-[theme=light]:bg-stone-300"
        >
          {
            <Link className="flex gap-2 whitespace-nowrap" href="/account/settings">
              <Settings absoluteStrokeWidth strokeWidth={1.5} size={18} />
              <span>Account settings</span>
            </Link>
          }
        </Menu.Item>
        <Menu.Item
          as="li"
          data-theme={theme}
          className="group w-full px-4 py-1.5 hover:data-[theme=dark]:bg-stone-700 hover:data-[theme=light]:bg-stone-300"
        >
          {
            <button className="flex gap-2" onClick={handleLogout}>
              <LogOut absoluteStrokeWidth strokeWidth={1.5} size={18} />
              <span>Logout</span>
            </button>
          }
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
