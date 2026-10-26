"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { VIEWPORT, pickReveal } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

export function Reveal({ children, className, delay = 0, distance }: RevealProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={pickReveal(reduced, distance, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}
