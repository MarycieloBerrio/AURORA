"use client";

import Link from "next/link";
import { getTestPath } from "@/constants/floors";
import type { FloorTest } from "@/constants/floors";

interface FloorTestBubbleProps {
  test: FloorTest;
  floorId: string;
  completed: boolean;
}

const colorStyles = {
  indigo: {
    bg: "bg-indigo-600",
    bgCompleted: "bg-indigo-400",
    ring: "ring-indigo-400/40",
    shadow: "shadow-indigo-600/50",
    hover: "group-hover:bg-indigo-500",
    label: "bg-indigo-900/80 text-indigo-100",
  },
  amber: {
    bg: "bg-amber-500",
    bgCompleted: "bg-amber-400",
    ring: "ring-amber-400/40",
    shadow: "shadow-amber-500/50",
    hover: "group-hover:bg-amber-400",
    label: "bg-amber-900/80 text-amber-100",
  },
  emerald: {
    bg: "bg-emerald-600",
    bgCompleted: "bg-emerald-400",
    ring: "ring-emerald-400/40",
    shadow: "shadow-emerald-600/50",
    hover: "group-hover:bg-emerald-500",
    label: "bg-emerald-900/80 text-emerald-100",
  },
} as const;

export function FloorTestBubble({ test, floorId, completed }: FloorTestBubbleProps) {
  const styles = colorStyles[test.color];

  if (completed) {
    return (
      <div
        className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
        style={{ left: `${test.position.x}%`, top: `${test.position.y}%` }}
      >
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/60 ${styles.bgCompleted} text-lg font-bold text-white shadow-lg ${styles.shadow} ring-4 ${styles.ring} md:h-12 md:w-12 md:text-xl`}
        >
          ✓
        </div>
        <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${styles.label} shadow-md md:text-[10px]`}>
          {test.labelEs}
        </span>
      </div>
    );
  }

  return (
    <Link
      href={getTestPath(floorId, test.id)}
      className="group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
      style={{ left: `${test.position.x}%`, top: `${test.position.y}%` }}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/60 ${styles.bg} text-lg font-bold text-white shadow-lg ${styles.shadow} ring-4 ${styles.ring} transition-all ${styles.hover} group-hover:scale-110 md:h-12 md:w-12 md:text-xl`}
      >
        ?
      </div>
      <span
        className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${styles.label} shadow-md transition-all group-hover:scale-105 md:text-[10px]`}
      >
        {test.labelEs}
      </span>
    </Link>
  );
}
