import Image from "next/image";

type Detail = { src: string; label: string };

/**
 * Supporting equipment/valve renders shown as a compact strip. With at most two
 * details per project, both stay visible at once — no swap, no lightbox. Anchors
 * the bottom of the info column to balance the taller viewer beside it.
 */
export function DetailGallery({ items }: { items: readonly Detail[] }) {
  if (items.length === 0) return null;
  const single = items.length === 1;

  return (
    <div>
      <p className="kicker mb-3 text-muted">Detalhamento</p>
      <div className={`grid gap-3 ${single ? "grid-cols-1" : "grid-cols-2"}`}>
        {items.map((item) => (
          <figure key={item.src}>
            <div
              className={`relative overflow-hidden rounded-[var(--radius-md)] border border-line bg-brand-drench ${
                single ? "aspect-[16/9]" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                sizes="(max-width: 1024px) 50vw, 22vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-1.5 text-xs text-muted">
              {item.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
