import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarField } from "@/components/ui/StarField";

export function Constellation() {
  return (
    <section aria-labelledby="stars-title" className="bg-black">
      <div id="stars-title" className="bg-[#0E0818] pb-10 pt-28 text-paper">
        <SectionHeading eyebrow="13 · 07" title="Our constellation" tone="dark" />
      </div>
      <StarField />
    </section>
  );
}
