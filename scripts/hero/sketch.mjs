/**
 * Shared toolkit for the hero's sketch scenes (rough.js, build time only).
 *
 * A scene script builds Layers of pencil linework plus one red ink network, then
 * calls writeScene(). Static layers go to public/hero/<variant>-<layer>.svg (cached,
 * kept out of the HTML); the network stays inline so its CSS draw-in animation
 * and prefers-reduced-motion keep working.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import rough from "roughjs";

export const WIDTH = 1600;
export const HEIGHT = 900;
export const BACKGROUND = "#07212b"; // --color-brand-drench
export const LINE = "#dbe7ec";
export const RED = "#d62828"; // --color-accent

/**
 * Where the page puts things over the scene on a 1440×900 desktop, in viewBox
 * coordinates (the scene is anchored bottom-right, so screen x = viewBox x − 160).
 * Keep busy detail out of COPY and NAV; the credentials block covers CREDENTIALS.
 */
export const ZONES = {
  NAV: { x: [380, 1520], y: [0, 86] },
  COPY: { x: [230, 900], y: [250, 800] },
  CREDENTIALS: { x: [1100, 1520], y: [600, 800] },
};

const gen = rough.generator();
let seedCounter = 1;
export function reseed(seed) {
  seedCounter = seed;
}

const BASE = { roughness: 0.9, bowing: 0.8, preserveVertices: false };
const opts = (o = {}) => ({ ...BASE, ...o, seed: seedCounter++ });

// One decimal is plenty at this scale and keeps the files small.
const tidy = (d) => d.replace(/-?\d+\.\d+/g, (n) => String(Math.round(+n * 10) / 10));
const paths = (drawable) =>
  gen
    .toPaths(drawable)
    .map((p) => tidy(p.d))
    .join("");

/* ------------------------------------------------------------ rough shapes */
// All return path data (`d`). Points are [x, y] in viewBox coordinates.

export const line = ([ax, ay], [bx, by], o) => paths(gen.line(ax, ay, bx, by, opts(o)));

/** Line extended past both ends by `reach` px, like a drafter overshooting. */
export function overshoot([ax, ay], [bx, by], reach = 8, o) {
  const len = Math.hypot(bx - ax, by - ay) || 1;
  const ux = ((bx - ax) / len) * reach;
  const uy = ((by - ay) / len) * reach;
  return line([ax - ux, ay - uy], [bx + ux, by + uy], o);
}

export const polyline = (points, o) => paths(gen.linearPath(points, opts(o)));
export const polygon = (points, o) => paths(gen.polygon(points, opts(o)));
export const rect = (x, y, w, h, o) => paths(gen.rectangle(x, y, w, h, opts(o)));
export const circle = (cx, cy, diameter, o) => paths(gen.circle(cx, cy, diameter, opts(o)));
export const ellipse = (cx, cy, w, h, o) => paths(gen.ellipse(cx, cy, w, h, opts(o)));
export const curve = (points, o) => paths(gen.curve(points, opts(o)));
export const arc = (cx, cy, w, h, start, stop, o) =>
  paths(gen.arc(cx, cy, w, h, start, stop, false, opts(o)));

/**
 * Hatching inside a polygon, outline excluded. `gap` is the spacing in px,
 * `angle` in degrees. fillStyle can be 'hachure', 'cross-hatch', 'zigzag', 'dots'.
 */
export const hatch = (points, { gap = 6, angle = -41, fillStyle = "hachure", ...o } = {}) =>
  paths(
    gen.polygon(
      points,
      opts({
        stroke: "none",
        fill: "x",
        fillStyle,
        hachureGap: gap,
        hachureAngle: angle,
        fillWeight: 1,
        disableMultiStrokeFill: true,
        ...o,
      })
    )
  );

/** Crisp (non-rough) helpers, for fills that mask what's behind. */
export const solid = (points) =>
  `M${points.map(([x, y]) => `${Math.round(x * 10) / 10} ${Math.round(y * 10) / 10}`).join("L")}Z`;

/* ------------------------------------------------------------------ layers */

