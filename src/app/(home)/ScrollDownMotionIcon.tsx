"use client";

import { ChevronDown } from "lucide-react";
import { TimelineDefinition, animate, timeline } from "motion";
import { useEffect } from "react";

export default function ScrollDownMotionIcon() {
  useEffect(() => {
    animate("#chevron-down", { opacity: [0, 1] }, { duration: 1.2, delay: 1 });

    const sequence1: TimelineDefinition = [
      [
        "#chevron-down-1",
        {
          opacity: [0, 1],
          transform: ["translateY(-80%)", "translateY(-15%)"],
        },
        { duration: 1.5, delay: 0.8, easing: [0.22, 0.61, 0.36, 1] },
      ],
      [
        "#chevron-down-1",
        {
          opacity: 1,
          transform: ["translateY(-15%)", "translateY(15%)"],
        },
        { duration: 1.5, delay: 0.8, easing: [0.22, 0.61, 0.36, 1] },
      ],
      [
        "#chevron-down-1",
        {
          opacity: [1, 0],
          transform: ["translateY(15%)", "translateY(80%)"],
        },
        { duration: 1.5, delay: 0.8, easing: [0.22, 0.61, 0.36, 1] },
      ],
      [
        "#chevron-down-1",
        {
          opacity: 0,
          transform: ["translateY(80%)", "translateY(-80%)"],
        },
        { duration: 0.1 },
      ],
    ];

    const sequence2: TimelineDefinition = [
      [
        "#chevron-down-2",
        {
          opacity: 1,
          transform: ["translateY(-15%)", "translateY(15%)"],
        },
        { duration: 1.5, delay: 0.8, easing: [0.22, 0.61, 0.36, 1] },
      ],
      [
        "#chevron-down-2",
        {
          opacity: [1, 0],
          transform: ["translateY(15%)", "translateY(80%)"],
        },
        { duration: 1.5, delay: 0.8, easing: [0.22, 0.61, 0.36, 1] },
      ],
      [
        "#chevron-down-2",
        {
          opacity: 0,
          transform: ["translateY(80%)", "translateY(-80%)"],
        },
        { duration: 0.1 },
      ],
      [
        "#chevron-down-2",
        {
          opacity: [0, 1],
          transform: ["translateY(-80%)", "translateY(-15%)"],
        },
        { duration: 1.5, delay: 0.8, easing: [0.22, 0.61, 0.36, 1] },
      ],
    ];

    const sequence3: TimelineDefinition = [
      [
        "#chevron-down-3",
        {
          opacity: [1, 0],
          transform: ["translateY(15%)", "translateY(80%)"],
        },
        { duration: 1.5, delay: 0.8, easing: [0.22, 0.61, 0.36, 1] },
      ],
      [
        "#chevron-down-3",
        {
          opacity: 0,
          transform: ["translateY(80%)", "translateY(-80%)"],
        },
        { duration: 0.1 },
      ],
      [
        "#chevron-down-3",
        {
          opacity: [0, 1],
          transform: ["translateY(-80%)", "translateY(-15%)"],
        },
        { duration: 1.5, delay: 0.8, easing: [0.22, 0.61, 0.36, 1] },
      ],
      [
        "#chevron-down-3",
        {
          opacity: 1,
          transform: ["translateY(-15%)", "translateY(15%)"],
        },
        { duration: 1.5, delay: 0.8, easing: [0.22, 0.61, 0.36, 1] },
      ],
    ];

    timeline(sequence1, { repeat: Infinity, delay: 1.6 });
    timeline(sequence2, { repeat: Infinity, delay: 1.6 });
    timeline(sequence3, { repeat: Infinity, delay: 1.6 });
  });

  return (
    <div
      id="chevron-down"
      className="relative mx-auto mb-8 mt-10 h-16 w-16 text-stone-200 opacity-0"
    >
      <ChevronDown
        id="chevron-down-1"
        size={64}
        strokeWidth={2}
        absoluteStrokeWidth={true}
        className="absolute -translate-y-[80%]"
      />
      <ChevronDown
        id="chevron-down-2"
        size={64}
        strokeWidth={2}
        absoluteStrokeWidth={true}
        className="absolute -translate-y-[15%]"
      />
      <ChevronDown
        id="chevron-down-3"
        size={64}
        strokeWidth={2}
        absoluteStrokeWidth={true}
        className="absolute translate-y-[15%]"
      />
    </div>
  );
}
