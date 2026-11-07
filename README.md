# For Nans — Diwali edition

Next.js 15, TypeScript strict, Tailwind v4, `motion`, `lenis`, `three`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
```

## Photos
Put Nans's pictures in `public/nans/` named `1.jpg` … `6.jpg`. Any missing slot shows a placeholder, so you can add them one at a time. Photos 1–6 appear in both the pinned timeline and the "Nans, in frames" gallery (different order and crops).

## Dates
`src/lib/constants.ts`: `START_DATE` (10 July 2026, set the hour if you remember it), `NANS_BIRTHDAY` (8 Dec), `AN_BIRTHDAY` (13 Jul).

## Words
All copy (timeline, adjectives, the five diyas, letters, the 08:12 lines) is in `src/lib/content.ts`. Rewrite it in your own voice.

## Palette
`@theme inline` in `src/app/globals.css` (kumkum red, marigold, gold, deep maroon, cream) and `ACCENT_COLORS` in `src/lib/constants.ts`.

## three.js
`src/components/ui/EmberScene.tsx`: seeded rising embers plus drifting lantern glows. Used in the hero and the diya finale. Paused offscreen, one static frame under reduced motion.

## Easter eggs
Type `1307` for the confetti burst, `0812` for the single glowing heart.
