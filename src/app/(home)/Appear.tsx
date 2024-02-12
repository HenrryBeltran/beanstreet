"use client";

import { Easing, EasingFunction, EasingGenerator, animate } from "motion";
import { ReactNode, useEffect } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  id: string;
  duration: number;
  delay: number;
  easing?: EasingGenerator | Easing | Easing[] | EasingFunction;
  children: ReactNode;
  className?: string;
};
export default function Appear({
  id,
  duration,
  delay,
  easing,
  children,
  className,
}: Props) {
  useEffect(() => {
    animate(`#${id}`, { opacity: [0, 1] }, { duration, delay, easing });
  });

  return (
    <div id={id} className={twMerge("opacity-0", className)}>
      {children}
    </div>
  );
}
