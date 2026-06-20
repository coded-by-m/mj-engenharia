// One-off: optimize client BIM renders from assets/Projetos → public/img/projetos.
// Heroes (arq/ppci) capped at 1600w, detail shots at 1100w, re-encoded mozjpeg.
// Run: node scripts/optimize-projetos.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "assets", "Projetos");
const out = path.join(root, "public", "img", "projetos");

const jobs = [
  // projeto-01 — Centro comercial
  ["Centro comercial/Centro Comercial_arq.jpg", "projeto-01-arq.jpg", 1600],
  ["Centro comercial/Centro Comercial_arq e preventivo.jpg", "projeto-01-ppci.jpg", 1600],
  ["Centro comercial/Equipamentos gerais.jpg", "projeto-01-equip-1.jpg", 1100],
  ["Centro comercial/Valvulas de governo e alarme.jpg", "projeto-01-equip-2.jpg", 1100],
  // projeto-02 — Edificação pública
  ["Edificação pública/Edificação pública_arq.jpg", "projeto-02-arq.jpg", 1600],
  ["Edificação pública/Edificação pública_arq e preventivo.jpg", "projeto-02-ppci.jpg", 1600],
  ["Edificação pública/Equipamentos gerais.jpg", "projeto-02-equip-1.jpg", 1100],
  // projeto-03 — Escola
  ["Escola/Escola com arq.jpg", "projeto-03-arq.jpg", 1600],
  ["Escola/Escola com arq e inc.jpg", "projeto-03-ppci.jpg", 1600],
  ["Escola/equipamentos.jpg", "projeto-03-equip-1.jpg", 1100],
];

await mkdir(out, { recursive: true });

for (const [from, to, width] of jobs) {
  const meta = await sharp(path.join(src, from)).metadata();
  await sharp(path.join(src, from))
    .resize({ width: Math.min(width, meta.width), withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(out, to));
  console.log(`✓ ${to}  (${meta.width}×${meta.height} → ${Math.min(width, meta.width)}w)`);
}
console.log("done");
