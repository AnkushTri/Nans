"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MINUTE_RING_PROGRESS } from "@/lib/constants";
import { MINUTE_LINES } from "@/lib/content";
import { DURATION, EASE_OUT_EXPO, VIEWPORT } from "@/lib/motion";

export function TheMinute() {
  const reduced = useReducedMotion();
  return (
    <section aria-labelledby="minute-title" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0C0806] px-6 py-32 text-paper">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,162,76,0.22)_0%,transparent_55%)]" />
      <h2 id="minute-title" className="sr-only">The 08:12 minute</h2>
      <div className="relative h-64 w-64 md:h-80 md:w-80">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(251,247,242,0.12)" strokeWidth="1.5" />
          <motion.circle
            cx="100" cy="100" r="92" fill="none" stroke="#D4A24C" strokeWidth="2" strokeLinecap="round"
            initial={{ pathLength: reduced ? MINUTE_RING_PROGRESS : 0 }}
            whileInView={{ pathLength: MINUTE_RING_PROGRESS }}
            viewport={VIEWPORT}
            transition={{ duration: 4, ease: EASE_OUT_EXPO }}
          />
        </svg>
        <p className="absolute inset-0 flex items-center justify-center font-mono text-5xl tabular-nums md:text-6xl">08:12</p>
        <motion.span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -ml-1 mt-[7.5rem] h-2 w-2 rounded-full bg-gold shadow-[0_0_24px_8px_rgba(212,162,76,0.6)] md:mt-[9.5rem]"
          animate={reduced ? undefined : { scale: [1, 1.7, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: DURATION.breathe, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="relative mt-24 space-y-10 text-center">
        {MINUTE_LINES.map((line, i) => (
          <Reveal key={i} distance={16}>
            <p className="font-display text-2xl italic text-paper/90 md:text-4xl">{line}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
