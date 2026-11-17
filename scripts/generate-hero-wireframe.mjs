/**
 * Generates the hero's drafting scene: a street canyon of structural frames seen
 * from pavement level in three-point perspective, with the fire-protection
 * system of the main tower drawn in red.
 * Illustrative only, not a client project.
 *
 * What keeps it from reading as a pile of lines:
 * - Columns and slabs are drawn with real thickness, as pairs of parallel lines.
 * - Each tower is painted over a translucent fill, far to near, so what's behind
 *   it survives only as a ghost.
 * - Line weight falls off with distance, and the street stays open in the middle.
 *
 * Output is inline SVG markup, so the CSS entrance honours
 * prefers-reduced-motion directly. Layers are separate <svg> elements so
 * the self-drawing network repaints alone, not the whole scene.
 *
 * Writes components/sections/hero-scene.generated.ts.
 * Run: node scripts/generate-hero-wireframe.mjs
 */
import { writeFileSync } from "node:fs";

const WIDTH = 1600;
const HEIGHT = 900;
const OUTPUT_FILE = "components/sections/hero-scene.generated.ts";
const BACKGROUND = "#07212b"; // --color-brand-drench
const LINE = "#dbe7ec";
const RED = "#d62828"; // --color-accent

// Overall strength of the linework, so the scene stays a background. Scales the
// white lines and the red network; the tower fills keep their own opacity.
const LINE_STRENGTH = 0.62;
const NETWORK_STRENGTH = 0.78;
const lineOpacity = (value) => Math.round(value * LINE_STRENGTH * 1000) / 1000;

const CAMERA = { x: 0, y: -66, z: 1.7 };
const YAW = (-12 * Math.PI) / 180;
const PITCH = (19 * Math.PI) / 180;
const FOCAL = 950;
const PRINCIPAL = { x: 490, y: 255 };

function project([x, y, z]) {
  const dx = x - CAMERA.x;
  const dy = y - CAMERA.y;
  const dz = z - CAMERA.z;
  const side = dx * Math.cos(YAW) - dy * Math.sin(YAW);
  const ahead = dx * Math.sin(YAW) + dy * Math.cos(YAW);
  const depth = ahead * Math.cos(PITCH) + dz * Math.sin(PITCH);
  const up = -ahead * Math.sin(PITCH) + dz * Math.cos(PITCH);
  return [PRINCIPAL.x + (FOCAL * side) / depth, PRINCIPAL.y - (FOCAL * up) / depth];
}

const round = (value) => Math.round(value * 10) / 10;

/** Liang-Barsky against the canvas plus a margin. */
function clipToCanvas([ax, ay], [bx, by], margin = 16) {
  const dx = bx - ax;
  const dy = by - ay;
  let start = 0;
  let end = 1;
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
      if (r > end) return null;
      start = Math.max(start, r);
    } else {
      if (r < start) return null;
      end = Math.min(end, r);
    }
  }
  return [
    [ax + dx * start, ay + dy * start],
    [ax + dx * end, ay + dy * end],
  ];
}

/** Screen-space segment, clipped to the canvas. */
function segment([ax, ay], [bx, by]) {
  const clipped = clipToCanvas([ax, ay], [bx, by]);
  if (!clipped) return "";
  const [[cax, cay], [cbx, cby]] = clipped;
  return `M${round(cax)} ${round(cay)}L${round(cbx)} ${round(cby)}`;
}

/** Straight stroke between 3D points; `reach` extends both ends in screen px. */
function stroke(from, to, reach = 0) {
  const [ax, ay] = project(from);
  const [bx, by] = project(to);
  const length = Math.hypot(bx - ax, by - ay) || 1;
  const ux = ((bx - ax) / length) * reach;
  const uy = ((by - ay) / length) * reach;
  return segment([ax - ux, ay - uy], [bx + ux, by + uy]);
}

const polygon = (...points) =>
  `M${points.map((point) => project(point).map(round).join(" ")).join("L")}Z`;

function divisions(min, max, step) {
  const count = Math.max(1, Math.round((max - min) / step));
  return Array.from({ length: count + 1 }, (_, i) => min + ((max - min) * i) / count);
}

/* ------------------------------------------------------------------ towers */

