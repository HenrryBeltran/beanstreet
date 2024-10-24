import Navbar from "@/components/Navbar";
import SignUpForm from "./SignUpForm";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSession";

export default async function SignInPage() {
  const session = await getSession();

  if (session) {
    redirect("/shop");
  }

  return (
    <main>
      <Navbar theme="light" />
      <div className="flex min-h-[calc(100svh-48px)] max-w-screen-3xl flex-col items-center justify-center px-6 pb-24 text-center md:min-h-[calc(100svh-60px)] lg:mx-[var(--global-viewport-padding)] lg:px-0">
        <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight text-stone-700">
          Sign Up
        </h1>
        <p className="text-sm leading-none text-stone-500">
          Already have an account?{" "}
          <a className="whitespace-nowrap text-stone-700 hover:underline" href="/sign-in">
            Log in here.
          </a>
        </p>
        <div className="mt-6 flex w-full flex-col items-center justify-center">
          <SignUpForm />
        </div>
      </div>
    </main>
  );
}
