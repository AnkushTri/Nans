"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_OUT_EXPO } from "@/lib/motion";

const TORN_EDGE = `polygon(${Array.from({ length: 26 }, (_, i) => `${i * 4}% ${i % 2 ? "1.6%" : "0%"}`).join(",")},100% 100%,0 100%)`;
const PAPER =
  "absolute inset-0 flex flex-col justify-between bg-[#FFFDF8] p-8 pt-12 [background-image:repeating-linear-gradient(transparent,transparent_31px,rgba(201,72,91,0.12)_32px)]";

type LetterCardProps = { title: string; opening: string; body: string; rotate: number };

export function LetterCard({ title, opening, body, rotate }: LetterCardProps) {
  const reduced = useReducedMotion();
  const [flipped, setFlipped] = useState(false);

  const front = (
    <>
      <p className="font-mono text-xs tracking-[0.3em] text-rose">LETTER</p>
      <div>
        <span className="block font-display text-3xl italic">{title}</span>
        <p className="mt-6 font-script text-2xl text-ink/80">{opening}</p>
      </div>
      <p className="font-mono text-xs text-ink/50">tap to open</p>
    </>
  );
  const back = (
    <p className="font-script text-2xl leading-8 text-ink/90">
      {opening} {body}
    </p>
  );

  return (
    <motion.article
      style={{ rotate, perspective: 1200 }}
      whileHover={reduced ? undefined : { y: -14, rotate: 0, rotateX: 4 }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      className="drop-shadow-[0_18px_28px_rgba(26,20,16,0.14)]"
    >
      <h3 className="sr-only">{title}</h3>
      <button
        type="button"
        aria-pressed={flipped}
        aria-label={`${title}. ${flipped ? "Close letter" : "Open letter"}`}
        onClick={() => setFlipped((f) => !f)}
        className="block h-[26rem] w-full text-left"
      >
        {reduced ? (
          <motion.div key={String(flipped)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative h-full w-full">
            <div className={PAPER} style={{ clipPath: TORN_EDGE }}>{flipped ? back : front}</div>
          </motion.div>
        ) : (
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative h-full w-full"
          >
            <div className={`${PAPER} [backface-visibility:hidden]`} style={{ clipPath: TORN_EDGE }}>{front}</div>
            <div
              className={`${PAPER} justify-start [backface-visibility:hidden]`}
              style={{ clipPath: TORN_EDGE, transform: "rotateY(180deg)" }}
            >
              <motion.div animate={{ opacity: flipped ? 1 : 0 }} transition={{ delay: flipped ? 0.45 : 0, duration: 0.6 }}>
                {back}
              </motion.div>
            </div>
          </motion.div>
        )}
      </button>
    </motion.article>
  );
}
