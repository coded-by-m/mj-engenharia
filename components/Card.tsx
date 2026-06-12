import type { ReactNode } from "react";
import { Icon } from "./Icon";

/**
 * Service / segment / differentiator card.
 * Icon (brand SVG) + title + one-liner, with refined hover elevation.
 */
export function Card({
  icon,
  title,
  children,
  className = "",
}: {
  icon?: string;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group relative flex flex-col gap-3 rounded-[var(--radius-md)] border border-line bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md ${className}`}
    >
      {icon && (
        <span className="text-brand transition-colors duration-200 group-hover:text-accent">
          <Icon name={icon} size={40} />
        </span>
      )}
      <h3 className="text-lg text-brand-deep">{title}</h3>
      {children && (
        <p className="text-sm leading-relaxed text-muted">{children}</p>
      )}
    </div>
  );
}
