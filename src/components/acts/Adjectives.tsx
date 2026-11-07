"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { HEARTBEAT_MS } from "@/lib/constants";
import { ADJECTIVES, CENTER_WORD } from "@/lib/content";

const WORDS = ADJECTIVES.filter((w) => w !== CENTER_WORD);
const MID = Math.floor(WORDS.length / 2);
const ORDER = [...WORDS.slice(0, MID), CENTER_WORD, ...WORDS.slice(MID)];

export function Adjectives() {
  const reduced = useReducedMotion();
  return (
    <section aria-labelledby="adj-title" className="bg-ink px-6 py-32 text-paper md:px-16">
      <div id="adj-title"><SectionHeading eyebrow="08 · 12" title="What I carry for you" tone="dark" /></div>
      <ul className="mx-auto mt-20 flex max-w-5xl flex-wrap items-center justify-center gap-3 md:gap-4">
        {ORDER.map((word, i) => {
          const center = word === CENTER_WORD;
          return (
            <li key={word}>
              <Reveal delay={(i % 10) * 0.06} distance={24}>
                {center ? (
                  <motion.span
                    animate={reduced ? undefined : { scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
                    transition={{ duration: (HEARTBEAT_MS.nans * 4) / 1000, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-block px-6 py-3 font-display text-5xl italic text-gold [text-shadow:0_0_28px_rgba(232,176,75,0.7)] md:text-7xl"
                  >
                    {word}
                  </motion.span>
                ) : (
                  <span className="inline-block cursor-default rounded-full border border-paper/20 px-5 py-2 text-lg transition duration-500 hover:scale-110 hover:border-gold hover:text-gold hover:[text-shadow:0_0_18px_rgba(232,176,75,0.8)]">
                    {word}
                  </span>
                )}
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
