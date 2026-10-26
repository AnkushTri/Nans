import type { Variants } from "motion/react";

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;
export const DURATION = { fast: 0.4, base: 0.9, slow: 1.4, breathe: 5 } as const;
export const VIEWPORT = { once: true, margin: "-15%" } as const;

/** Full reveal, or a plain fade when the user prefers reduced motion. */
export const pickReveal = (reduced: boolean, distance = 32, delay = 0): Variants => ({
  hidden: { opacity: 0, y: reduced ? 0 : distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: reduced ? DURATION.fast : DURATION.base, ease: EASE_OUT_EXPO, delay },
  },
});
