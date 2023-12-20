"use client";

import { formSchema } from "@/utils/schemas";
import { Try } from "@/utils/try";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const registerFormSchema = formSchema
  .extend({
    confirmPassword: z
      .string()
      .min(8, { message: "Your password must be at least 8 characters." })
      .max(32, { message: "Your password must be less than 32 characters." }),
  })
  .refine(
    (data) => {
      return data.confirmPassword === data.password;
    },
    { message: "The passwords doesn't match.", path: ["confirmPassword"] },
  );

type Inputs = z.infer<typeof registerFormSchema>;

export default function SignUpForm() {
  const [revealPassword, setRevealPassword] = useState(false);
  const [revealConfirmPassword, setRevealConfirmPassword] = useState(false);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<Inputs>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, email, password } = data;

    const { error, result: response } = await Try(
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
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

  return (
    <form
      className="flex w-full max-w-md flex-col items-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="name" className="mb-2 text-sm leading-none text-stone-600">
        Name
      </label>
      <div className="mb-6 w-full">
        <input
          className="w-full rounded-md border border-none border-stone-300 bg-stone-200/50 px-5 py-3 leading-none text-stone-800 outline-none"
          id="name"
          type="name"
          {...register("name")}
        />
        <p className="mt-2 text-start text-sm leading-none text-red-500">
          {errors.name?.message}
        </p>
      </div>
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
      <div className="mb-6 w-full">
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
      <label
        htmlFor="confirm-password"
        className="mb-2 text-sm leading-none text-stone-600"
      >
        Confirm Password
      </label>
      <div className="mb-12 w-full">
        <div className="relative">
          <input
            className="w-full rounded-md border border-none border-stone-300 bg-stone-200/50 px-5 py-3 leading-none text-stone-800 outline-none"
            id="confirm-password"
            type={revealConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
          />
          <label className="absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer text-stone-700">
            <input
              className="hidden"
              aria-hidden={true}
              type="checkbox"
              defaultChecked={revealConfirmPassword}
              onChange={() => setRevealConfirmPassword(!revealConfirmPassword)}
            />
            {revealConfirmPassword ? (
              <Eye absoluteStrokeWidth strokeWidth={1.5} size={20} />
            ) : (
              <EyeOff absoluteStrokeWidth strokeWidth={1.5} size={20} />
            )}
          </label>
        </div>
        <p className="mt-2 text-start text-sm leading-none text-red-500">
          {errors.confirmPassword?.message}
        </p>
        <p className="mt-2 text-start text-sm text-stone-500">
          * Password must be 8 - 20 characters length.
        </p>
        <p className="text-start text-sm leading-none text-stone-500">
          * Password have to contain a number.
        </p>
      </div>
      <button
        disabled={isSubmitting}
        className="w-full select-none rounded-full bg-stone-800 py-3.5 text-lg font-medium leading-none text-stone-100 disabled:cursor-wait disabled:bg-stone-500"
        ref={submitBtnRef}
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
}
