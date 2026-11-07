"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Rangoli({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      animate={reduced ? undefined : { rotate: 360 }}
      transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
    >
      <circle cx="100" cy="100" r="96" />
      <circle cx="100" cy="100" r="20" />
      {Array.from({ length: 12 }, (_, i) => (
        <g key={i} transform={`rotate(${i * 30} 100 100)`}>
          <ellipse cx="100" cy="46" rx="10" ry="34" />
          <circle cx="100" cy="10" r="3" />
        </g>
      ))}
    </motion.svg>
  );
}
