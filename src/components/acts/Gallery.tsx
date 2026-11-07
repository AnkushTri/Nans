"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Column = { photos: [number, number]; range: [number, number]; arch: boolean; offset: string };

const COLUMNS: Column[] = [
  { photos: [1, 4], range: [60, -60], arch: false, offset: "" },
  { photos: [2, 5], range: [-40, 80], arch: true, offset: "md:mt-24" },
  { photos: [3, 6], range: [80, -40], arch: false, offset: "md:mt-8" },
];

function Strip({ column, progress, reduced }: { column: Column; progress: MotionValue<number>; reduced: boolean }) {
  const y = useTransform(progress, [0, 1], column.range);
  return (
    <motion.div style={reduced ? undefined : { y }} className={`grid gap-6 ${column.offset}`}>
      {column.photos.map((n, i) => (
        <Reveal key={n}>
          <Photo
            n={n}
            className={`w-full shadow-2xl shadow-ink/20 ${i === 0 ? "aspect-[3/4]" : "aspect-[4/5]"} ${column.arch && i === 0 ? "rounded-t-[999px]" : "rounded-3xl"}`}
          />
        </Reveal>
      ))}
    </motion.div>
  );
}

export function Gallery() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <section ref={ref} aria-labelledby="frames-title" className="overflow-hidden bg-gradient-to-b from-paper via-[#FFE6B8] to-paper px-6 py-32 md:px-16">
      <div id="frames-title"><SectionHeading eyebrow="08 · 12" title="Nans, in frames" /></div>
      <p className="mt-4 text-center font-script text-2xl text-ink/70">Every one of these, I'd frame.</p>
      <div className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        {COLUMNS.map((c) => (
          <Strip key={c.photos[0]} column={c} progress={scrollYProgress} reduced={reduced} />
        ))}
      </div>
    </section>
  );
}
