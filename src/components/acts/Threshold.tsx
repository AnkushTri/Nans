import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Threshold() {
  return (
    <section aria-labelledby="threshold-title" className="bg-ink px-6 py-32 text-center text-paper">
      <div id="threshold-title"><SectionHeading eyebrow="13 · 07" title="The 1307 threshold" tone="dark" /></div>
      <Reveal className="mt-10">
        <p className="font-display text-2xl italic text-paper/85 md:text-4xl">Type 1307 anywhere on this page.</p>
        <p className="mt-4 font-script text-xl text-paper/60">(0812 works too, quietly.)</p>
      </Reveal>
    </section>
  );
}
