"use client";

import { formSchema } from "@/utils/schemas";
import { Try } from "@/utils/try";
import { Dialog, Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Fragment, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = formSchema.pick({ password: true });
type Inputs = z.infer<typeof loginFormSchema>;

export default function DeleteAccountButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [revealPassword, setRevealPassword] = useState(false);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<Inputs>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { password } = data;

    const { error, result: response } = await Try(
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ password }),
      }),
    );

    if (!response) {
      console.error(error);
      return;
    }

    const { error: parseError, result } = await Try<{
      message: string;
      path: "password" | null;
    }>(response.json());

    if (parseError) {
      console.error(parseError);
      return;
    }

    if (!response.ok) {
      setError(result.path ?? "root", { message: result.message });
      return;
    }

    window.location.replace("/");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-4 rounded-full bg-red-500 px-7 py-3.5 text-lg font-medium leading-none text-stone-100 transition-colors hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-600"
      >
        Delete Account
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  as="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full max-w-md transform overflow-hidden rounded-lg bg-stone-100 p-6 text-left align-middle shadow-xl transition-all"
                >
                  <Dialog.Title
                    as="h2"
                    className="text-xl font-bold text-stone-800 md:text-2xl"
                  >
                    Delete Account
                  </Dialog.Title>
                  <Dialog.Description className="mt-2 leading-none text-stone-700">
                    This will permanently delete your account.
                  </Dialog.Description>
                  <div className="mt-6">
                    <p className="text-sm text-stone-500">
                      Are you sure you want to delete your account? All of your data will
                      be permanently removed. This action cannot be undone.
                    </p>
                  </div>

                  <label
                    htmlFor="password"
                    className="mb-2 mt-8 inline-block text-sm leading-none text-stone-600"
                  >
                    Password
                  </label>
                  <div className="w-full">
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

                  <div className="mt-8 flex justify-between">
                    <button
                      type="submit"
                      ref={submitBtnRef}
                      className="inline-flex justify-center rounded-full bg-red-500 px-4 py-2 font-medium text-stone-50 hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 disabled:bg-red-200"
                      disabled={isSubmitting}
                    >
                      Delete Account
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-full border border-stone-700 px-4 py-2 font-medium text-stone-700 hover:bg-stone-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
