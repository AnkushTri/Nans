"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { VIEWPORT } from "@/lib/motion";

const FLIP_STEPS = 6;
const FLIP_INTERVAL_MS = 120;
const DIGIT_STAGGER_MS = 450;

type TileProps = { target: number; index: number; reduced: boolean };

function Tile({ target, index, reduced }: TileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, VIEWPORT);
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      let step = 0;
      interval = setInterval(() => {
        step += 1;
        setValue((((target - (FLIP_STEPS - step)) % 10) + 10) % 10);
        if (step >= FLIP_STEPS) clearInterval(interval);
      }, FLIP_INTERVAL_MS);
    }, index * DIGIT_STAGGER_MS);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [inView, reduced, target, index]);

  return (
    <div
      ref={ref}
      className="relative flex h-24 w-16 items-center justify-center overflow-hidden rounded-2xl bg-ink font-mono text-5xl text-paper shadow-xl shadow-ink/20 after:absolute after:inset-x-0 after:top-1/2 after:h-px after:bg-paper/20 md:h-32 md:w-20 md:text-6xl"
    >
      <motion.span
        key={value}
        initial={reduced ? false : { rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{ transformPerspective: 400 }}
        className="block tabular-nums"
      >
        {value}
      </motion.span>
    </div>
  );
}

export function FlipClock({ digits }: { digits: string }) {
  const reduced = useReducedMotion();
  const cells = digits.split("").map(Number);
  return (
    <div role="img" aria-label={`Digital clock reading ${digits.slice(0, 2)}:${digits.slice(2)}`} className="flex items-center gap-2">
      {cells.map((digit, i) => (
        <div key={i} className="flex items-center gap-2">
          {i === 2 && <span className="font-mono text-4xl text-rose">:</span>}
          <Tile target={digit} index={i} reduced={reduced} />
        </div>
      ))}
    </div>
  );
}
