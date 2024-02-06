import { SessionResult } from "@/lib/getSession";
import ProfileDropdown from "./ProfileDropdown";

type Props = {
  theme: "dark" | "light";
  session: SessionResult | null;
};

export default async function Profile({ theme, session }: Props) {
  return (
    <>
      {session ? (
        <ProfileDropdown theme={theme} username={session.user?.name} />
      ) : (
        <>
          <div className="flex gap-6">
            <a
              data-theme={theme}
              href="/sign-in"
              className="hidden rounded-full border px-3.5 py-2 font-medium leading-4 data-[theme=dark]:border-stone-100 data-[theme=light]:border-stone-800 data-[theme=dark]:text-stone-100 data-[theme=light]:text-stone-800 lg:block"
            >
              Login
            </a>
            <a
              data-theme={theme}
              href="/sign-up"
              className="hidden rounded-full border px-3.5 py-2 font-medium leading-4 data-[theme=dark]:border-stone-100 data-[theme=light]:border-stone-800 data-[theme=dark]:bg-stone-100 data-[theme=light]:bg-stone-800 data-[theme=dark]:text-stone-800 data-[theme=light]:text-stone-50 md:block"
            >
              Sign Up
            </a>
          </div>
          <a
            data-theme={theme}
            href="/sign-up"
            className="text-sm font-medium transition-colors duration-200 tap-highlight-transparent data-[theme=dark]:text-stone-200 data-[theme=ligth]:text-stone-700 hover:data-[theme=dark]:text-white hover:data-[theme=light]:text-stone-950 md:hidden"
          >
            Sign Up
          </a>
        </>
      )}
    </>
  );
}
