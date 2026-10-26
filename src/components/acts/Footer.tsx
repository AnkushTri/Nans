"use client";

import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { useNow } from "@/hooks/useLiveCounter";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { AN_TIME, HEARTBEAT_MS, NANS_TIME } from "@/lib/constants";

const pad = (n: number) => String(n).padStart(2, "0");
const MARKS = [
  { label: "08:12", time: NANS_TIME },
  { label: "13:07", time: AN_TIME },
] as const;

export function Footer() {
  const reduced = useReducedMotion();
  const now = useNow();
  const hours = now?.getHours();
  const minutes = now?.getMinutes();
  const clock = now ? `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}` : "--:--:--";

  return (
    <footer className="px-6 pb-16 pt-24 text-center">
      <p className="font-display text-3xl italic md:text-5xl">— An, always.</p>
      <div className="mt-10 font-mono text-sm tabular-nums text-ink/70">
        <p>{clock}</p>
        <p className="mt-2 flex justify-center gap-4 text-xs">
          {MARKS.map(({ label, time }) => {
            const active = hours === time.hours && minutes === time.minutes;
            return (
              <span key={label} className={active ? "underline decoration-gold decoration-2 underline-offset-4" : "text-ink/40"}>
                {label}
              </span>
            );
          })}
        </p>
      </div>
      <motion.div
        aria-hidden="true"
        className="mt-10 flex justify-center text-rose"
        animate={reduced ? undefined : { scale: [1, 1.18, 1] }}
        transition={{ duration: HEARTBEAT_MS.an / 1000, repeat: Infinity, ease: "easeInOut" }}
      >
        <Heart size={22} fill="currentColor" />
      </motion.div>
      <nav aria-label="Footer" className="mt-8 flex justify-center gap-8 text-sm">
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })} className="underline-offset-4 hover:underline">
          top
        </button>
        <a href="mailto:hello@example.com" className="underline-offset-4 hover:underline">write back</a>
      </nav>
    </footer>
  );
}
