"use client";

import { Try } from "@/utils/try";
import { Eye, EyeOff } from "lucide-react";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const updateUserSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required." })
      .max(64, { message: "Your name must be less than 64 characters." }),
    email: z
      .string()
      .max(320, { message: "Your email must be less than 320 characters." })
      .refine((value) => value.length > 0, { message: "Email is required." })
      .optional(),
    password: z
      .string()
      .min(8, { message: "Your password must be at least 8 characters." })
      .max(32, { message: "Your password must be less than 32 characters." })
      .optional(),
    confirmPassword: z
      .string()
      .min(8, { message: "Your password must be at least 8 characters." })
      .max(32, { message: "Your password must be less than 32 characters." })
      .optional(),
  })
  .refine(
    (data) => {
      if (data) {
        return data.confirmPassword === data.password;
      }
    },
    { message: "The passwords doesn't match.", path: ["confirmPassword"] },
  );

type Inputs = z.infer<typeof updateUserSchema>;

type Props = {
  username: string;
  userEmail: string;
};

export default function EditAccountForm({ username, userEmail }: Props) {
  const [revealPassword, setRevealPassword] = useState(false);
  const [revealConfirmPassword, setRevealConfirmPassword] = useState(false);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
  } = useForm<Inputs>({
    defaultValues: {
      name: username,
      email: userEmail,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, email } = data;
    const password = data.password === "" ? undefined : data.password;

    const { error, result: response } = await Try(
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
        credentials: "include",
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

    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8 text-stone-700">
      <div className="flex flex-col">
        <label htmlFor="name" className="font-medium leading-none">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="mt-1 max-h-12 max-w-xl rounded-md bg-stone-200/70 px-5 py-4 leading-none text-stone-800 outline-none focus:ring-1 focus:ring-stone-700/30"
          {...register("name", {
            required: { value: true, message: "User name is required." },
          })}
        />
        {errors.name && (
          <p className="mt-2 text-start text-sm leading-none text-red-500">
            {errors.name?.message}
          </p>
        )}
        <p className="mt-2 text-sm font-light leading-none text-stone-600">
          This is your display name. It can be your real name or a pseudonym.
        </p>
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="font-medium leading-none">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="mt-1 max-h-12 max-w-xl rounded-md bg-stone-200/70 px-5 py-4 leading-none text-stone-800 outline-none focus:ring-1 focus:ring-stone-700/30 aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-red-500"
          {...register("email", {
            required: { value: true, message: "Email is required." },
            validate: {
              maxLength: (fieldValue) => {
                if (fieldValue) {
                  return (
                    fieldValue?.length < 320 ||
                    "Your email must be less than 320 characters."
                  );
                }
              },
            },
          })}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <p className="mt-2 text-start text-sm leading-none text-red-500">
            {errors.email?.message}
          </p>
        )}
        <p className="mt-2 text-sm font-light leading-none text-stone-600">
          Update your email at any time.
        </p>
      </div>

      <div className="flex max-w-xl flex-col">
        <label htmlFor="password" className="font-medium leading-none">
          New Password
        </label>
        <div
          className="mt-1 flex max-h-12 w-full rounded-md has-[:focus]:ring-1 has-[:focus]:ring-stone-700/30 aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-red-500"
          aria-invalid={errors.password ? "true" : "false"}
        >
          <input
            id="password"
            className="flex-grow rounded-l-md bg-stone-200/70 px-5 py-4 leading-none text-stone-800 outline-none"
            type={revealPassword ? "text" : "password"}
            {...register("password", {
              required: false,
              validate: {
                min: (fieldValue) => {
                  if (fieldValue) {
                    return (
                      fieldValue.length >= 8 ||
                      "Your password must be at least 8 characters."
                    );
                  }
                },
                max: (fieldValue) => {
                  if (fieldValue) {
                    return (
                      fieldValue.length <= 32 ||
                      "Your password must be less than 32 characters."
                    );
                  }
                },
              },
            })}
          />
          <label className="flex cursor-pointer items-center rounded-r-md bg-stone-200/70 px-3 text-stone-700">
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
        {errors.password && (
          <p className="mt-2 text-start text-sm leading-none text-red-500">
            {errors.password?.message}
          </p>
        )}
        <p className="mt-2 text-sm font-light leading-none text-stone-600">
          Change your password at any time.
        </p>
      </div>

      <div className="flex max-w-xl flex-col">
        <label htmlFor="password" className="font-medium leading-none">
          Confirm New Password
        </label>
        <div
          className="mt-1 flex max-h-12 w-full rounded-md has-[:focus]:ring-1 has-[:focus]:ring-stone-700/30 aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-red-500"
          aria-invalid={errors.password ? "true" : "false"}
        >
          <input
            className="flex-grow rounded-l-md bg-stone-200/70 px-5 py-4 leading-none text-stone-800 outline-none"
            id="confirm-password"
            type={revealConfirmPassword ? "text" : "password"}
            {...register("confirmPassword", {
              required: false,
              validate: {
                min: (fieldValue) => {
                  if (fieldValue) {
                    return (
                      fieldValue.length >= 8 ||
                      "Your password must be at least 8 characters."
                    );
                  }
                },
                max: (fieldValue) => {
                  if (fieldValue) {
                    return (
                      fieldValue.length <= 32 ||
                      "Your password must be less than 32 characters."
                    );
                  }
                },
                confirm: (fieldValue) => {
                  return (
                    fieldValue === watch("password") || "The passwords doesn't match."
                  );
                },
              },
            })}
          />
          <label className="flex cursor-pointer items-center rounded-r-md bg-stone-200/70 px-3 text-stone-700">
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
        {errors.confirmPassword && (
          <p className="mt-2 text-start text-sm leading-none text-red-500">
            {errors.confirmPassword?.message}
          </p>
        )}
        <p className="mt-2 text-start text-sm text-stone-500">
          * Password must be 8 - 20 characters length.
        </p>
        <p className="text-start text-sm leading-none text-stone-500">
          * Password have to contain a number.
        </p>
      </div>

      <button
        type="submit"
        className="!mt-12 rounded-full bg-stone-800 px-7 py-3.5 text-lg font-medium leading-none text-stone-100 transition-colors hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-600"
        disabled={
          isSubmitting ||
          (watch("name") === username &&
            watch("email") === userEmail &&
            watch("password") === "")
        }
        ref={submitBtnRef}
      >
        Update Profile
      </button>
    </form>
  );
}
