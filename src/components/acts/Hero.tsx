"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ScrollCue } from "@/components/ui/ScrollCue";
import { Toran } from "@/components/ui/Toran";
import { secondsSince, useNow } from "@/hooks/useLiveCounter";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { AN_NUMBER, HERO_TITLE_STAGGER_S, NANS_NUMBER, START_DATE, TYPEWRITER_MS } from "@/lib/constants";
import { LIVE_LINE_INDEX, TYPEWRITER_LINES } from "@/lib/content";
import { EASE_OUT_EXPO } from "@/lib/motion";

const EmberScene = dynamic(() => import("@/components/ui/EmberScene").then((m) => m.EmberScene), { ssr: false });

const TITLE = "For Nans";
const PARALLAX = 0.18;

function RouteLog() {
  const reduced = useReducedMotion();
  const now = useNow();
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const line = TYPEWRITER_LINES[index];

  useEffect(() => {
    if (reduced) return;
    let timer: ReturnType<typeof setTimeout>;
    if (dir === 1 && count === line.length) {
      timer = setTimeout(() => setDir(-1), TYPEWRITER_MS.hold);
    } else if (dir === -1 && count === 0) {
      timer = setTimeout(() => {
        setDir(1);
        setIndex((i) => (i + 1) % TYPEWRITER_LINES.length);
      }, TYPEWRITER_MS.gap);
    } else {
      timer = setTimeout(() => setCount((c) => c + dir), dir === 1 ? TYPEWRITER_MS.type : TYPEWRITER_MS.erase);
    }
    return () => clearTimeout(timer);
  }, [count, dir, line.length, reduced]);

  const shown = reduced ? TYPEWRITER_LINES[2] : line.slice(0, count);
  const ticker =
    !reduced && index === LIVE_LINE_INDEX && count === line.length && now
      ? secondsSince(START_DATE, now).toLocaleString("en-US")
      : "";

  return (
    <div className="font-mono text-xs text-paper/70 md:text-sm">
      <p className="tracking-widest text-peach">
        anku.{AN_NUMBER} → nans.{NANS_NUMBER}
      </p>
      <p className="mt-2 h-5">
        {shown}
        <span className="tabular-nums">{ticker}</span>
        {!reduced && <span className="ml-0.5 inline-block h-3.5 w-px translate-y-0.5 animate-pulse bg-paper" />}
      </p>
    </div>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 40, damping: 20 });
  const y = useSpring(my, { stiffness: 40, damping: 20 });

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * PARALLAX);
    my.set((e.clientY - rect.top - rect.height / 2) * PARALLAX);
  };

  return (
    <section
      onPointerMove={onMove}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top,#5A1220_0%,#2A0E10_55%,#14070A_100%)] px-6 text-center text-paper"
    >
      <EmberScene />
      <Toran />
      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        className="absolute left-1/2 top-1/2 -ml-[20rem] -mt-[20rem] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(245,166,35,0.35)_0%,rgba(179,32,42,0.25)_45%,transparent_70%)] blur-2xl"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.1 }}
        className="relative mb-6 font-mono text-xs tracking-[0.35em] text-peach md:text-sm"
      >
        शुभ दीपावली · HAPPY DIWALI
      </motion.p>
      <h1 aria-label={TITLE} className="relative font-display text-7xl italic [text-shadow:0_0_40px_rgba(245,166,35,0.45)] md:text-[10rem] md:leading-none">
        {TITLE.split("").map((char, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            className="inline-block"
            initial={{ opacity: 0, y: reduced ? 0 : 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.4 + i * HERO_TITLE_STAGGER_S }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.3 }}
        className="relative mt-6 text-lg italic text-paper/80 md:text-2xl"
      >
        with every light I can carry — Anku
      </motion.p>
      <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-6">
        <RouteLog />
        <ScrollCue href="#numbers" />
      </div>
    </section>
  );
}
