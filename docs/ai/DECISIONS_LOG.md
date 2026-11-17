# Decisions Log

## DEC-015 — Hero revision (2026-11-07)
**Status:** Approved by developer (applied)
**Decision:**
- H1 is fully white; red in the hero is limited to the CTA and the fire network in the drawing. This narrows DEC-012's "committed" red for the hero only.
- The hero background is a generated drafting scene: a street canyon of structural frames in three-point perspective, in low-contrast linework, with the main tower's fire-protection system in red on its front facade. The system is shown as one riser diagram: a fire reserve in the roof tank, a hydrant riser with a cabinet per floor, a sprinkler riser with an alarm valve and a branch per floor, and the siamese connection on the pavement. Columns and slabs have real thickness, and translucent fills keep what's behind each tower as a ghost, because fully transparent frames read as a tangle of lines (developer feedback). It was chosen by the developer from a dense perspective-wireframe reference, in place of a simpler isometric sketch. It is labeled "Desenho ilustrativo" and must not be presented as a client project. The system is drawn to read correctly, not dimensioned to a standard.
- The scene carries no text. Drawing-sheet callouts and a height dimension were tried and removed at the developer's request.
- `scripts/generate-hero-wireframe.mjs` is the source of `components/sections/hero-scene.generated.ts`, rendered inline by `HeroScene.tsx`. Edit the script and regenerate; don't edit the generated file. Inline SVG lets the CSS entrance honour `prefers-reduced-motion` directly, so no static copy is needed. It adds about 10 KB gzipped to the HTML. Each layer is its own `<svg>` (far, mid, near, network), so only the network repaints while it draws.
- Subhead names the four DEC-006 segments and keeps the "menor custo de obra" line from the client copy commit.
- The hero entrance is CSS-only, with no `Reveal`, so the first viewport no longer depends on hydration. This closes, for the hero only, the failure DEC-011 left open: scripts that load `.js` but fail to hydrate. Other sections still use `Reveal`.
- H1 size is bounded by viewport height so the CTA stays in the first viewport on short laptop screens.
**Open:** "Projetos que passam na primeira análise" stays until the client confirms it (CNT-010). If it can't be supported, use the blueprint line.
**Impact:** Hero, globals.css, PAGE_BLUEPRINTS hero visual, MOTION_DIRECTION hero entry.

## 2026-06-24 — SPDA removed from scope
**Status:** Approved (applied)
**Decision:** Remove SPDA entirely from the site and positioning. PPCI is now the single flagship specialty. All SPDA copy, the SPDA service card, the PPCI-vs-SPDA FAQ, NBR 5419 references, and SPDA SEO terms were removed.
**Why:** Client request.
**Impact:** Hero, Especialidades, Soluções grid, FAQ, metadata/SEO, CONTENT_PENDING (CNT-007 dropped).

## DEC-001 — Initial project architecture workflow
**Status:** Approved
**Decision:** Use Coded by M — Site Architecture System as the pre-production workflow.
**Impact:** Discovery, architecture docs and AI execution plan.

## DEC-002 — Project type
**Status:** Approved
**Decision:** Single-page landing page (vertical narrative), not a multi-page site.
**Impact:** Sitemap, SITE_ARCHITECTURE, PAGE_BLUEPRINTS.

## DEC-003 — Primary conversion
**Status:** Approved
**Decision:** Primary action is WhatsApp ("Falar com um engenheiro") via floating button + inline CTAs using `wa.me` deep links with a pre-filled message. Contact form is a secondary path only.
**Impact:** Every section CTA, footer, floating button, conversion path.

## DEC-004 — Positioning / copy direction
**Status:** Approved
**Decision:** Position around delivering engineering **projects** (PPCI), with a confident technical tone. Do NOT lead with legal fear (fines, interdiction, lapsed AVCB). Legal/compliance points may appear only as light technical notes in the FAQ.
**Impact:** All copy, Hero, removed "dores/medo" section, FAQ tone.

## DEC-005 — Flagship specialty
**Status:** Approved
**Decision:** Elevate **PPCI** as the flagship specialty, given a dedicated anchor block. Laudo / regularização / AVCB are secondary complementary services. (SPDA was removed from scope on 2026-06-24.)
**Impact:** "Especialidades" section, services grid ordering, SEO focus.

## DEC-006 — Target audience
**Status:** Approved
**Decision:** Four segments — Empresas/indústria, Síndicos/condomínios, Comércio local, Construtoras.
**Impact:** "Segmentos atendidos" cards, copy framing.

