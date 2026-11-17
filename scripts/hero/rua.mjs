/**
 * Hero scene · street canyon (DEC-017), redrawn in vector from the developer's
 * reference (design/hero/referencia-rua.png): curtain-wall towers in one-point
 * perspective from a low eye, with the corner building's fire-protection system
 * in red. Illustrative only, not a client project.
 *
 * Clean CAD linework (no rough.js): each main line is drawn twice, a wide faint
 * pass under a thin one, for the reference's soft glow. Buildings left of the
 * vanishing point sit behind the hero copy and are drawn fainter.
 *
 * Writes public/hero/rua-*.svg + components/sections/hero-scenes/rua.generated.ts
 * Run: node scripts/hero/rua.mjs   ·   Preview: node scripts/hero/preview.mjs rua
 */
import { HEIGHT, Layer, Network, WIDTH, writeScene } from "./sketch.mjs";

/* -------------------------------------------------------------- projection */

// One-point perspective: x across the street (0 = centre line), y depth, z up.
const VP = { x: 700, y: 830 };
const EYE = 1.3;
const F = 982;
const project = ([x, y, z]) => [VP.x + (F * x) / y, VP.y - (F * (z - EYE)) / y];

const round = (v) => Math.round(v * 10) / 10;

/** Liang-Barsky against the canvas plus a margin. */
function clip([ax, ay], [bx, by], margin = 12) {
  const dx = bx - ax;
  const dy = by - ay;
  let t0 = 0;
  let t1 = 1;
  for (const [p, q] of [
    [-dx, ax + margin],
    [dx, WIDTH + margin - ax],
    [-dy, ay + margin],
    [dy, HEIGHT + margin - ay],
  ]) {
    if (p === 0) {
      if (q < 0) return null;
      continue;
    }
    const r = q / p;
    if (p < 0) {
      if (r > t1) return null;
      t0 = Math.max(t0, r);
    } else {
      if (r < t0) return null;
      t1 = Math.min(t1, r);
    }
  }
  return [
    [ax + dx * t0, ay + dy * t0],
    [ax + dx * t1, ay + dy * t1],
  ];
}

/** Straight 3D segment → clipped path data. */
function seg(a, b) {
  const c = clip(project(a), project(b));
  if (!c) return "";
  return `M${round(c[0][0])} ${round(c[0][1])}L${round(c[1][0])} ${round(c[1][1])}`;
}
/** Open polyline through 3D points. */
const path = (...pts) => pts.slice(0, -1).map((p, i) => seg(p, pts[i + 1])).join("");
/** Closed polygon (unclipped; for fills and small symbols). */
const poly = (pts) => `M${pts.map((p) => project(p).map(round).join(" ")).join("L")}Z`;
/** Circle of radius r in the plane facing the viewer (y = const). */
const ringY = ([cx, cy, cz], r, n = 16) =>
  poly(Array.from({ length: n }, (_, i) => [cx + Math.cos((i / n) * 2 * Math.PI) * r, cy, cz + Math.sin((i / n) * 2 * Math.PI) * r]));

/* ------------------------------------------------------------------ styles */

// Opacity per line role and distance level (0 = the corner building).
const ROLE = {
  edge: [0.3, 0.22, 0.12],
  column: [0.24, 0.17, 0.08],
  slab: [0.2, 0.14, 0.07],
  mullion: [0.13, 0.07, 0],
  transom: [0.09, 0.05, 0],
  door: [0.14, 0.08, 0],
};
const WIDTHS = { edge: 0.8, column: 0.7, slab: 0.65, mullion: 0.5, transom: 0.45, door: 0.5 };
const GLOW = { edge: true, column: true, slab: true };

const FLOOR_H = 3.4;
const GROUND_H = 4.5;

/** Strokes for one building, bucketed by role, emitted glow first. */
function emit(layer, buckets, level, fade) {
  for (const role of Object.keys(GLOW)) {
    const o = ROLE[role][level] * fade;
    if (buckets[role] && o) layer.stroke(buckets[role], { opacity: round(o * 0.14 * 100) / 100, width: 2.4 });
  }
  for (const role of Object.keys(ROLE)) {
    const o = ROLE[role][level] * fade;
    if (buckets[role] && o > 0.01) layer.stroke(buckets[role], { opacity: Math.round(o * 1000) / 1000, width: WIDTHS[role] });
  }
}

