import type { CSSProperties } from "react";

/**
 * Renders a brand line icon from /public/icons/<name>.svg.
 * Uses CSS mask so the icon inherits `currentColor` (tintable on hover).
 */
export function Icon({
  name,
  size = 32,
  className = "",
  title,
}: {
  name: string;
  size?: number;
  className?: string;
  title?: string;
}) {
  const style: CSSProperties = {
    width: size,
    height: size,
    backgroundColor: "currentColor",
    WebkitMaskImage: `url(/icons/${name}.svg)`,
    maskImage: `url(/icons/${name}.svg)`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    display: "inline-block",
    flexShrink: 0,
  };
  return (
    <span
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={className}
      style={style}
    />
  );
}
