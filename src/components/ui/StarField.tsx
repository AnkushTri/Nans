"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SEEDS, STAR_CONNECT_RADIUS, STAR_COUNT } from "@/lib/constants";
import { HERO_STARS } from "@/lib/content";
import { createSeededRandom } from "@/lib/seededRandom";

type Star = { x: number; y: number; r: number; phase: number };

function makeStars(): Star[] {
  const rx = createSeededRandom(SEEDS.nans);
  const ry = createSeededRandom(SEEDS.an);
  const rr = createSeededRandom(SEEDS.nans + SEEDS.an);
  return Array.from({ length: STAR_COUNT }, () => ({
    x: rx(),
    y: ry(),
    r: 0.6 + rr() * 1.2,
    phase: rr() * Math.PI * 2,
  }));
}

const STARS = makeStars();

export function StarField() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const [openId, setOpenId] = useState<string | null>(null);
  const open = HERO_STARS.find((s) => s.id === openId);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let w = 0;
    let h = 0;
    let raf = 0;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of STARS) {
        const px = s.x * w;
        const py = s.y * h;
        const twinkle = reduced ? 0.8 : 0.55 + 0.45 * Math.sin(t / 1400 + s.phase);
        ctx.fillStyle = `rgba(255,248,235,${twinkle})`;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();
        const d = Math.hypot(px - mouse.current.x, py - mouse.current.y);
        if (d < STAR_CONNECT_RADIUS) {
          ctx.strokeStyle = `rgba(212,162,76,${(1 - d / STAR_CONNECT_RADIUS) * 0.55})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(mouse.current.x, mouse.current.y);
          ctx.stroke();
        }
      }
    };
    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0);
    };
    resize();
    window.addEventListener("resize", resize);

    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting && !reduced) raf = requestAnimationFrame(loop);
    });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  const onMove = (e: React.PointerEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (rect) mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  return (
    <div
      ref={wrapRef}
      onPointerMove={onMove}
      onPointerLeave={() => (mouse.current = { x: -9999, y: -9999 })}
      className="relative h-[85vh] min-h-[32rem] w-full overflow-hidden bg-gradient-to-b from-[#0B1020] to-black"
    >
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      {HERO_STARS.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => setOpenId(s.id)}
          aria-label={`Open note: ${s.label}`}
          className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
          style={{ left: `${s.x * 100}%`, top: `${s.y * 100}%` }}
        >
          <span className="block h-3 w-3 rounded-full bg-gold shadow-[0_0_18px_6px_rgba(212,162,76,0.45)] transition-transform duration-500 group-hover:scale-150" />
          <span className="font-display text-sm italic text-paper/80">{s.label}</span>
        </button>
      ))}
      <AnimatePresence>
        {open && (
          <motion.div
            key={open.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.5 }}
            role="dialog"
            aria-label={open.label}
            className="absolute inset-x-4 bottom-6 mx-auto max-w-sm rounded-3xl bg-paper/95 p-6 text-ink shadow-2xl shadow-black/40"
          >
            <button
              type="button"
              aria-label="Close note"
              onClick={() => setOpenId(null)}
              className="absolute right-4 top-4 text-ink/60"
            >
              <X size={18} />
            </button>
            <p className="font-display text-2xl italic">{open.label}</p>
            <p className="mt-2 font-script text-xl text-ink/80">{open.note}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
