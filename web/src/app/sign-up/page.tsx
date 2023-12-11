import Navbar from "@/components/Navbar";
import SignUpForm from "./SignUpForm";

export default function SignUpPage() {
  return (
    <main className="bg-stone-500">
      <Navbar />
      <h1>Sign Up Page</h1>
      <SignUpForm />
    </main>
  );
}
