"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CLOCK_ANGLES } from "@/lib/constants";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/motion";

const HAND_STYLE = { originX: 0.5, originY: 1 } as const;

export function AnalogClock({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const hand = (angle: number, delay: number) => ({
    initial: { rotate: reduced ? angle : 0 },
    whileInView: { rotate: angle },
    viewport: VIEWPORT,
    transition: { duration: reduced ? 0 : 2.4, delay: reduced ? 0 : delay, ease: EASE_OUT_EXPO },
  });

  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="A clock frozen at 8:12" className={`text-ink ${className}`}>
      <circle cx="100" cy="100" r="94" fill="#FBF7F2" stroke="currentColor" strokeWidth="2" />
      {Array.from({ length: 12 }, (_, i) => (
        <line
          key={i}
          x1="100"
          y1="12"
          x2="100"
          y2={i % 3 === 0 ? 26 : 19}
          stroke="currentColor"
          strokeWidth={i % 3 === 0 ? 3 : 1.5}
          strokeLinecap="round"
          transform={`rotate(${i * 30} 100 100)`}
        />
      ))}
      <motion.line x1="100" y1="100" x2="100" y2="56" stroke="currentColor" strokeWidth="5" strokeLinecap="round" style={HAND_STYLE} {...hand(CLOCK_ANGLES.hour, 0.2)} />
      <motion.line x1="100" y1="100" x2="100" y2="30" stroke="#C9485B" strokeWidth="3" strokeLinecap="round" style={HAND_STYLE} {...hand(CLOCK_ANGLES.minute, 0)} />
      <circle cx="100" cy="100" r="5" fill="#D4A24C" />
    </svg>
  );
}
