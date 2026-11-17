# Content Pending

## Status
Relevant content is missing and may affect implementation. Use clearly-marked placeholders; never invent facts.

## Items

### CNT-001 — WhatsApp number
**Type:** Contact / conversion
**Status:** In use in `lib/site.ts`; source not recorded, confirm with client
**Impact:** All primary CTAs and floating button non-functional without it.
**Used in:** Header, Hero, CTA band, Final CTA, Footer, Floating button, contact area.
**Requirements:** Official number with DDD (e.g., 48...) + approved pre-filled message text.

### CNT-002 — CREA number (Eng. Milton Chagas)
**Type:** Credibility / legal
**Status:** In use in `lib/site.ts`; source not recorded, confirm with client
**Impact:** Authority seal and Quem Somos credibility.
**Used in:** Hero seal, Quem Somos, Footer.
**Requirements:** Full CREA registration string.

### CNT-003 — Address / area of operation
**Type:** Location / SEO
**Status:** Not received
**Impact:** Localização section, map, Schema.org LocalBusiness.
**Used in:** Contato/Localização, Footer, structured data.
**Current placeholder:** "Grande Florianópolis / SC" + map placeholder.
**Requirements:** Street address (if public) or service-area definition.

### CNT-004 — Proof metrics
**Type:** Social proof
**Status:** Received; `lib/site.ts` marks them client-provided on 2026-06-15. Confirm whether "+100 trabalhos" includes reports and consulting
**Impact:** Count-up metrics in Quem Somos / proof.
**Used in:** Hero, Quem Somos / Diferenciais.
**Requirements:** Real, verifiable numbers. Do not invent.

### CNT-005 — Real project photos
**Type:** Imagery / proof
**Status:** Not received — using illustrative stock for now
**Impact:** Especialidades blocks currently use illustrative Unsplash photos (navy duotone), clearly NOT client projects. The fake "Projetos" gallery was removed (DEC-012).
**Used in:** Especialidades (PPCI).
**Current placeholder:** Unsplash 1690973692388 (PPCI).
**Requirements:** Real project photos with usage rights → can replace the stock and reintroduce a genuine case-studies section.

### CNT-006 — Testimonials
**Type:** Social proof
**Status:** Not received
**Impact:** Optional testimonials block.
**Used in:** Projetos realizados.
**Current placeholder:** Hidden or placeholder card.
**Requirements:** Client name, role/segment, quote, consent.

### CNT-008 — Social profiles
**Type:** Links
**Status:** Partially known
**Impact:** Social row in CTA section and footer.
**Used in:** CTA + redes, Footer.
**Current placeholder:** Instagram/WhatsApp assumed; others hidden.
**Requirements:** Confirmed URLs (Instagram, LinkedIn, YouTube if any).

### CNT-009 — Email / phone
**Type:** Contact
**Status:** In use in `lib/site.ts`; source not recorded, confirm with client
**Impact:** Footer, form fallback, email signature alignment.
**Used in:** Footer, Contato.
**Requirements:** Official email and phone.

### CNT-010 — Hero headline claim
**Type:** Claim / copy
**Status:** Awaiting client (Milton Chagas)
**Impact:** "Projetos que passam na primeira análise" implies a result the repo has no evidence for. It dates from the initial commit, before the client copy commit.
**Used in:** Hero H1.
**Requirements:** Client confirms and can support the claim. Otherwise use "Projetos de PPCI, do dimensionamento à aprovação no CBMSC" (see DEC-015). Also confirm the superlative "menor custo de obra" in the subhead.

### CNT-011 — Typeface sign-off
**Type:** Brand
**Status:** Awaiting client
**Impact:** The site renders Archivo / Archivo Narrow / Inter, while the brand manual and `DESIGN_SYSTEM.md` specify Montserrat / Barlow Condensed / Inter.
**Used in:** Whole site (`app/layout.tsx`, `app/globals.css`).
**Requirements:** Approve Archivo and update the docs, or return to the manual's fonts.