/**
 * One visible face. `at(u, z)` maps a position on the face to 3D; u runs from
 * u0 to u1 along the face. Curtain wall: spandrel bands, paired columns per
 * bay, mullions per module, a sill transom per floor, a glazed ground floor.
 */
function face(b, at, [u0, u1], { top, floors, ground, fh, module, bay, level, doors }) {
  b.edge += seg(at(u0, 0), at(u0, top)) + seg(at(u1, 0), at(u1, top)) + seg(at(u0, top), at(u1, top)) + seg(at(u0, 0), at(u1, 0));
  b.edge += seg(at(u0, top - 0.55), at(u1, top - 0.55)); // parapet coping

  for (let k = 0; k < floors; k++) {
    const z = ground + k * fh;
    b.slab += seg(at(u0, z), at(u1, z));
    if (level < 2) b.slab += seg(at(u0, z + 0.7), at(u1, z + 0.7)); // spandrel band
    if (level === 0) b.transom += seg(at(u0, z + 1.75), at(u1, z + 1.75)); // sill line
  }
  if (level < 2) b.slab += seg(at(u0, ground - 0.6), at(u1, ground - 0.6)); // canopy fascia

  const span = u1 - u0;
  const bays = Math.max(1, Math.round(span / bay));
  for (let i = 1; i < bays; i++) {
    const u = u0 + (span * i) / bays;
    if (level < 2) b.column += seg(at(u - 0.22, 0), at(u - 0.22, top)) + seg(at(u + 0.22, 0), at(u + 0.22, top));
    else b.column += seg(at(u, 0), at(u, top));
  }
  if (level === 2) return;

  // Mullions per module, between the columns; storefront mullions below.
  const per = Math.max(2, Math.round(span / bays / module));
  for (let i = 0; i < bays; i++) {
    for (let j = 1; j < per; j++) {
      const u = u0 + (span * (i + j / per)) / bays;
      b.mullion += seg(at(u, ground), at(u, top - 0.55));
      b.door += seg(at(u, 0), at(u, ground - 0.6));
    }
  }
  b.door += seg(at(u0, 3.1), at(u1, 3.1)); // storefront transom

  // Double doors centred in some ground-floor bays.
  for (const i of doors ?? []) {
    if (i >= bays) continue;
    const c = u0 + (span * (i + 0.5)) / bays;
    b.door +=
      path(at(c - 1, 0), at(c - 1, 2.4), at(c + 1, 2.4), at(c + 1, 0)) +
      seg(at(c, 0), at(c, 2.4)) +
      seg(at(c - 0.18, 1.0), at(c - 0.18, 1.35)) +
      seg(at(c + 0.18, 1.0), at(c + 0.18, 1.35));
  }
}

/** A building on either side of the street: its front face and its street face. */
function building(layer, spec) {
  const { x: [x0, x1], y: [y0, y1], floors, level = 1, fade = 1, ground = GROUND_H, fh = FLOOR_H } = spec;
  const top = ground + floors * fh;
  const streetX = x0 > 0 ? x0 : x1;
  const opts = { top, floors, ground, fh, module: spec.module ?? 1.5, bay: spec.bay ?? 6, level };

  layer.fill(
    poly([[x0, y0, 0], [x1, y0, 0], [x1, y0, top], [x0, y0, top]]) +
      poly([[streetX, y0, 0], [streetX, y1, 0], [streetX, y1, top], [streetX, y0, top]]),
    { opacity: 0.96 }
  );
  const b = { edge: "", column: "", slab: "", mullion: "", transom: "", door: "" };
  face(b, (u, z) => [u, y0, z], [x0, x1], { ...opts, doors: spec.frontDoors });
  face(b, (u, z) => [streetX, u, z], [y0, y1], { ...opts, doors: spec.streetDoors });
  emit(layer, b, level, fade);
}

/* -------------------------------------------------------------------- city */

const far = new Layer("far");
const mid = new Layer("mid", { delay: 150 });
const near = new Layer("near", { delay: 300 });

/** Deterministic pseudo-random, so the skyline is stable between runs. */
let seed = 21;
const rand = () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);

