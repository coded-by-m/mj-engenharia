import type { ReactNode } from "react";

/**
 * Technical badge — Barlow Condensed, uppercase (e.g. PPCI, SPDA, NBR 5419, CREA).
 */
export function Tag({
  children,
  inverse = false,
}: {
  children: ReactNode;
  inverse?: boolean;
}) {
  return (
    <span
      className={`font-condensed inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
        inverse
          ? "bg-white/10 text-white"
          : "bg-mist-50 text-brand ring-1 ring-line"
      }`}
    >
      {children}
    </span>
  );
}
