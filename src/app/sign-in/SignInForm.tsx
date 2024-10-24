"use client";

import { formSchema } from "@/utils/schemas";
import { Try } from "@/utils/try";
import { Popover, Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, UserCircle } from "lucide-react";
import { Fragment, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = formSchema.omit({ name: true });
type Inputs = z.infer<typeof loginFormSchema>;

export default function SignInForm() {
  const [revealPassword, setRevealPassword] = useState(false);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    setError,
  } = useForm<Inputs>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
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

    window.location.replace("/shop");
  };

  const fillFormHandler = ({ email, password }: { email: string; password: string }) => {
    setValue("email", email);
    setValue("password", password);
    submitBtnRef.current?.focus();
  };

  return (
    <form
      className="flex w-full max-w-md flex-col items-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="email" className="mb-1 text-sm leading-none text-stone-600">
        Email
      </label>
      <div className="mb-2 w-full">
        <input
          className="w-full rounded-md bg-stone-200/50 px-5 py-3 leading-none text-stone-800 outline-none aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-red-500"
          id="email"
          type="email"
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
        />
        <p className="mt-2 text-start text-sm leading-none text-red-500">
          {errors.email?.message}
        </p>
      </div>
      <label htmlFor="password" className="mb-1 text-sm leading-none text-stone-600">
        Password
      </label>
      <div className="mb-8 w-full">
        <div
          className="flex w-full rounded-md aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-red-500"
          aria-invalid={errors.password ? "true" : "false"}
        >
          <input
            className="flex-grow rounded-l-md bg-stone-200/50 px-5 py-3 leading-none text-stone-800 outline-none"
            id="password"
            type={revealPassword ? "text" : "password"}
            {...register("password")}
          />
          <label className="flex cursor-pointer items-center rounded-r-md bg-stone-200/50 px-3 text-stone-700">
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
      <div className="w-full space-y-2">
        <TestAccountButton
          fillFormHandler={() =>
            fillFormHandler({ email: "user@example.com", password: "coffee123" })
          }
        />
        <button
          disabled={isSubmitting}
          className="w-full select-none rounded-full bg-stone-800 py-3.5 text-lg font-medium leading-none text-stone-100 transition-colors hover:bg-stone-700 disabled:cursor-wait disabled:bg-stone-500"
          ref={submitBtnRef}
          type="submit"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}

type Props = {
  fillFormHandler: () => void;
};

function TestAccountButton({ fillFormHandler }: Props) {
  return (
    <Popover className="relative w-full">
      <Popover.Button className="w-full select-none rounded-full border-2 border-stone-800 py-3.5 text-lg font-medium leading-none text-stone-800 outline-none transition-colors hover:bg-stone-200 disabled:cursor-wait disabled:bg-stone-500">
        Sign In With a Test Account
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 top-0 mt-2 block -translate-x-1/2 space-y-4 rounded-lg border border-stone-200 bg-stone-50 p-6 text-start shadow-2xl">
          <h3 className="text-center font-sans text-xl font-semibold tracking-tighter text-stone-700">
            Test Account
          </h3>
          <button
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-stone-300/50 bg-stone-200/60 p-4 leading-none text-stone-700 outline outline-0 outline-stone-700 transition-all hover:bg-stone-200 hover:outline-2"
            type="button"
            onClick={() => fillFormHandler()}
          >
            <UserCircle
              absoluteStrokeWidth
              strokeWidth={1}
              width={44}
              height={44}
              className="text-stone-600"
            />
            <div className="flex flex-col items-start justify-center gap-2">
              <span className="font-medium">user@example.com</span>
              <span className="font-medium">*********</span>
            </div>
          </button>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
