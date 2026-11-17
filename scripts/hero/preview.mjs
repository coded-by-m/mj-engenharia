/**
 * Renders a scene to PNG for quick review, without a browser: all layers plus
 * the network in its final state, under an approximation of the desktop scrim,
 * with grey blocks where the hero copy, nav and credentials sit.
 *
 * Run: node scripts/hero/preview.mjs <variant> [out.png] [--bare]
 *   --bare  skip the scrim and copy mock (to inspect the drawing alone)
 */
import { readFileSync } from "node:fs";
import sharp from "sharp";
import { BACKGROUND, HEIGHT, LINE, WIDTH } from "./sketch.mjs";

const [variant, outArg, ...flags] = process.argv.slice(2).filter(Boolean);
if (!variant) throw new Error("usage: node scripts/hero/preview.mjs <variant> [out.png] [--bare]");
const bare = flags.includes("--bare") || outArg === "--bare";
const out = outArg && outArg !== "--bare" ? outArg : `.playwright-mcp/preview-${variant}.png`;

const ts = readFileSync(`components/sections/hero-scenes/${variant}.generated.ts`, "utf8");
const scene = JSON.parse(ts.slice(ts.indexOf("= {") + 2, ts.lastIndexOf("};") + 1));

const inner = (svg) => svg.slice(svg.indexOf(">") + 1, svg.lastIndexOf("</svg>"));
const layers = scene.layers
  .map(({ src }) => `<g>${inner(readFileSync(`public${src}`, "utf8"))}</g>`)
  .join("");
const network = scene.network.replace(/ class="[^"]*"/g, "").replace(/ pathLength="1"/g, "");

// Approximates .hero-scrim at lg, and the copy layout at a 1440×900 viewport.
const scrim = `
<defs>
  <linearGradient id="up" x1="0" y1="1" x2="0" y2="0">
    <stop offset="0" stop-color="${BACKGROUND}"/><stop offset=".12" stop-color="${BACKGROUND}" stop-opacity=".45"/><stop offset=".3" stop-color="${BACKGROUND}" stop-opacity="0"/>
  </linearGradient>
  <radialGradient id="copy" cx="${160 + 0.2 * 1440}" cy="${0.74 * HEIGHT}" r="1" gradientUnits="userSpaceOnUse"
    gradientTransform="translate(${160 + 0.2 * 1440} ${0.74 * HEIGHT}) scale(${0.52 * 1440} ${0.58 * HEIGHT}) translate(${-(160 + 0.2 * 1440)} ${-(0.74 * HEIGHT)})">
    <stop offset="0" stop-color="${BACKGROUND}"/><stop offset=".45" stop-color="${BACKGROUND}" stop-opacity=".9"/><stop offset=".85" stop-color="${BACKGROUND}" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="left" x1="160" y1="0" x2="${160 + 1440}" y2="0" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="${BACKGROUND}" stop-opacity=".6"/><stop offset=".5" stop-color="${BACKGROUND}" stop-opacity="0"/>
  </linearGradient>
</defs>
<rect width="${WIDTH}" height="${HEIGHT}" fill="url(#up)"/>
<rect width="${WIDTH}" height="${HEIGHT}" fill="url(#copy)"/>
<rect width="${WIDTH}" height="${HEIGHT}" fill="url(#left)"/>
<g fill="#ffffff">
  <rect x="237" y="320" width="480" height="62" opacity=".9"/>
  <rect x="237" y="398" width="420" height="62" opacity=".9"/>
  <rect x="237" y="476" width="640" height="62" opacity=".9"/>
  <rect x="237" y="575" width="550" height="110" opacity=".35"/>
  <rect x="237" y="732" width="270" height="52" fill="#d62828"/>
  <rect x="240" y="20" width="110" height="40" opacity=".8"/>
  <rect x="545" y="30" width="530" height="20" opacity=".55"/>
  <rect x="1271" y="20" width="238" height="40" fill="#d62828"/>
  <rect x="1111" y="610" width="398" height="1" opacity=".3"/>
  <rect x="1111" y="635" width="380" height="140" opacity=".22"/>
</g>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
<rect width="${WIDTH}" height="${HEIGHT}" fill="${BACKGROUND}"/>
<g fill="none" stroke="${LINE}" stroke-linecap="round" stroke-linejoin="round">${layers}${network}</g>
${bare ? "" : scrim}
${bare ? "" : `<rect x="160" y="0" width="1440" height="${HEIGHT}" fill="none" stroke="#ffcc00" stroke-opacity=".5" stroke-dasharray="6 6"/>`}
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log(`wrote ${out}`);
