"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HALF_SIZE = 16;

export function CursorGlow() {
  const reduced = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 140, damping: 22 });
  const sy = useSpring(y, { stiffness: 140, damping: 22 });

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX - HALF_SIZE);
      y.set(e.clientY - HALF_SIZE);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, x, y]);

  if (reduced) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 h-8 w-8 rounded-full bg-gold/30 blur-lg"
      style={{ x: sx, y: sy }}
    />
  );
}
