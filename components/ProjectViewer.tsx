"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Layer = "arq" | "ppci";

const LABELS: Record<Layer, string> = {
  arq: "Arquitetura",
  ppci: "Sistema Preventivo",
};

const AUTO_MS = 3500;

/**
 * Paired BIM render with an Arquitetura ⇄ Sistema Preventivo crossfade.
 * Auto-alternates on a loop until the user takes manual control (or hovers/
 * focuses, or scrolls it out of view, or prefers-reduced-motion). The two
 * source renders are different framings, so this is a crossfade — not a wipe.
 */
export function ProjectViewer({
  arq,
  ppci,
  alt,
  sizes,
  priority = false,
}: {
  arq: string;
  ppci: string;
  alt: { arq: string; ppci: string };
  sizes?: string;
  priority?: boolean;
}) {
  const [layer, setLayer] = useState<Layer>("arq");
  const [manual, setManual] = useState(false);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Only run the timer while the viewer is actually on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-crossfade loop, gated on every reason we might want it stopped.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (manual || paused || !inView || reduce) return;
    const id = window.setInterval(
      () => setLayer((l) => (l === "arq" ? "ppci" : "arq")),
      AUTO_MS
    );
    return () => window.clearInterval(id);
  }, [manual, paused, inView]);

  function choose(next: Layer) {
    setManual(true);
    setLayer(next);
  }

  return (
    <div
      ref={ref}
      className="group/viewer relative aspect-[16/10] overflow-hidden rounded-[var(--radius-lg)] border border-line bg-brand-drench"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {(["arq", "ppci"] as Layer[]).map((key) => (
        <Image
          key={key}
          src={key === "arq" ? arq : ppci}
          alt={key === "arq" ? alt.arq : alt.ppci}
          aria-hidden={layer !== key}
          fill
          priority={priority && key === "arq"}
          sizes={sizes ?? "(max-width: 1024px) 100vw, 55vw"}
          className={`object-cover transition-opacity duration-700 ease-out ${
            layer === key ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Top gradient so the layer label stays legible over busy renders */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 to-transparent"
      />
      <span
        aria-live="polite"
        className="kicker absolute left-4 top-3 z-10 text-white/90"
      >
        {LABELS[layer]}
      </span>

      {/* Segmented manual control */}
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1 rounded-full border border-white/15 bg-brand-deep/70 p-1 backdrop-blur-sm">
        {(["arq", "ppci"] as Layer[]).map((key) => {
          const active = layer === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => choose(key)}
              aria-pressed={active}
              className={`kicker rounded-full px-3 py-1.5 transition-colors ${
                active
                  ? "bg-white text-brand-deep"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {LABELS[key]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
