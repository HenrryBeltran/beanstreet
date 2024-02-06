import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getSession } from "@/lib/getSession";
import { UserCog } from "lucide-react";
import { redirect } from "next/navigation";
import EditAccountForm from "./EditAccountForm";
import DeleteAccountButton from "./DeleteAccountButton";

export default async function AccountSettingsPage() {
  const session = await getSession();

  if (session === null || session.user === undefined) {
    redirect("/sign-in");
  }

  if (session.user?.role.some((value) => value === "viewer")) {
    return (
      <main>
        <Navbar theme="light" />
        <section className="px-6">
          <div className="max-w-screen-xl lg:mx-auto">
            <div className="flex min-h-svh flex-col items-center justify-center pb-32">
              <UserCog
                className="rounded-full bg-red-200/70 p-4 text-red-500"
                absoluteStrokeWidth
                strokeWidth={6}
                size={96}
              />
              <h1 className="mt-8 text-balance text-center font-serif text-3xl font-bold tracking-tight text-stone-800 lg:text-4xl">
                This account cannot be modified
              </h1>
              <p className="mt-2 max-w-sm text-center text-sm leading-relaxed text-stone-600 sm:text-base sm:leading-relaxed">
                You are using a test account, and cannot be modified. You can create an{" "}
                <a
                  href="/sign-up"
                  className="font-medium text-stone-800 hover:underline"
                  aria-label="Go to sign up page"
                >
                  account here
                </a>{" "}
                to check this account edit page.
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar theme="light" />
      <section className="px-6">
        <div className="max-w-screen-xl border-b border-stone-300 py-8 sm:py-16 lg:mx-auto">
          <header className="space-y-2 border-b border-stone-300 pb-4">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-stone-800 sm:text-3xl lg:text-4xl">
              Account Settings
            </h1>
            <p className="text-sm leading-none text-stone-600 sm:text-base">
              Manage your account settings and change you password.
            </p>
          </header>
          <EditAccountForm username={session.user.name} userEmail={session.user.email} />
        </div>
        <div className="max-w-screen-xl py-8 sm:py-16 lg:mx-auto">
          <h1 className="font-serif text-2xl font-bold tracking-tight text-red-500 sm:text-3xl lg:text-4xl">
            Danger Zone
          </h1>
          <p className="mt-8 text-sm leading-none text-stone-600 sm:text-base sm:leading-none">
            You can delete your account with all data.
          </p>
          <DeleteAccountButton />
        </div>
      </section>
      <Footer />
    </main>
  );
}
