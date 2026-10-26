"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ autoRaf: true, duration: 1.2 });
    return () => lenis.destroy();
  }, [reduced]);

  return null;
}
