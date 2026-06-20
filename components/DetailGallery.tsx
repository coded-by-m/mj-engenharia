"use client";

import Image from "next/image";
import { useState } from "react";

type Detail = { src: string; label: string };

/**
 * Supporting equipment/valve renders. Shows one detail large with its caption;
 * when there's more than one, a thumbnail row swaps the active image inline
 * (no modal/lightbox).
 */
export function DetailGallery({ items }: { items: readonly Detail[] }) {
  const [active, setActive] = useState(0);
  if (items.length === 0) return null;
  const current = items[active] ?? items[0];

  return (
    <figure className="mt-4">
      <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-md)] border border-line bg-brand-drench">
        <Image
          src={current.src}
          alt={current.label}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
        />
      </div>

      <div className="mt-2 flex items-center justify-between gap-4">
        <figcaption className="text-sm text-muted">{current.label}</figcaption>

        {items.length > 1 && (
          <div className="flex gap-2">
            {items.map((item, i) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Ver: ${item.label}`}
                aria-pressed={i === active}
                className={`relative h-10 w-16 overflow-hidden rounded-[var(--radius-sm)] border transition-colors ${
                  i === active
                    ? "border-accent"
                    : "border-line hover:border-brand-deep/40"
                }`}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </figure>
  );
}