// The street: curbs, building lines and lane markings converging on the VP.
{
  let d = "";
  for (const x of [-11, -7, 7, 11]) d += seg([x, 14, 0], [x, 2000, 0]);
  far.stroke(d, { opacity: 0.16, width: 0.9 });
  let lanes = "";
  for (let y = 16; y < 900; y *= 1.18) lanes += seg([0, y, 0], [0, y * 1.08, 0]);
  for (const x of [-3.5, 3.5]) lanes += seg([x, 14, 0], [x, 2000, 0]);
  far.stroke(lanes, { opacity: 0.08, width: 0.8 });
}

// The canyon, far to near on both sides. Left-side buildings sit behind the copy.
const LEFT_FADE = 0.42;
const blocks = [];
for (const side of [-1, 1]) {
  let y = side > 0 ? 62 : 48;
  while (y < 1100) {
    const depth = 16 + rand() * 16;
    const setback = rand() < 0.3 ? 0.8 : 0;
    const floors = Math.round(5 + rand() * (y < 200 ? 6 : 9));
    const inner = 11 + setback;
    const outer = inner + 20 + rand() * 18;
    blocks.push({
      x: side > 0 ? [inner, outer] : [-outer, -inner],
      y: [y, y + depth],
      floors,
      level: y < 150 ? 1 : 2,
      fade: side < 0 ? LEFT_FADE : 1,
      streetDoors: [0, 2],
    });
    y += depth + 3 + rand() * 4;
  }
}
// The near left tower, cropped by the frame like the reference's.
blocks.push({ x: [-52, -11], y: [17, 44], floors: 10, level: 1, fade: LEFT_FADE * 0.85, streetDoors: [1, 3] });

blocks.sort((a, b) => b.y[0] - a.y[0]);
for (const spec of blocks) building(spec.y[0] >= 150 ? far : mid, spec);

/* ------------------------------------------------- the corner building (PPCI) */

const MAIN = { x: [11, 46], y: [30, 58], floors: 5, level: 0, frontDoors: [3, 5], streetDoors: [2] };
const MAIN_TOP = GROUND_H + MAIN.floors * FLOOR_H;
const FRONT_Y = MAIN.y[0];
const zf = (k) => (k === 0 ? 0 : GROUND_H + (k - 1) * FLOOR_H); // floor level k
const ceilZ = (k) => (k === 0 ? GROUND_H : zf(k) + FLOOR_H) - 0.75;

// Roof reservoir raised on a plinth, drawn before the building so the facade
// hides what sits below the roof edge.
// Its top stays below the nav (viewBox y ≈ 110).
const TANK = { x: [12.4, 18.4], y: [30.6, 35], z: [MAIN_TOP + 0.9, MAIN_TOP + 2.6] };
{
  const [x0, x1] = TANK.x;
  const [y0, y1] = TANK.y;
  const [z0, z1] = TANK.z;
  let legs = "";
  for (const x of [x0 + 0.4, (x0 + x1) / 2, x1 - 0.4]) legs += seg([x, y0, MAIN_TOP], [x, y0, z0]);
  near.stroke(legs + seg([x0, y0, z0 - 0.3], [x1, y0, z0 - 0.3]), { opacity: 0.2, width: 0.6 });
  near.fill(poly([[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]]) + poly([[x0, y0, z0], [x0, y1, z0], [x0, y1, z1], [x0, y0, z1]]));
  const outline = path([x0, y1, z1], [x0, y0, z1], [x1, y0, z1], [x1, y0, z0]) + seg([x0, y0, z1], [x0, y0, z0]) + seg([x0, y1, z1], [x0, y1, z0]);
  near.stroke(outline, { opacity: 0.04, width: 2.4 }).stroke(outline, { opacity: 0.26, width: 0.75 });
  near.stroke(seg([x0 + 0.6, y0, z1 + 0.5], [x0 + 0.6, y0, z1]) + seg([x1 - 1, y0, z1], [x1 - 1, y0, z1 + 0.35]), { opacity: 0.18, width: 0.6 });
}
building(near, MAIN);

/* ----------------------------------------------------------------- network */

// Drawn like a PPCI isometric: pipework only, no pictograms. Heads are dots,
// hydrant outlets small open boxes, the alarm valve a bow-tie.
const net = new Network({ startMs: 900, stepMs: 95, opacity: 0.78 });

