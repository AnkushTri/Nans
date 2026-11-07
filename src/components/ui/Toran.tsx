"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const STRANDS = 18;

/** A marigold toran: garland strands hanging along the top edge. */
export function Toran() {
  const reduced = useReducedMotion();
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-between px-2">
      {Array.from({ length: STRANDS }, (_, i) => (
        <motion.div
          key={i}
          className="flex flex-col items-center"
          style={{ originY: 0 }}
          animate={reduced ? undefined : { rotate: [-3, 3, -3] }}
          transition={{ duration: 4 + (i % 4) * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
        >
          <span className="w-px bg-peach/60" style={{ height: 14 + Math.sin((i / (STRANDS - 1)) * Math.PI) * 34 }} />
          <span className="h-5 w-5 rounded-full bg-gradient-to-br from-gold to-orange-600 shadow-[0_0_14px_rgba(245,166,35,0.7)]" />
        </motion.div>
      ))}
    </div>
  );
}
