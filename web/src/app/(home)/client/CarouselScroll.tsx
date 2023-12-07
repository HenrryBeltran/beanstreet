"use client";

import useWindowSize from "@/hooks/useWindowSize";
import { lerp } from "@/utils/functions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimationControls, animate } from "motion";
import { ReactNode, UIEvent, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  itemLength: number;
};

export default function CarouselScroll({ children, itemLength }: Props) {
  const [windowWidth] = useWindowSize();
  const [currentScrollLeft, setCurrentScrollLeft] = useState(0);

  const scrollCarouseRef = useRef<HTMLDivElement>(null);
  const rightBtnRef = useRef<HTMLButtonElement>(null);
  const animation = useRef<AnimationControls>();

  const currentScrollLeftRef = useRef(currentScrollLeft);
  const currentItemIndex = useRef(0);
  const nextItemIndex = useRef(0);
  const scrollWidth = useRef<number>();

  const itemsPoints = new Array<number>(itemLength)
    .fill(0)
    .map((_, index) => index * 344);

  useEffect(() => {
    if (!scrollCarouseRef.current) return;
    scrollWidth.current = scrollCarouseRef.current.scrollWidth - windowWidth;
  }, [windowWidth]);

  function handleScroll(e: UIEvent<HTMLDivElement, globalThis.UIEvent>) {
    setCurrentScrollLeft(e.currentTarget.scrollLeft);
    currentScrollLeftRef.current = e.currentTarget.scrollLeft;

    if (animation.current === undefined || animation.current.playState !== "running") {
      for (let i = 0; i < itemsPoints.length; i++) {
        if (e.currentTarget.scrollLeft === itemsPoints[i]) {
          currentItemIndex.current = i;
          nextItemIndex.current = i;
          break;
        } else if (e.currentTarget.scrollLeft < itemsPoints[i]) {
          currentItemIndex.current = i;
          nextItemIndex.current = i;
          break;
        }
      }
    }

    const scrollSurface = Math.floor(e.currentTarget.scrollWidth - windowWidth);

    if (scrollSurface - Math.floor(e.currentTarget.scrollLeft) <= 1) {
      animation.current?.stop();
    }
  }

  function scrollToLeft() {
    if (!scrollCarouseRef.current) return;

    scrollCarouseRef.current.style.scrollSnapType = "none";

    animation.current = animate(
      (progress) => {
        if (!scrollCarouseRef.current) return;

        scrollCarouseRef.current.scrollLeft = lerp(
          itemsPoints[currentItemIndex.current],
          itemsPoints[nextItemIndex.current],
          progress,
        );
      },
      { duration: 0.45, easing: [0.22, 0.61, 0.36, 1] },
    );

    animation.current.finished.then(() => {
      if (!scrollCarouseRef.current) return;

      currentItemIndex.current = nextItemIndex.current;
      scrollCarouseRef.current.style.scrollSnapType = "x mandatory";
    });
  }

  function handleScrollLeft(direction: 1 | -1) {
    if (animation.current === undefined || animation.current.playState !== "running") {
      nextItemIndex.current += direction;
      scrollToLeft();
    }
  }

  return (
    <div className="relative">
      <div className="relative h-[428px] overflow-hidden">
        <div
          ref={scrollCarouseRef}
          onScroll={handleScroll}
          className="snap-x snap-mandatory scroll-p-6 overflow-x-scroll pb-16 lg:scroll-p-[var(--global-viewport-padding)]"
        >
          <div className="w-fit px-6 lg:px-[var(--global-viewport-padding)]">
            <ul className="grid w-max grid-flow-col grid-rows-1 gap-6">{children}</ul>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-8 right-[var(--global-viewport-padding)] flex translate-y-full gap-6">
        <button
          disabled={Math.floor(currentScrollLeft) === 0}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-600 transition-colors tap-highlight-transparent active:bg-stone-500/90 disabled:bg-stone-300"
          onClick={() => handleScrollLeft(-1)}
        >
          <ChevronLeft
            size={28}
            strokeWidth={2}
            absoluteStrokeWidth
            className="-translate-x-px text-stone-50"
          />
        </button>
        <button
          ref={rightBtnRef}
          disabled={(scrollWidth.current as number) - Math.floor(currentScrollLeft) <= 1}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-600 transition-colors tap-highlight-transparent active:bg-stone-500/90 disabled:bg-stone-300"
          onClick={() => handleScrollLeft(1)}
        >
          <ChevronRight
            size={28}
            strokeWidth={2}
            absoluteStrokeWidth
            className="translate-x-px text-stone-50"
          />
        </button>
      </div>
    </div>
  );
}
