// Build the "x-ray" composite for the before/after slider: the architecture
// render with the PPCI network keyed in on top. Source renders share the same
// camera, so the network lands exactly inside the building footprint.
// Run: node scripts/generate-xray.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "assets", "Projetos");
const out = path.join(root, "public", "img", "projetos");

const jobs = [
  ["Centro comercial/Centro Comercial_arq.jpg", "Centro comercial/Centro Comercial_arq e preventivo.jpg", "projeto-01-xray.jpg"],
  ["Edificação pública/Edificação pública_arq.jpg", "Edificação pública/Edificação pública_arq e preventivo.jpg", "projeto-02-xray.jpg"],
  ["Escola/Escola com arq.jpg", "Escola/Escola com arq e inc.jpg", "projeto-03-xray.jpg"],
];

const WIDTH = 1600;

for (const [arqRel, ppciRel, dst] of jobs) {
  // Key out the gray background of the PPCI render → keep only pipes/tanks.
  const { data, info } = await sharp(path.join(src, ppciRel))
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0, j = 0; i < data.length; i += channels, j += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const sat = Math.max(r, g, b) - Math.min(r, g, b);
    const bright = (r + g + b) / 3;
    const isInk = sat > 22 || bright < 95;
    rgba[j] = r; rgba[j + 1] = g; rgba[j + 2] = b;
    rgba[j + 3] = isInk ? 255 : 0;
  }
  // Dim + slightly desaturate the building so the red network reads as the focus.
  // Resize first, then capture the real output dimensions to match the ink to.
  const base = await sharp(path.join(src, arqRel))
    .rotate()
    .modulate({ brightness: 0.82, saturation: 0.88 })
    .resize({ width: WIDTH, withoutEnlargement: true })
    .toBuffer({ resolveWithObject: true });

  const ink = await sharp(rgba, { raw: { width, height, channels: 4 } })
    .resize({ width: base.info.width, height: base.info.height, fit: "fill" })
    .png()
    .toBuffer();

  await sharp(base.data)
    .composite([{ input: ink, blend: "over" }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(out, dst));
  console.log("✓", dst);
}
console.log("done");
