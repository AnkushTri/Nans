import { Adjectives } from "@/components/acts/Adjectives";
import { Constellation } from "@/components/acts/Constellation";
import { Diyas } from "@/components/acts/Diyas";
import { EasterEgg } from "@/components/acts/EasterEgg";
import { Footer } from "@/components/acts/Footer";
import { Gallery } from "@/components/acts/Gallery";
import { Hero } from "@/components/acts/Hero";
import { HowWeMet } from "@/components/acts/HowWeMet";
import { Letters } from "@/components/acts/Letters";
import { TheMinute } from "@/components/acts/TheMinute";
import { Threshold } from "@/components/acts/Threshold";
import { TimeWithYou } from "@/components/acts/TimeWithYou";
import { TwoNumbers } from "@/components/acts/TwoNumbers";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <CursorGlow />
      <EasterEgg />
      <main>
        <Hero />
        <TwoNumbers />
        <HowWeMet />
        <Gallery />
        <Adjectives />
        <Constellation />
        <Letters />
        <TimeWithYou />
        <TheMinute />
        <Diyas />
        <Threshold />
      </main>
      <Footer />
    </>
  );
}