export class Layer {
  constructor(name, { delay = 0 } = {}) {
    this.name = name;
    this.delay = delay;
    this.items = [];
  }
  /** Pencil stroke. Consecutive strokes with the same style merge into one path. */
  stroke(d, { opacity = 0.4, width = 1, dash } = {}) {
    if (!d) return this;
    const key = `s|${opacity}|${width}|${dash ?? ""}`;
    const last = this.items.at(-1);
    if (last?.key === key) last.d += d;
    else this.items.push({ key, kind: "stroke", d, opacity, width, dash });
    return this;
  }
  /** Solid fill (e.g. the background colour to hide what's behind). */
  fill(d, { color = BACKGROUND, opacity = 1 } = {}) {
    if (!d) return this;
    const key = `f|${color}|${opacity}`;
    const last = this.items.at(-1);
    if (last?.key === key) last.d += d;
    else this.items.push({ key, kind: "fill", d, color, opacity });
    return this;
  }
  markup() {
    return this.items
      .map((item) =>
        item.kind === "fill"
          ? `<path fill="${item.color}"${item.opacity === 1 ? "" : ` fill-opacity="${item.opacity}"`} stroke="none" d="${item.d}"/>`
          : `<path stroke-opacity="${item.opacity}" stroke-width="${item.width}"${item.dash ? ` stroke-dasharray="${item.dash}"` : ""} d="${item.d}"/>`
      )
      .join("");
  }
}

/* ----------------------------------------------------------------- network */

/**
 * The red ink network. Paths are added in reveal order; `step` sets the delay
 * (start + step × stepMs). `draw` traces the stroke in, `fade` fades it in.
 */
export class Network {
  constructor({ startMs = 900, stepMs = 110, opacity = 0.85 } = {}) {
    Object.assign(this, { startMs, stepMs, opacity });
    this.items = [];
  }
  draw(d, step, { width = 1.4, dash } = {}) {
    // .hero-draw animates stroke-dasharray, which would erase a dash pattern,
    // so dashed lines fade in instead.
    if (d) this.items.push({ cls: dash ? "hero-fade" : "hero-draw", d, step, width, dash, pathLength: !dash });
    return this;
  }
  fade(d, step, { width = 1.4, dash, fill } = {}) {
    if (d) this.items.push({ cls: "hero-fade", d, step, width, dash, fill });
    return this;
  }
  markup() {
    const inner = this.items
      .map(({ cls, d, step, width, dash, fill, pathLength }) => {
        const delay = Math.round(this.startMs + step * this.stepMs);
        return `<path class="${cls}"${pathLength ? ' pathLength="1"' : ""} stroke-width="${width}"${dash ? ` stroke-dasharray="${dash}"` : ""}${fill ? ` fill="${RED}" fill-opacity="${fill}"` : ""} style="animation-delay:${delay}ms" d="${d}"/>`;
      })
      .join("");
    return `<g stroke="${RED}" stroke-opacity="${this.opacity}">${inner}</g>`;
  }
}

/* ------------------------------------------------------------------ output */

const svgFile = (body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="${WIDTH}" height="${HEIGHT}" preserveAspectRatio="xMaxYMax slice" fill="none" stroke="${LINE}" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

/**
 * Writes public/hero/<variant>-<layer>.svg for each layer and
 * components/sections/hero-scenes/<variant>.generated.ts for the page.
 */
export function writeScene(variant, { layers, network }) {
  mkdirSync("public/hero", { recursive: true });
  mkdirSync("components/sections/hero-scenes", { recursive: true });

  const report = [];
  const entries = layers.map((layer) => {
    const file = `${variant}-${layer.name}.svg`;
    const body = svgFile(layer.markup());
    writeFileSync(`public/hero/${file}`, body);
    report.push([file, body]);
    return { src: `/hero/${file}`, delay: layer.delay };
  });

  const networkMarkup = network.markup();
  const source = `// Generated by scripts/hero/${variant}.mjs. Edit the script, not this file.
import type { SketchScene } from "../SketchScene";

export const scene: SketchScene = ${JSON.stringify(
    { viewBox: `0 0 ${WIDTH} ${HEIGHT}`, layers: entries, network: networkMarkup },
    null,
    2
  )};
`;
  writeFileSync(`components/sections/hero-scenes/${variant}.generated.ts`, source);
  report.push([`network (inline)`, networkMarkup]);

  for (const [name, text] of report) {
    const kb = (n) => `${Math.round(n / 102.4) / 10} KB`;
    console.log(`${name.padEnd(28)} ${kb(text.length).padStart(9)} raw  ${kb(gzipSync(text).length).padStart(8)} gz`);
  }
}
