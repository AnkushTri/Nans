"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Flame, Heart, Sparkles, Star } from "lucide-react";
import { useRef } from "react";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PHOTO_COUNT } from "@/lib/constants";
import { MEMORIES } from "@/lib/content";

const COUNT = MEMORIES.length;
const SYMBOLS = [Flame, Sparkles, Star, Flame, Heart, Sparkles] as const;

type CardProps = { index: number; progress: MotionValue<number> };

function Memory({ index, progress }: CardProps) {
  const m = MEMORIES[index];
  const end = index / (COUNT - 1);
  const range = [end - 0.15, end];
  const scale = useTransform(progress, range, [0.88, 1]);
  const rotate = useTransform(progress, range, [index % 2 ? -6 : 6, 0]);
  return (
    <div className="flex shrink-0 items-center justify-center" style={{ width: `${100 / COUNT}%` }}>
      <motion.figure style={{ scale, rotate }} className="w-[80vw] overflow-hidden rounded-3xl bg-white shadow-2xl shadow-ink/10 md:w-[44vw]">
        <Photo n={((index + 3) % PHOTO_COUNT) + 1} className="aspect-[4/3] w-full md:aspect-[16/10]" />
        <figcaption className="p-6">
          <p className="font-display text-2xl italic">{m.title}</p>
          <p className="mt-1 text-ink/70">{m.caption}</p>
        </figcaption>
      </motion.figure>
    </div>
  );
}

function Pinned() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${((COUNT - 1) / COUNT) * 100}%`]);
  return (
    <section ref={ref} aria-labelledby="met-title" style={{ height: `${COUNT * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div id="met-title" className="absolute inset-x-0 top-8 z-10">
          <SectionHeading eyebrow="13 · 07" title="From 10 July" />
        </div>
        {SYMBOLS.map((Icon, i) => (
          <motion.div
            key={i}
            aria-hidden="true"
            className="absolute bottom-0 text-rose/50"
            style={{ left: `${8 + i * 16}%` }}
            animate={{ y: [0, -700], opacity: [0, 0.7, 0] }}
            transition={{ duration: 8 + i * 1.5, delay: i * 1.2, repeat: Infinity, ease: "linear" }}
          >
            <Icon size={20} />
          </motion.div>
        ))}
        <motion.div style={{ x, width: `${COUNT * 100}%` }} className="flex h-full items-center pt-16">
          {MEMORIES.map((_, i) => (
            <Memory key={i} index={i} progress={scrollYProgress} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Stacked() {
  return (
    <section aria-labelledby="met-title" className="px-6 py-32">
      <div id="met-title"><SectionHeading eyebrow="13 · 07" title="From 10 July" /></div>
      <div className="mx-auto mt-16 grid max-w-3xl gap-12">
        {MEMORIES.map((m, i) => (
          <Reveal key={m.title}>
            <figure className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-ink/10">
              <Photo n={((i + 3) % PHOTO_COUNT) + 1} className="aspect-[16/10] w-full" />
              <figcaption className="p-6">
                <p className="font-display text-2xl italic">{m.title}</p>
                <p className="mt-1 text-ink/70">{m.caption}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function HowWeMet() {
  const reduced = useReducedMotion();
  return reduced ? <Stacked /> : <Pinned />;
}