/** Weight by distance: 0 is the main tower, 2 the far skyline. */
const LEVELS = [
  { edge: 0.52, column: 0.27, slab: 0.17, ghost: 0.07, fill: 0.88, width: 1, columnSize: 0.42, slabSize: 0.42, slabEvery: 1, reach: 14 },
  { edge: 0.28, column: 0.15, slab: 0.1, ghost: 0.05, fill: 0.74, width: 0.9, columnSize: 0.34, slabSize: 0, slabEvery: 1, reach: 10 },
  { edge: 0.17, column: 0.1, slab: 0.07, ghost: 0, fill: 0.55, width: 0.8, columnSize: 0, slabSize: 0, slabEvery: 2, reach: 7 },
];

/** Draws one structural face. `at(u, z)` maps a position on the face to 3D. */
function face({ us, base, top, floors, height, level, at }, out) {
  const { columnSize, slabSize, slabEvery, reach } = LEVELS[level];
  for (const u of us) {
    const isCorner = u === us[0] || u === us.at(-1);
    const target = isCorner ? out.edge : out.column;
    if (columnSize) {
      target.push(stroke(at(u - columnSize, base), at(u - columnSize, top), reach));
      target.push(stroke(at(u + columnSize, base), at(u + columnSize, top), reach));
    } else {
      target.push(stroke(at(u, base), at(u, top), reach));
    }
  }
  for (let floor = 0; floor <= floors; floor += slabEvery) {
    const z = base + floor * height;
    const isEnd = floor === 0 || floor === floors;
    // Every fourth slab runs a little long, like a drafter's construction line.
    const run = isEnd ? reach * 2 : floor % 4 === 0 ? reach * 1.6 : reach * 0.6;
    const target = isEnd ? out.edge : out.slab;
    target.push(stroke(at(us[0], z), at(us.at(-1), z), run));
    if (slabSize && floor < floors) {
      target.push(stroke(at(us[0], z + slabSize), at(us.at(-1), z + slabSize), reach * 0.6));
    }
  }
}

function tower({ x: [x0, x1], y: [y0, y1], floors, height = 3.6, bayX = 6, bayY = 6, level = 1, base = 0 }) {
  const top = base + floors * height;
  const sideX = CAMERA.x < x0 ? x0 : CAMERA.x > x1 ? x1 : null;
  const farX = sideX === x0 ? x1 : x0;
  const style = LEVELS[level];
  const lines = { edge: [], column: [], slab: [], ghost: [] };

  // Far faces go down first and only survive behind the translucent fill.
  if (style.ghost) {
    for (const x of divisions(x0, x1, bayX)) lines.ghost.push(stroke([x, y1, base], [x, y1, top]));
    if (sideX !== null) {
      for (const y of divisions(y0, y1, bayY)) lines.ghost.push(stroke([farX, y, base], [farX, y, top]));
    }
    for (let floor = 0; floor <= floors; floor += 2) {
      const z = base + floor * height;
      lines.ghost.push(stroke([x0, y1, z], [x1, y1, z]));
    }
  }

  const fills = [polygon([x0, y0, base], [x1, y0, base], [x1, y0, top], [x0, y0, top])];
  const shared = { base, top, floors, height, level };
  face({ ...shared, us: divisions(x0, x1, bayX), at: (u, z) => [u, y0, z] }, lines);
  if (sideX !== null) {
    fills.push(polygon([sideX, y0, base], [sideX, y1, base], [sideX, y1, top], [sideX, y0, top]));
    face({ ...shared, us: divisions(y0, y1, bayY), at: (u, z) => [sideX, u, z] }, lines);
  }

  const path = (opacity, d, width) =>
    d.length
      ? `<path stroke-opacity="${lineOpacity(opacity)}" stroke-width="${round(width)}" d="${d.join("")}"/>`
      : "";

  return [
    path(style.ghost, lines.ghost, style.width * 0.8),
    `<path fill="${BACKGROUND}" fill-opacity="${style.fill}" stroke="none" d="${fills.join("")}"/>`,
    path(style.slab, lines.slab, style.width * 0.85),
    path(style.column, lines.column, style.width * 0.9),
    path(style.edge, lines.edge, style.width),
  ]
    .filter(Boolean)
    .join("");
}

