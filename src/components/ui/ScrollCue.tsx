"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ScrollCue({ href }: { href: string }) {
  const reduced = useReducedMotion();
  return (
    <a href={href} aria-label="Scroll down" className="inline-block text-paper/70">
      <motion.svg
        width="28"
        height="44"
        viewBox="0 0 28 44"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M14 3c-1 9 1 21 0 36" />
        <path d="M5 30c4 4 7 7 9 10 2-3 5-6 9-10" />
      </motion.svg>
    </a>
  );
}
