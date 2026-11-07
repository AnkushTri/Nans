import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({ eyebrow, title, tone = "light", className = "" }: SectionHeadingProps) {
  return (
    <Reveal className={`text-center ${className}`}>
      <p className={`font-mono text-xs tracking-[0.35em] ${tone === "dark" ? "text-peach" : "text-rose"}`}>{eyebrow}</p>
      <h2 className={`mt-3 font-display text-4xl italic md:text-6xl ${tone === "dark" ? "text-paper" : "text-ink"}`}>
        {title}
      </h2>
    </Reveal>
  );
}
