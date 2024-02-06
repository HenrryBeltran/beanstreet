"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[100svh] w-full max-w-screen-3xl items-center justify-center bg-stone-50">
      <div className="space-y-8 text-center">
        <h2 className="text-4xl font-bold text-stone-700">Something went wrong!</h2>
        <button
          className="rounded-full bg-red-500 px-5 py-3 text-lg font-medium leading-none text-stone-50"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
