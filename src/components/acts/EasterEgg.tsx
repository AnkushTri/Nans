"use client";

import { AnimatePresence, motion } from "motion/react";
import { Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useKeySequence } from "@/hooks/useKeySequence";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { AN_NUMBER, BURST_MS, CONFETTI_COUNT, HEART_MS, NANS_NUMBER } from "@/lib/constants";

type Particle = { id: number; dx: number; rise: number; fall: number; rot: number; glyph: string; size: number; dur: number };
type Burst = { id: number; particles: Particle[] };
type Bloom = { id: number; x: number; y: number };

const GLYPHS = ["♡", "✦", "🪔", "✧"] as const;

function makeParticles(): Particle[] {
  return Array.from({ length: CONFETTI_COUNT }, (_, id) => ({
    id,
    dx: (Math.random() - 0.5) * window.innerWidth * 0.9,
    rise: -(120 + Math.random() * 280),
    fall: 500 + Math.random() * 300,
    rot: (Math.random() - 0.5) * 540,
    glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
    size: 14 + Math.random() * 16,
    dur: 2 + Math.random() * 1.2,
  }));
}

export function EasterEgg() {
  const reduced = useReducedMotion();
  const pointer = useRef({ x: 0, y: 0 });
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [burst, setBurst] = useState<Burst | null>(null);
  const [bloom, setBloom] = useState<Bloom | null>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
    };
    const pending = timers.current;
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      pending.forEach(clearTimeout);
    };
  }, []);

  useKeySequence(AN_NUMBER, () => {
    setBurst({ id: Date.now(), particles: reduced ? [] : makeParticles() });
    timers.current.push(setTimeout(() => setBurst(null), BURST_MS));
  });

  useKeySequence(NANS_NUMBER, () => {
    setBloom({ id: Date.now(), ...pointer.current });
    timers.current.push(setTimeout(() => setBloom(null), HEART_MS));
  });

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <AnimatePresence>
        {burst && (
          <motion.div key={burst.id} exit={{ opacity: 0 }} className="absolute inset-0">
            {!reduced && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gold to-peach"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.2, 0] }}
                transition={{ duration: 0.4 }}
              />
            )}
            {burst.particles.map((p) => (
              <motion.span
                key={p.id}
                className="absolute left-1/2 top-1/2 text-rose"
                style={{ fontSize: p.size }}
                initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                animate={{ x: p.dx, y: [0, p.rise, p.fall], opacity: [1, 1, 0], rotate: p.rot }}
                transition={{ duration: p.dur, ease: "easeOut", times: [0, 0.35, 1] }}
              >
                {p.glyph}
              </motion.span>
            ))}
            <motion.p
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-ink/85 px-6 py-3 font-display text-xl italic text-paper md:text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 3.2, times: [0, 0.2, 0.75, 1] }}
            >
              you found it. happy Diwali, Nans. 🪔
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      {bloom && (
        <motion.div
          key={bloom.id}
          className="absolute -ml-5 -mt-5 text-rose drop-shadow-[0_0_18px_rgba(232,176,75,0.9)]"
          style={{ left: bloom.x, top: bloom.y }}
          initial={{ scale: 0.2, opacity: 0.95 }}
          animate={{ scale: reduced ? 1.5 : 14, opacity: 0 }}
          transition={{ duration: HEART_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
        >
          <Heart size={40} fill="currentColor" />
        </motion.div>
      )}
    </div>
  );
}
