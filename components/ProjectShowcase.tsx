"use client";

import Image from "next/image";
import { useState } from "react";
import { ProjectCompare } from "./ProjectCompare";
import { SystemsList } from "./SystemsList";
import type { projects } from "@/lib/site";

type Project = (typeof projects)[number];

/**
 * One project block. A single media viewer carries every visual: slide 0 is the
 * interactive Arquitetura/PPCI x-ray slider, the rest are equipment/valve
 * renders. Overlay arrows page through them; the labeled thumbnails in the info
 * column double as jump-nav and anchor its bottom (keeps the columns balanced).
 */
export function ProjectShowcase({
  project: p,
  index,
}: {
  project: Project;
  index: number;
}) {
  const imageRight = index % 2 === 1;
  const photos = p.details;
  const total = 1 + photos.length;
  const [active, setActive] = useState(0); // 0 = x-ray slider
  const go = (n: number) => setActive((a) => (a + n + total) % total);

  const caption =
    active === 0
      ? "Arraste a barra para revelar o sistema preventivo"
      : photos[active - 1].label;

  return (
    <article className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
      {/* Visual column — the unified media viewer */}
      <div
        className={`lg:col-span-7 ${imageRight ? "lg:order-2" : "lg:order-1"}`}
      >
        <div className="relative">
          {active === 0 ? (
            <ProjectCompare
              before={p.images.arq}
              after={p.images.xray}
              alt={{ before: p.alt.arq, after: p.alt.ppci }}
              sizes="(max-width: 1024px) 100vw, 58vw"
              priority={index === 0}
            />
          ) : (
            <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-lg)] border border-line bg-brand-drench">
              <Image
                src={photos[active - 1].src}
                alt={photos[active - 1].label}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          )}

          {total > 1 && (
            <>
              <MediaArrow side="left" onClick={() => go(-1)} />
              <MediaArrow side="right" onClick={() => go(1)} />
            </>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="text-sm text-muted">{caption}</p>
          <span className="idx shrink-0 text-sm text-muted">
            {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Info column — content top, media nav anchored bottom */}
      <div
        className={`flex h-full flex-col justify-between gap-10 lg:col-span-5 ${
          imageRight ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <div>
          <p className="idx text-sm text-muted">
            Projeto {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-1 text-2xl text-brand-deep lg:text-[1.75rem]">
            {p.name}
          </h3>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-6">
            <div className="col-span-2">
              <dt className="kicker text-muted">Ocupação</dt>
              <dd className="mt-1 text-brand-deep">{p.occupancy}</dd>
            </div>
            <div>
              <dt className="kicker text-muted">Área de projeto</dt>
              <dd className="mt-1 text-brand-deep">{p.area}</dd>
            </div>
            <div>
              <dt className="kicker text-muted">Pavimentos</dt>
              <dd className="mt-1 text-brand-deep">{p.floors}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <SystemsList
              highlight={p.systems.highlight}
              rest={p.systems.rest}
            />
          </div>
        </div>

        {total > 1 && (
          <div>
            <p className="kicker mb-3 text-muted">Mídias do projeto</p>
            <div className="flex flex-wrap gap-3">
              <MediaThumb
                src={p.images.xray}
                label="Raio-X"
                active={active === 0}
                onClick={() => setActive(0)}
              />
              {photos.map((d, k) => (
                <MediaThumb
                  key={d.src}
                  src={d.src}
                  label={d.label}
                  active={active === k + 1}
                  onClick={() => setActive(k + 1)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

function MediaArrow({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Mídia anterior" : "Próxima mídia"}
      className={`absolute top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-brand-deep/75 text-white backdrop-blur-sm transition-transform hover:scale-105 focus-visible:scale-105 ${
        side === "left" ? "left-3" : "right-3"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d={side === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function MediaThumb({
  src,
  label,
  active,
  onClick,
}: {
  src: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Ver: ${label}`}
      aria-current={active}
      className="group/thumb w-24 text-left"
    >
      <div
        className={`relative aspect-[16/10] overflow-hidden rounded-[var(--radius-sm)] border bg-brand-drench transition-colors ${
          active
            ? "border-accent"
            : "border-line group-hover/thumb:border-brand-deep/40"
        }`}
      >
        <Image src={src} alt="" fill sizes="96px" className="object-cover" />
      </div>
      <span
        className={`mt-1.5 block truncate text-xs transition-colors ${
          active ? "text-brand-deep" : "text-muted"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
