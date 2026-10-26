# For Nans

An animated love letter. Next.js 15 (App Router), TypeScript strict, Tailwind v4, `motion`, `lenis`.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm lint
```

## Set START_DATE
Edit `START_DATE` in `src/lib/constants.ts`. It drives the "seconds since I started loving you" ticker in the hero and the Act 7 counter.

## Swap placeholders for real images
Every image is a `<PlaceholderImage label="IMAGE — name.jpg" />` (`src/components/ui/PlaceholderImage.tsx`). Put files in `public/` and replace with:

```tsx
<Image src="/memory-1.jpg" alt="..." width={1200} height={800} sizes="(min-width: 768px) 44vw, 80vw" />
```
Use `priority` only for above-the-fold images. Add `public/og.jpg` (1200x630) for the share card.

## Adjust the palette
Colors live in two places: `@theme inline` in `src/app/globals.css` (Tailwind classes like `text-rose`, `bg-gold`) and `ACCENT_COLORS` in `src/lib/constants.ts`. A few SVG fills and gradients use the hex values directly; search for `#C9485B`, `#D4A24C` and `#E8A87C`.

## Easter eggs
`EasterEgg.tsx` mounts two global `useKeySequence` listeners (keystrokes inside a 2s window).
- **1307**: hearts and stars burst, a 400ms gold flash, and a message that fades in and out.
- **0812**: a single glowing heart blooms from the last known cursor position.
Both degrade to a fade under `prefers-reduced-motion`. Copy lives in `src/lib/content.ts`; all timings in `src/lib/constants.ts`.
