// Yayınlanan exe'nin boyutunu ve SHA-256 özetini hesaplayıp src/lib/release.ts
// dosyasını yeniden üretir. VirusTotal raporu buraya değil, elle düzenlenen
// src/lib/virustotal.ts dosyasına yazılır.
//
// Kullanım:
//   npm run release:info -- <exe-yolu>

import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { stat, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const kokDizin = join(dirname(fileURLToPath(import.meta.url)), "..");
const cikti = join(kokDizin, "src", "lib", "release.ts");

const exeYolu = process.argv[2];
if (!exeYolu) {
  console.error("Kullanım: npm run release:info -- <exe-yolu>");
  process.exit(1);
}

async function sha256(yol) {
  const hash = createHash("sha256");
  for await (const parca of createReadStream(yol)) hash.update(parca);
  return hash.digest("hex");
}

const yol = resolve(exeYolu);
const { size } = await stat(yol);
const ozet = await sha256(yol);

console.log(`• Dosya   : ${yol}`);
console.log(`• Boyut   : ${size} bayt`);
console.log(`• SHA-256 : ${ozet}`);
console.log(`• Rapor   : https://www.virustotal.com/gui/file/${ozet}`);

const govde = `// BU DOSYA ÜRETİLİR — elle düzenleme, "npm run release:info" ile yenile.
// Kaynak: scripts/release-info.mjs
// VirusTotal raporu için src/lib/virustotal.ts dosyasına bak.

export const release = {
  dosya: "Macria.exe",
  boyutBayt: ${size},
  sha256: "${ozet}",
} as const;
`;

await writeFile(cikti, govde, "utf8");
console.log(`• Yazıldı : ${cikti}`);
