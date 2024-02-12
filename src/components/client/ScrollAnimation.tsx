"use client";

import {
  AnimationOptionsWithOverrides,
  MotionKeyframesDefinition,
  animate,
  inView,
} from "motion";
import { useEffect, useRef } from "react";

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
        animate(ref.current!, keyframes, options);
      },
      { amount: "all" },
    );
  });

  return (
    <div className="relative">
      <div ref={ref} className={className}>
        {children}
      </div>
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