## DEC-007 — Tech stack
**Status:** Approved
**Decision:** Next.js (App Router) + Tailwind CSS, deploy on Vercel. Fonts via `next/font`, images via `next/image`.
**Impact:** EXECUTION_PLAN, DESIGN_SYSTEM tokens, performance approach.

## DEC-008 — Visual level
**Status:** Approved
**Decision:** Premium and refined. Navy-based palette with red as a restrained accent/CTA color only.
**Impact:** DESIGN_SYSTEM, MOTION_DIRECTION.

## DEC-009 — Structural reference
**Status:** Approved
**Decision:** Base the section structure on https://brandventuraengenharia.com.br/ — adopt what works (services grid, differentiators, who-we-are, contact+location, footer), but with significantly better UI/UX organization and specialist (not generalist) positioning.
**Impact:** SITE_ARCHITECTURE section order, PAGE_BLUEPRINTS.

## DEC-014 — Smooth scroll (Lenis)
**Status:** Approved (applied)
**Decision:** Added Lenis (~3kb) for discreet wheel smooth-scroll. `lerp: 0.11` (slightly snappy, not floaty). Touch keeps native momentum (`smoothTouch` off). Fully disabled under `prefers-reduced-motion`. In-page anchor links animated via `lenis.scrollTo` with a -80px fixed-header offset. Component: `components/SmoothScroll.tsx`, mounted in layout.
**Impact:** Global scroll feel; layout, globals.css (Lenis classes override `scroll-behavior`).

## DEC-013 — Scroll-jank fixes
**Status:** Approved (applied)
**Decision:** Removed scroll jank: header no longer uses `backdrop-blur` (solid bg + soft shadow when scrolled); `.reveal` `will-change` applies only while animating in (not permanently); photo duotone dropped `mix-blend-mode: multiply` for an image filter + normal overlay.
**Impact:** Header, globals.css reveal + duotone.

## DEC-012 — Impeccable redesign (remove AI-template feel)
**Status:** Approved (applied)
**Aesthetic lane:** "Engineering dossier / structural precision" — deliberately NOT the industrial-dark-mono reflex.
**Decision:**
- Replaced repeated per-section eyebrows with a numbered section index system (00–07) in Barlow Condensed — a deliberate named brand system.
- Killed identical icon-card grids: Soluções → numbered engineering index list; Processo → horizontal timeline with hairline connectors; Diferenciais → numbered typographic statements; Segmentos → rule-separated row; Especialidades → asymmetric editorial blocks with real photography.
- Oversize Montserrat display (`clamp`), tight tracking, red used as true signal/emphasis (committed, not timid); navy drench in hero.
- Real, verified illustrative imagery (Unsplash, navy duotone) for the flagship — NOT client projects: PPCI = fire-protection valves/pumps.
- Dropped the fake "Projetos" placeholder gallery; nav is Especialidades · Soluções · Processo · Sobre · Contato.
- Tinted neutrals (no pure #fff), sharper radii.
**Image credits (Unsplash, no attribution required):** PPCI photo 1690973692388 (Rose Galloway Green).
**Impact:** Hero, all sections, DESIGN_SYSTEM type/color, nav/IA.

## DEC-011 — Implementation-time technical choices
**Status:** Approved (applied)
**Decision:**
- Next.js upgraded 15.5.4 → 16.2.9 to patch CVE-2025-66478; React 19.
- Tailwind v4 with `@theme` tokens + CSS variables (DESIGN_SYSTEM colors/fonts/radius).
- Base element styles live in `@layer base` so Tailwind utilities (e.g. `text-white`) win — fixes inverse-section headings.
- Scroll reveal is progressive-enhancement: content visible by default; only hidden+animated when `.js` is set on `<html>` before paint. Safe for SSR/no-JS/crawlers; respects reduced motion.
- Header is adaptive: white logo + light nav over the navy hero (top), positive logo + dark nav once scrolled.
- WhatsApp CTA uses an inline WhatsApp glyph (brand kit has no chat icon).
- Contact form has no backend yet → composes a WhatsApp message from fields and opens the chat (swap for a real endpoint later).
**Impact:** EXECUTION_PLAN phases 01–07, DESIGN_SYSTEM, MOTION_DIRECTION.

## DEC-010 — Design system source
**Status:** Approved
**Decision:** Derive the design system from the supplied brand manual (colors, typography Montserrat/Inter/Barlow Condensed, linear icons, logo set).
**Impact:** DESIGN_SYSTEM, asset guidelines.
