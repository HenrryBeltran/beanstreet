import Navbar from "@/components/Navbar";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import SignInForm from "./SignInForm";

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
          Login
        </h1>
        <div className="mb-6 flex w-full flex-col items-center justify-center">
          <SignInForm />
        </div>
        <p className="text-sm leading-none text-stone-500">
          Don’t have an account yet?{" "}
          <a className="whitespace-nowrap text-stone-700 hover:underline" href="/sign-up">
            Register here.
          </a>
        </p>
      </div>
    </main>
  );
}
