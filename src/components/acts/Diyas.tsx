"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { useId, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SEEDS } from "@/lib/constants";
import { DIYAS } from "@/lib/content";
import { createSeededRandom } from "@/lib/seededRandom";

const EmberScene = dynamic(() => import("@/components/ui/EmberScene").then((m) => m.EmberScene), { ssr: false });

const SPARKS = (() => {
  const rand = createSeededRandom(SEEDS.an);
  return Array.from({ length: 24 }, () => ({ left: rand() * 100, delay: rand() * 3, dur: 3 + rand() * 3, size: 3 + rand() * 4 }));
})();

function DiyaArt({ lit, reduced }: { lit: boolean; reduced: boolean }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const flicker = { scaleY: [1, 1.12, 0.94, 1.08, 1], scaleX: [1, 0.94, 1.04, 0.97, 1], opacity: 1 };
  return (
    <svg viewBox="0 0 120 110" className="h-28 w-28 md:h-32 md:w-32" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}g`}>
          <stop offset="0" stopColor="#FFD27A" stopOpacity="0.9" />
          <stop offset="1" stopColor="#F5A623" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}f`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#FF7A18" />
          <stop offset="1" stopColor="#FFE9A8" />
        </linearGradient>
      </defs>
      <motion.circle cx="60" cy="48" r="46" fill={`url(#${id}g)`} initial={false} animate={{ opacity: lit ? 1 : 0 }} transition={{ duration: 1 }} />
      <path d="M8 62 Q60 112 112 62 Z" fill="#9C3F14" />
      <ellipse cx="60" cy="62" rx="52" ry="8" fill="#C2571C" />
      <rect x="58" y="50" width="4" height="12" rx="2" fill="#2A0E10" />
      <motion.path
        d="M60 52 C47 38 56 24 60 12 C64 24 73 38 60 52Z"
        fill={`url(#${id}f)`}
        style={{ originX: 0.5, originY: 1 }}
        initial={false}
        animate={lit ? (reduced ? { scaleX: 1, scaleY: 1, opacity: 1 } : flicker) : { scaleX: 0, scaleY: 0, opacity: 0 }}
        transition={lit && !reduced ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.5 }}
      />
    </svg>
  );
}

export function Diyas() {
  const reduced = useReducedMotion();
  const [lit, setLit] = useState<boolean[]>(() => DIYAS.map(() => false));
  const all = lit.every(Boolean);
  const toggle = (i: number) => setLit((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <section aria-labelledby="diyas-title" className="relative overflow-hidden bg-[radial-gradient(ellipse_at_bottom,#5A1220_0%,#2A0E10_50%,#14070A_100%)] px-6 py-32 text-paper">
      <EmberScene count={260} />
      <div className="relative">
        <div id="diyas-title"><SectionHeading eyebrow="दीपावली" title="Five diyas, five promises" tone="dark" /></div>
        <p className="mt-4 text-center font-script text-2xl text-paper/70">Tap each one.</p>
        <ul className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-5">
          {DIYAS.map((d, i) => (
            <li key={d.title} className="flex flex-col items-center text-center">
              <button type="button" aria-pressed={lit[i]} onClick={() => toggle(i)} className="flex flex-col items-center gap-2">
                <DiyaArt lit={lit[i]} reduced={reduced} />
                <span className="font-display text-2xl italic text-gold">{d.title}</span>
              </button>
              <motion.p
                initial={false}
                animate={{ opacity: lit[i] ? 1 : 0, y: lit[i] || reduced ? 0 : 12 }}
                transition={{ duration: 0.9 }}
                className="mt-3 min-h-[5rem] text-sm leading-6 text-paper/85"
              >
                {d.line}
              </motion.p>
            </li>
          ))}
        </ul>
        {all && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }} className="mx-auto mt-20 max-w-2xl text-center">
            <p className="font-display text-4xl italic [text-shadow:0_0_30px_rgba(245,166,35,0.6)] md:text-6xl">Happy Diwali, Nans.</p>
            <p className="mt-4 font-script text-2xl text-peach">May every light you gave others find its way back to you.</p>
          </motion.div>
        )}
      </div>
      {all && !reduced && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {SPARKS.map((s, i) => (
            <motion.span
              key={i}
              className="absolute bottom-0 rounded-full bg-gold shadow-[0_0_10px_3px_rgba(232,176,75,0.7)]"
              style={{ left: `${s.left}%`, width: s.size, height: s.size }}
              animate={{ y: -700, opacity: [0, 1, 0] }}
              transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
