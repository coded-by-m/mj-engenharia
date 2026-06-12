"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Discreet smooth scroll (Lenis).
 * - Wheel only; touch keeps native momentum (smoothTouch off by default).
 * - Disabled entirely under prefers-reduced-motion.
 * - Animates in-page anchor links with a fixed-header offset.
 * See /docs/ai/MOTION_DIRECTION.md.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.11, // slightly snappy, not floaty — fits a technical brand
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.1 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
