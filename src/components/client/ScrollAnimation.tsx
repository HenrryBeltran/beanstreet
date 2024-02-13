"use client";

import {
  AnimationOptionsWithOverrides,
  MotionKeyframesDefinition,
  animate,
  inView,
} from "motion";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
  keyframes: MotionKeyframesDefinition;
  options: AnimationOptionsWithOverrides;
  yViewPort?: number;
  drawGuide?: boolean;
}

export default function ScrollAnimation({
  children,
  className,
  keyframes,
  options,
  yViewPort = 48,
  drawGuide = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inView(
      viewRef.current!,
      () => {
        if (ref.current) {
          animate(ref.current.firstElementChild!, keyframes, options);
        }
      },
      { amount: "all" },
    );
  });

  return (
    <div ref={ref} className={twMerge("relative", className)}>
      {children}
      <div
        ref={viewRef}
        style={{
          transform: `translateY(${yViewPort}px)`,
          visibility: drawGuide ? "visible" : "hidden",
        }}
        className="absolute h-px w-full bg-red-400"
      ></div>
    </div>
  );
}
