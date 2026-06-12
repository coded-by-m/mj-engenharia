import type { ReactNode } from "react";

/**
 * Numbered section header — engineering-dossier index system.
 * Left-aligned, oversize display, a tabular index numeral + short kicker.
 * Replaces the repeated tiny-eyebrow grammar.
 */
export function SectionHeader({
  num,
  kicker,
  title,
  children,
  inverse = false,
  className = "",
}: {
  num: string;
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
  inverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <div
        className={`flex items-center gap-3 ${
          inverse ? "text-white/60" : "text-muted"
        }`}
      >
        <span className="idx text-sm text-accent">{num}</span>
        <span className="hairline w-10" />
        <span className="kicker">{kicker}</span>
      </div>
      <h2
        className={`display display-lg mt-5 ${inverse ? "text-white" : "text-brand-deep"}`}
      >
        {title}
      </h2>
      {children && (
        <p
          className={`mt-5 max-w-2xl text-lg leading-relaxed ${
            inverse ? "text-grey-200/85" : "text-muted"
          }`}
        >
          {children}
        </p>
      )}
    </div>
  );
}