const MAIN = { x: [20, 44], y: [0, 24], floors: 8, height: 3.6, bayX: 6, bayY: 8, level: 0 };
const MAIN_TOP = MAIN.floors * MAIN.height;
// Roof reservoir over the hydrant bays, flush with the front facade so the
// hydrant riser runs straight up into it. Its lower part is the fire reserve.
const TANK = { x: [21, 31], y: [0, 8], height: 8 };

const ground = [
  ...[-90, -12, 14, 96].map((x) => stroke([x, -44, 0], [x, 190, 0])),
  ...[-30, -16, -6].map((y) => stroke([-110, y, 0], [110, y, 0])),
].join("");

// Far to near inside each layer. Layers stack far, mid, near, and no tower in a
// nearer layer sits behind one in a farther layer.
const far = [
  `<path stroke-opacity="${lineOpacity(0.07)}" stroke-width=".8" d="${ground}"/>`,
  tower({ x: [-40, -18], y: [150, 172], floors: 36, height: 3.4, bayX: 5.5, bayY: 7, level: 2 }),
  tower({ x: [12, 28], y: [168, 186], floors: 42, height: 3.4, bayX: 4, bayY: 6, level: 2 }),
  tower({ x: [34, 58], y: [120, 144], floors: 30, height: 3.4, bayX: 6, bayY: 8, level: 2 }),
  tower({ x: [-84, -58], y: [104, 128], floors: 30, height: 3.4, bayX: 6.5, bayY: 8, level: 2 }),
];
const mid = [
  tower({ x: [-40, -20], y: [52, 74], floors: 27, height: 3.5, bayX: 5, bayY: 7, level: 1 }),
  tower({ x: [16, 34], y: [58, 78], floors: 24, height: 3.5, bayX: 4.5, bayY: 7, level: 1 }),
  tower({ x: [50, 72], y: [38, 60], floors: 21, height: 3.5, bayX: 5.5, bayY: 7, level: 1 }),
  tower({ x: [-70, -46], y: [-6, 18], floors: 22, height: 3.5, bayX: 4.8, bayY: 8, level: 1 }),
  tower({ x: [-38, -14], y: [4, 28], floors: 14, height: 3.6, bayX: 4, bayY: 6, level: 1 }),
  tower({ x: [52, 76], y: [-16, 10], floors: 23, height: 3.5, bayX: 4.8, bayY: 6.5, level: 1 }),
];
const near = [
  tower({ x: TANK.x, y: TANK.y, floors: 1, height: TANK.height, bayX: 5, bayY: 4, level: 0, base: MAIN_TOP }),
  tower(MAIN),
];

/* ----------------------------------------------------------------- network */

// The fire-protection system of the main tower, as one riser diagram on the
// front facade: the fire reserve in the roof tank feeds a hydrant riser with a
// cabinet on every floor. In its own bays, so nothing crosses, a sprinkler riser
// with an alarm valve at the base feeds a branch per floor. The fire brigade's
// siamese connection on the pavement feeds both along the base.
const FRONT_Y = MAIN.y[0];
const HYDRANT_X = 23;
const SPRINKLER_X = 35;
const FEED_X = 40;
const SIAMESE_SETBACK = 5;
const HEAD_XS = [29, 32, 38, 41];
const RESERVE_LEVEL = MAIN_TOP + 3.4;
const branchZ = (floor) => (floor + 1) * MAIN.height - 0.55;
const onFacade = (x, z) => [x, FRONT_Y, z];

const pipe = (...points) =>
  points
    .slice(0, -1)
    .map((point, i) => stroke(point, points[i + 1]))
    .join("");

const riser = (x, topZ) => pipe(onFacade(x, 0.1), onFacade(x, topZ));

// The hydrant riser carries on into the tank, ending under the reserve line.
const hydrantRiser = riser(HYDRANT_X, RESERVE_LEVEL - 0.8);
const sprinklerRiser = riser(SPRINKLER_X, branchZ(MAIN.floors - 1));

const feed =
  pipe([FEED_X, FRONT_Y - SIAMESE_SETBACK, 0.1], onFacade(FEED_X, 0.1)) +
  pipe(onFacade(FEED_X, 0.1), onFacade(HYDRANT_X, 0.1));

const reserveLine = stroke([TANK.x[0] + 0.6, TANK.y[0], RESERVE_LEVEL], [TANK.x[1] - 0.6, TANK.y[0], RESERVE_LEVEL]);

