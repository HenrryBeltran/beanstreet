import Navbar from "@/components/Navbar";
import SignInForm from "./SignInForm";

export default function SignInPage() {
  return (
    <main className="bg-stone-50">
      <Navbar theme="light" />
      <h1>Sign In Page</h1>
      <div className="">
        <SignInForm />
      </div>
    </main>
  );
}