// Risers in the corner shaft, just behind the glass of the front face.
const RY = FRONT_Y + 0.5;
const HYD_X = 11.75;
const SPK_X = 12.35;
// Sprinkler grid under each slab, seen from below: branch lines run parallel to
// the facade at three depths (ladder rungs on screen), fed by a cross main that
// runs back from the riser. Heads are dots every HEAD_STEP metres.
const BRANCH_YS = [RY + 0.6, RY + 3.6, RY + 6.6];
const BRANCH_X = [SPK_X, 45];
const HEAD_STEP = 3;
const dots = (pts) => pts.map((p) => project(p).map(round)).map(([x, y]) => `M${x} ${y}h.01`).join("");

// Step 0: the brigade's siamese connection on the street face by the corner,
// with its buried feed to the riser foot.
{
  const sy = 31.6;
  net.fade(path([11, sy, 0.5], [11, sy + 0.9, 0.5], [11, sy + 0.9, 1.2], [11, sy, 1.2], [11, sy, 0.5]), 0, { width: 0.9 });
  net.draw(path([11, sy + 0.45, 0.5], [11, sy + 0.45, -0.35], [HYD_X, RY, -0.35], [HYD_X, RY, 0.2]), 0, { width: 1, dash: "4 3" });
}

// Step 1: alarm valve at the foot of the sprinkler riser; then both risers climb.
{
  const z = 1.3;
  const s = 0.26;
  net.draw(path([HYD_X, RY, 0.2], [SPK_X, RY, 0.2], [SPK_X, RY, z - s]), 1, { width: 1 });
  net.fade(path([SPK_X - s, RY, z - s], [SPK_X + s, RY, z + s], [SPK_X - s, RY, z + s], [SPK_X + s, RY, z - s], [SPK_X - s, RY, z - s]), 1, { width: 0.9 });
  net.draw(seg([HYD_X, RY, 0.2], [HYD_X, RY, MAIN_TOP + 0.4]), 2, { width: 1.4 });
  net.draw(seg([SPK_X, RY, z + s], [SPK_X, RY, ceilZ(MAIN.floors) - 0.15]), 2, { width: 1.2 });
}

// Per floor, bottom up: a hydrant outlet off the riser, then the sprinkler
// cross main along the front with its sub-mains running back, heads as dots.
for (let k = 0; k <= MAIN.floors; k++) {
  const step = 3 + k * 1;
  const bz = ceilZ(k) - 0.15;

  if (k > 0) {
    const hz = zf(k) + 1.3;
    net.draw(seg([HYD_X, RY, hz], [HYD_X + 0.9, RY, hz]), step, { width: 0.9 });
    net.fade(path([HYD_X + 0.9, RY, hz - 0.35], [HYD_X + 1.8, RY, hz - 0.35], [HYD_X + 1.8, RY, hz + 0.35], [HYD_X + 0.9, RY, hz + 0.35], [HYD_X + 0.9, RY, hz - 0.35]), step + 0.4, { width: 0.8 });
  }

  let mains = seg([SPK_X, RY, bz], [SPK_X, BRANCH_YS.at(-1), bz]);
  const heads = [];
  for (const y of BRANCH_YS) {
    mains += seg([BRANCH_X[0], y, bz], [BRANCH_X[1], y, bz]);
    for (let x = BRANCH_X[0] + 1.5; x < BRANCH_X[1]; x += HEAD_STEP) heads.push([x, y, bz - 0.12]);
  }
  net.draw(mains, step, { width: 0.75 });
  net.fade(dots(heads), step + 1, { width: 2.8 });
}

// Roof: the reservoir's fire reserve and the header (barrilete) down to the risers.
{
  const step = 3 + (MAIN.floors + 1) * 1;
  const [x0, x1] = TANK.x;
  const y0 = TANK.y[0];
  const [z0] = TANK.z;
  const reserve = z0 + 1;
  net.fade(seg([x0 + 0.15, y0, reserve], [x1 - 0.15, y0, reserve]), step, { width: 0.9, dash: "5 3" });
  net.fade(path([x0 + 0.15, y0, z0 + 0.12], [x1 - 0.15, y0, z0 + 0.12], [x1 - 0.15, y0, reserve], [x0 + 0.15, y0, reserve], [x0 + 0.15, y0, z0 + 0.12]), step, { width: 0.7, fill: 0.12 });
  net.draw(path([x0 + 0.8, y0, z0 + 0.12], [x0 + 0.8, y0, MAIN_TOP + 0.4], [HYD_X, y0, MAIN_TOP + 0.4], [HYD_X, RY, MAIN_TOP + 0.4]), step + 0.5, { width: 1.2 });
}

writeScene("rua", { layers: [far, mid, near], network: net });