const branches = Array.from({ length: MAIN.floors }, (_, floor) => {
  const z = branchZ(floor);
  return [
    pipe(onFacade(HEAD_XS[0], z), onFacade(HEAD_XS.at(-1), z)),
    ...HEAD_XS.map((x) => pipe(onFacade(x, z), onFacade(x, z - 0.6))),
  ].join("");
});

const heads = Array.from({ length: MAIN.floors }, (_, floor) =>
  HEAD_XS.map((x) => {
    const [sx, sy] = project(onFacade(x, branchZ(floor) - 0.6));
    return `M${round(sx)} ${round(sy)}h.01`;
  }).join("")
).join("");

const cabinets = Array.from({ length: MAIN.floors }, (_, floor) => {
  const z = floor * MAIN.height + 1;
  return polygon(
    onFacade(HYDRANT_X + 0.4, z),
    onFacade(HYDRANT_X + 1.5, z),
    onFacade(HYDRANT_X + 1.5, z + 1.1),
    onFacade(HYDRANT_X + 0.4, z + 1.1)
  );
}).join("");

const ALARM_VALVE_Z = 1.6;
const alarmValve = (() => {
  const size = 0.55;
  const z = ALARM_VALVE_Z;
  return polygon(
    onFacade(SPRINKLER_X - size, z - size),
    onFacade(SPRINKLER_X + size, z + size),
    onFacade(SPRINKLER_X - size, z + size),
    onFacade(SPRINKLER_X + size, z - size)
  );
})();

const siamese = polygon(
  [FEED_X - 0.5, FRONT_Y - SIAMESE_SETBACK, 0.1],
  [FEED_X + 0.5, FRONT_Y - SIAMESE_SETBACK, 0.1],
  [FEED_X + 0.5, FRONT_Y - SIAMESE_SETBACK, 0.9],
  [FEED_X - 0.5, FRONT_Y - SIAMESE_SETBACK, 0.9]
);

// The network starts once the towers have faded in, then climbs floor by floor.
const NETWORK_START_MS = 900;
const STEP_MS = 120;
const at = (step) => `style="animation-delay:${NETWORK_START_MS + step * STEP_MS}ms"`;
const LAST_STEP = 4 + MAIN.floors;

const network = [
  `<path class="hero-fade" stroke-width="1.4" ${at(0)} d="${siamese}"/>`,
  `<path class="hero-draw" pathLength="1" stroke-width="2" ${at(0)} d="${feed}"/>`,
  `<path class="hero-draw" pathLength="1" stroke-width="1.6" ${at(2)} d="${hydrantRiser}"/>`,
  `<path class="hero-draw" pathLength="1" stroke-width="2" ${at(2)} d="${sprinklerRiser}"/>`,
  `<path class="hero-fade" stroke-width="1.4" ${at(3)} d="${alarmValve}"/>`,
  ...branches.map(
    (d, floor) => `<path class="hero-draw" pathLength="1" stroke-width="1.1" ${at(4 + floor)} d="${d}"/>`
  ),
  `<path class="hero-fade" stroke-width="1.2" ${at(6)} d="${cabinets}"/>`,
  `<path class="hero-fade" stroke-width="3" ${at(LAST_STEP)} d="${heads}"/>`,
  `<path class="hero-fade" stroke-width="1.2" stroke-dasharray="5 4" ${at(LAST_STEP)} d="${reserveLine}"/>`,
].join("");

/* ------------------------------------------------------------------ output */

const layers = {
  far: `<g stroke="${LINE}">${far.join("")}</g>`,
  mid: `<g stroke="${LINE}">${mid.join("")}</g>`,
  near: `<g stroke="${LINE}">${near.join("")}</g>`,
  network: `<g stroke="${RED}" stroke-opacity="${NETWORK_STRENGTH}">${network}</g>`,
};

const source = `// Generated by scripts/generate-hero-wireframe.mjs. Edit the script, not this file.

export const HERO_SCENE_VIEWBOX = "0 0 ${WIDTH} ${HEIGHT}";

export const heroSceneLayers = ${JSON.stringify(layers, null, 2)} as const;
`;

writeFileSync(OUTPUT_FILE, source);

const lineCount = Object.values(layers).join("").match(/M/g)?.length ?? 0;
console.log(`${OUTPUT_FILE}: ${lineCount} subpaths, ${Math.round(source.length / 1024)} KB`);
