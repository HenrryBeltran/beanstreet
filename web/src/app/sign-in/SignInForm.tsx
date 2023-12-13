"use client";

import { formSchema } from "@/utils/schemas";
import { Try } from "@/utils/try";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = formSchema.omit({ name: true });
type Inputs = z.infer<typeof loginFormSchema>;

export default function SignInForm() {
  const [revealPassword, setRevealPassword] = useState(false);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    setError,
  } = useForm<Inputs>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const { email, password } = data;

    const { error, result: response } = await Try(
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      }),
    );

    if (!response) {
      console.error(error);
      return;
    }

    const { error: parseError, result } = await Try<{
      message: string;
      path: "email" | null;
    }>(response.json());

    if (parseError) {
      console.error(parseError);
      return;
    }

    if (!response.ok) {
      setError(result.path ?? "root", { message: result.message });
      return;
    }

    router.replace("/shop");
  };

  const setUserHandler = ({ email, password }: { email: string; password: string }) => {
    setValue("email", email);
    setValue("password", password);
    submitBtnRef.current?.focus();
  };

  return (
    <>
      <div className="relative mb-12 flex w-fit whitespace-nowrap text-sm leading-none text-stone-500">
        <p className="peer">
          Use an example{" "}
          <span className="peer cursor-pointer text-stone-700">
            account
            <ChevronRight
              className="inline-block"
              absoluteStrokeWidth
              strokeWidth={1.5}
              size={16}
            />
          </span>
        </p>
        <ul className="invisible absolute left-1/2 top-full block -translate-x-1/2 space-y-4 rounded-md bg-stone-50 p-6 pt-8 text-start opacity-0 shadow-2xl transition-opacity duration-300 ease-in hover:visible hover:opacity-100 peer-hover:visible peer-hover:opacity-100">
          <li className="space-y-2">
            <p className="text-stone-700">Use an user account</p>
            <button
              className="rounded-full bg-stone-800 px-3 py-1.5 leading-none text-stone-50 transition-colors hover:bg-stone-700"
              onClick={() =>
                setUserHandler({ email: "user@example.com", password: "coffee123" })
              }
            >
              User
            </button>
          </li>
          <li className="space-y-2">
            <p className="text-stone-700">Use an manager account</p>
            <button
              className="rounded-full bg-stone-800 px-3 py-1.5 leading-none text-stone-50 transition-colors hover:bg-stone-700"
              onClick={() =>
                setUserHandler({
                  email: "manager@example.com",
                  password: "beanstreet123",
                })
              }
            >
              Manager
            </button>
          </li>
        </ul>
      </div>
      <form
        className="flex w-full max-w-md flex-col items-start"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="email" className="mb-2 text-sm leading-none text-stone-600">
          Email
        </label>
        <div className="mb-6 w-full">
          <input
            className="w-full rounded-md border border-none border-stone-300 bg-stone-200/50 px-5 py-3 leading-none text-stone-800 outline-none"
            id="email"
            type="email"
            {...register("email")}
          />
          <p className="mt-2 text-start text-sm leading-none text-red-500">
            {errors.email?.message}
          </p>
        </div>
        <label htmlFor="password" className="mb-2 text-sm leading-none text-stone-600">
          Password
        </label>
        <div className="mb-12 w-full">
          <div className="relative">
            <input
              className="w-full rounded-md border border-none border-stone-300 bg-stone-200/50 px-5 py-3 leading-none text-stone-800 outline-none"
              id="password"
              type={revealPassword ? "text" : "password"}
              {...register("password")}
            />
            <label className="absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer text-stone-700">
              <input
                className="hidden"
                aria-hidden={true}
                type="checkbox"
                defaultChecked={revealPassword}
                onChange={() => setRevealPassword(!revealPassword)}
              />
              {revealPassword ? (
                <Eye absoluteStrokeWidth strokeWidth={1.5} size={20} />
              ) : (
                <EyeOff absoluteStrokeWidth strokeWidth={1.5} size={20} />
              )}
            </label>
          </div>
          <p className="mt-2 text-start text-sm leading-none text-red-500">
            {errors.password?.message}
          </p>
        </div>
        <button
          disabled={isSubmitting}
          className="w-full select-none rounded-full bg-stone-800 py-3.5 text-lg font-medium leading-none text-stone-100 disabled:cursor-wait disabled:bg-stone-500"
          ref={submitBtnRef}
          type="submit"
        >
          Sign In
        </button>
      </form>
    </>
  );
}
