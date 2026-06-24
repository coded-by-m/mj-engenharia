# Claude Project Instructions — MJ Engenharia

Before making changes, read:

1. `/docs/ai/MASTER_CONTEXT.md`
2. `/docs/ai/PROJECT.md`
3. `/docs/ai/SITE_ARCHITECTURE.md`
4. `/docs/ai/PAGE_BLUEPRINTS.md`
5. `/docs/ai/DESIGN_SYSTEM.md`
6. `/docs/ai/MOTION_DIRECTION.md`
7. `/docs/ai/EXECUTION_PLAN.md`
8. `/docs/ai/CONTENT_PENDING.md`
9. `/docs/ai/QA_CHECKLIST.md`
10. `/docs/ai/DECISIONS_LOG.md`

## Project snapshot
- **What:** Premium single-page landing for MJ Engenharia (engenharia preventiva, Grande Florianópolis/SC).
- **Flagship:** Projetos de PPCI. Tone = technical competence, NOT legal fear.
- **Conversion:** WhatsApp ("Falar com um engenheiro"), `wa.me` deep links + floating button.
- **Stack:** Next.js (App Router) + Tailwind, `next/font`, `next/image`, Vercel.
- **Brand:** navy base (`#073B4C`/`#0B2A36`), red (`#D62828`) for CTAs only; Montserrat/Inter/Barlow Condensed; assets in `Identidade Visual/`.

## Rules
- Do not implement before reading the architecture docs.
- Do not change visual direction without checking the design system.
- Do not invent client facts (metrics, CREA, testimonials, contacts) — use `CONTENT_PENDING.md` placeholders.
- Preserve documented decisions unless the developer approves a change.
- Report changed files and pending issues after each phase.
