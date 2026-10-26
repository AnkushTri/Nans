import { AnalogClock } from "@/components/ui/AnalogClock";
import { FlipClock } from "@/components/ui/FlipClock";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TwoNumbers() {
  return (
    <section id="numbers" aria-labelledby="numbers-title" className="px-6 py-32 md:px-16">
      <SectionHeading eyebrow="08 · 12  /  13 · 07" title="The two numbers" />
      <h2 id="numbers-title" className="sr-only">The two numbers</h2>
      <div className="mx-auto mt-24 grid max-w-7xl gap-24 md:grid-cols-12 md:gap-12">
        <Reveal className="md:col-span-7">
          <p className="font-display text-7xl md:text-[9rem] md:leading-none">08 · 12</p>
          <AnalogClock className="mt-10 w-64 drop-shadow-xl md:w-80" />
          <p className="mt-8 max-w-md font-script text-2xl text-ink/80">
            Yours. Twelve minutes past eight, the hour I would stop every clock for. Placeholder note.
          </p>
        </Reveal>
        <Reveal className="md:col-span-5 md:mt-40" delay={0.15}>
          <p className="font-display text-7xl text-rose md:text-8xl md:leading-none">13 · 07</p>
          <div className="mt-10">
            <FlipClock digits="1307" />
          </div>
          <p className="mt-8 max-w-sm font-script text-2xl text-ink/80">
            Mine. Seven past one: nothing special, until it was. Placeholder note.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
