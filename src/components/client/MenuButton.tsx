"use client";

import { TimelineDefinition, stagger, timeline } from "motion";
import { useRef, useState } from "react";
import DropdownMenu from "./NavDropdownMenu";
import { SessionResult } from "@/lib/getSession";

const openSequence: TimelineDefinition = [
  ["#drop-down", { visibility: "visible" }, { duration: 0 }],
  [
    "#drop-down",
    { height: [0, "100svh"], opacity: [0.2, 1] },
    { duration: 0.3, easing: "ease-out" },
  ],
  [
    ".drop-down-li",
    { opacity: [0, 1] },
    { duration: 0.3, delay: stagger(0.05), at: "-0.2" },
  ],
];

const closeSequence: TimelineDefinition = [
  [".drop-down-li", { opacity: [1, 0] }, { duration: 0.15 }],
  [
    "#drop-down",
    { height: ["100svh", 0], opacity: [1, 0.2] },
    { duration: 0.2, easing: "ease-out", at: "-0.8" },
  ],
  ["#drop-down", { visibility: "hidden" }, { duration: 0.001 }],
];

type Props = {
  theme: "dark" | "light";
  session: SessionResult | null;
};

export default function MenuButton({ theme, session }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const breadTopOpen = useRef<SVGAnimateElement>(null);
  const breadTopClose = useRef<SVGAnimateElement>(null);
  const breadBottomOpen = useRef<SVGAnimateElement>(null);
  const breadBottomClose = useRef<SVGAnimateElement>(null);

  function handleOnClick() {
    const body = document.querySelector("body");

    setIsOpen(!isOpen);

    if (!body) return;

    if (!isOpen) {
      breadTopOpen.current?.beginElement();
      breadBottomOpen.current?.beginElement();
      body.style.height = "100svh";
      body.style.overflow = "hidden";

      timeline(openSequence);
    } else {
      breadTopClose.current?.beginElement();
      breadBottomClose.current?.beginElement();
      body.style.height = "auto";
      body.style.overflow = "visible";

      timeline(closeSequence);
    }
  }

  return (
    <div className="relative h-6 w-6 md:hidden">
      <DropdownMenu theme={theme} isOpen={isOpen} session={session} />
      <button
        className="relative z-50 tap-highlight-transparent"
        onClick={handleOnClick}
        id="hamburger-menu"
        aria-label={isOpen ? "Menu" : "Close"}
        data-topnav-menu-label-open="Menu"
        data-topnav-menu-label-close="Close"
        data-topnav-flyout-trigger-compact="menu"
      >
        <svg width="24" height="24" viewBox="0 0 18 18">
          <polyline
            id="bread-bottom"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            points="2 12, 16 12"
            className=""
          >
            <animate
              ref={breadBottomOpen}
              id="bread-bottom-open"
              attributeName="points"
              keyTimes="0;0.5;1"
              dur="0.2s"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
              values=" 2 12, 16 12; 2 9, 16 9; 3.5 15, 15 3.5"
            ></animate>
            <animate
              ref={breadBottomClose}
              id="bread-bottom-close"
              attributeName="points"
              keyTimes="0;0.5;1"
              dur="0.2s"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
              values=" 3.5 15, 15 3.5; 2 9, 16 9; 2 12, 16 12"
            ></animate>
          </polyline>
          <polyline
            id="bread-top"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            points="2 5, 16 5"
            className=""
          >
            <animate
              ref={breadTopOpen}
              id="bread-top-open"
              attributeName="points"
              keyTimes="0;0.5;1"
              dur="0.2s"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
              values=" 2 5, 16 5; 2 9, 16 9; 3.5 3.5, 15 15"
            ></animate>
            <animate
              ref={breadTopClose}
              id="bread-top-close"
              attributeName="points"
              keyTimes="0;0.5;1"
              dur="0.2s"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
              values=" 3.5 3.5, 15 15; 2 9, 16 9; 2 5, 16 5"
            ></animate>
          </polyline>
        </svg>
      </button>
    </div>
  );
}
