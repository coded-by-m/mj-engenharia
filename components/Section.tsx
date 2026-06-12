import type { ReactNode } from "react";

/**
 * Consistent section wrapper with vertical rhythm + background variants.
 */
export function Section({
  id,
  children,
  variant = "light",
  className = "",
}: {
  id?: string;
  children: ReactNode;
  variant?: "light" | "alt" | "navy";
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
      className={`scroll-mt-24 py-20 sm:py-24 lg:py-28 ${bg} ${className}`}
    >
      <div className="container-site">{children}</div>
    </section>
  );
}
