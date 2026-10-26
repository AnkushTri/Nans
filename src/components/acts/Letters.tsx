import { LetterCard } from "@/components/ui/LetterCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LETTERS } from "@/lib/content";

export function Letters() {
  return (
    <section aria-labelledby="letters-title" className="px-6 py-32 md:px-16">
      <div id="letters-title"><SectionHeading eyebrow="08 · 12" title="Letters" /></div>
      <div className="mx-auto mt-20 grid max-w-6xl gap-12 md:grid-cols-3">
        {LETTERS.map((letter, i) => (
          <Reveal key={letter.title} delay={i * 0.12}>
            <LetterCard {...letter} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
