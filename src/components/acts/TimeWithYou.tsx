"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { secondsSince, secondsUntilNext, useNow } from "@/hooks/useLiveCounter";
import { NANS_TIME, START_DATE } from "@/lib/constants";

type CounterProps = { label: string; value: string; caption: string };

function Counter({ label, value, caption }: CounterProps) {
  return (
    <div className="text-center">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink/60">{label}</p>
      <p className="mt-4 font-mono text-4xl tabular-nums md:text-6xl" aria-live="off">{value}</p>
      <p className="mt-3 font-display text-sm italic text-ink/60">{caption}</p>
    </div>
  );
}

export function TimeWithYou() {
  const now = useNow();
  const known = now ? secondsSince(START_DATE, now).toLocaleString("en-US") : "—";
  const until = now ? secondsUntilNext(NANS_TIME, now).toLocaleString("en-US") : "—";
  return (
    <section aria-labelledby="time-title" className="px-6 py-32">
      <div id="time-title"><SectionHeading eyebrow="13 · 07" title="Time with you" /></div>
      <Reveal className="mx-auto mt-20 grid max-w-5xl gap-16 md:grid-cols-2">
        <Counter label="Seconds I've known you" value={known} caption="and not one of them wasted" />
        <Counter label="Seconds until our next 08:12" value={until} caption="the clock keeps its promises" />
      </Reveal>
    </section>
  );
}
