"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Before/after wipe slider. Both renders share the same camera, so dragging the
 * divider reveals the PPCI network exactly where it sits inside the building.
 * Left of the divider: clean architecture. Right: the x-ray (building + network).
 *
 * Frameless: fills its parent (the parent owns the framed box). Touch is
 * scroll-safe — `touch-action: pan-y` lets vertical swipes scroll the page, and
 * a wipe only engages once horizontal intent is detected (no jump-on-tap).
 * Mouse keeps click-to-position. Keyboard arrows move the divider; a one-time
 * intro nudge signals it's draggable (skipped under prefers-reduced-motion).
 */
export function ProjectCompare({
  before,
  after,
  alt,
  sizes,
  priority = false,
}: {
  before: string;
  after: string;
  alt: { before: string; after: string };
  sizes?: string;
  priority?: boolean;
}) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [tweening, setTweening] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const introDone = useRef(false);
  const rafId = useRef<number | null>(null);
  const start = useRef<{ x: number; y: number; id: number } | null>(null);
  const mode = useRef<"idle" | "maybe" | "drag">("idle");

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  function beginDrag(clientX: number) {
    mode.current = "drag";
    setTweening(false);
    setDragging(true);
    setFromClientX(clientX);
  }

  function onPointerDown(e: React.PointerEvent) {
    start.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
    if (e.pointerType === "mouse") {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      beginDrag(e.clientX);
    } else {
      // Touch/pen: wait to see if the gesture is a horizontal wipe or a scroll.
      mode.current = "maybe";
    }
  }

  function onPointerMove(e: React.PointerEvent) {
    if (mode.current === "drag") {
      setFromClientX(e.clientX);
      return;
    }
    if (mode.current === "maybe" && start.current) {
      const dx = e.clientX - start.current.x;
      const dy = e.clientY - start.current.y;
      if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
        (e.currentTarget as HTMLElement).setPointerCapture(start.current.id);
        beginDrag(e.clientX);
      } else if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
        mode.current = "idle"; // vertical intent → let the page scroll
        start.current = null;
      }
    }
  }

  function onPointerUp(e: React.PointerEvent) {
    if (mode.current === "drag") {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
    mode.current = "idle";
    start.current = null;
    setDragging(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - step));
    else if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + step));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
    else return;
    e.preventDefault();
  }

  // One-time intro nudge when the slider scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (!entry.isIntersecting || introDone.current) return;
        introDone.current = true;
        io.disconnect();
        if (reduce) return;
        setTweening(true);
        const startT = performance.now();
        const from = 72;
        const to = 50;
        setPos(from);
        const tick = (now: number) => {
          const t = Math.min(1, (now - startT) / 900);
          const eased = 1 - Math.pow(1 - t, 3); // ease-out-cubic
          setPos(from + (to - from) * eased);
          if (t < 1) rafId.current = requestAnimationFrame(tick);
          else setTweening(false);
        };
        rafId.current = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const ease = dragging || tweening ? "" : "transition-[clip-path] duration-200 ease-out";

  return (
    <div
      ref={ref}
      className="absolute inset-0 touch-pan-y select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Base: x-ray (after) */}
      <Image
        src={after}
        alt={alt.after}
        fill
        priority={priority}
        sizes={sizes ?? "(max-width: 1024px) 100vw, 58vw"}
        draggable={false}
        className="pointer-events-none object-cover"
      />

      {/* Top: clean architecture (before), clipped to the left of the divider */}
      <div
        className={`absolute inset-0 ${ease}`}
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={before}
          alt={alt.before}
          fill
          sizes={sizes ?? "(max-width: 1024px) 100vw, 58vw"}
          draggable={false}
          className="pointer-events-none object-cover"
        />
      </div>

      {/* Labels */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-black/45 to-transparent"
      />
      <span className="kicker pointer-events-none absolute left-4 top-3 z-10 text-white/90">
        Arquitetura
      </span>
      <span className="kicker pointer-events-none absolute right-4 top-3 z-10 text-white/90">
        Sistema Preventivo
      </span>

      {/* Divider + handle */}
      <div
        className={`absolute inset-y-0 z-10 w-px -translate-x-1/2 bg-white/80 ${ease}`}
        style={{ left: `${pos}%` }}
      >
        <button
          type="button"
          role="slider"
          aria-label="Comparar arquitetura e sistema preventivo"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% sistema preventivo`}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border border-white/30 bg-brand-deep/80 text-white backdrop-blur-sm transition-transform hover:scale-105 focus-visible:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 7l-4 5 4 5M15 7l4 5-4 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
