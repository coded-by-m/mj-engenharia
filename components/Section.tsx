import type { ReactNode } from "react";

/**
 * Consistent section wrapper with background variants and a vertical-rhythm
 * scale. `space` is not decoration: alternating tight/default/loose across the
 * page gives the scroll a deliberate beat instead of one monotone cadence.
 */
const spacing = {
  tight: "py-14 sm:py-16 lg:py-20",
  default: "py-20 sm:py-24 lg:py-28",
  loose: "py-28 sm:py-36 lg:py-44",
} as const;

export function Section({
  id,
  children,
  variant = "light",
  space = "default",
  className = "",
}: {
  id?: string;
  children: ReactNode;
  variant?: "light" | "alt" | "navy";
  space?: keyof typeof spacing;
  className?: string;
}) {
  const bg =
    variant === "navy"
      ? "bg-brand-deep text-white"
      : variant === "alt"
        ? "bg-surface-alt"
        : "bg-surface";
  return (
    <section
      id={id}
      className={`scroll-mt-24 ${spacing[space]} ${bg} ${className}`}
    >
      <div className="container-site">{children}</div>
    </section>
  );
}
