// public/macria-logo.png dosyasından tarayıcı ikonlarını üretir:
//   src/app/favicon.ico    → sekme ikonu (16/32/48 px, PNG gömülü ICO)
//   src/app/apple-icon.png → iOS ana ekran ikonu (180 px)
//
// Logo değişmedikçe yeniden çalıştırmak gerekmez.
//
// Kullanım:
//   npm run icons
//
// Not: sharp doğrudan bağımlılık değil, Next ile birlikte kuruluyor.

import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const kokDizin = join(dirname(fileURLToPath(import.meta.url)), "..");
const kaynak = join(kokDizin, "public", "macria-logo.png");

// ICO, her biri ayrı boyutta birden çok görüntü taşır; tarayıcı bağlama göre
// uygun olanı seçer. Vista'dan beri girdiler PNG olarak gömülebiliyor.
function icoPaketle(goruntuler) {
  const baslik = Buffer.alloc(6);
  baslik.writeUInt16LE(0, 0); // ayrılmış
  baslik.writeUInt16LE(1, 2); // tür: ikon
  baslik.writeUInt16LE(goruntuler.length, 4);

  const girdiler = [];
  let ofset = 6 + goruntuler.length * 16;

  for (const { boyut, veri } of goruntuler) {
    const girdi = Buffer.alloc(16);
    // 256 px, tek baytlık alana sığmadığı için 0 olarak yazılır.
    girdi.writeUInt8(boyut >= 256 ? 0 : boyut, 0);
    girdi.writeUInt8(boyut >= 256 ? 0 : boyut, 1);
    girdi.writeUInt8(0, 2); // palet rengi yok
    girdi.writeUInt8(0, 3); // ayrılmış
    girdi.writeUInt16LE(1, 4); // renk düzlemi
    girdi.writeUInt16LE(32, 6); // bit derinliği
    girdi.writeUInt32LE(veri.length, 8);
    girdi.writeUInt32LE(ofset, 12);
    ofset += veri.length;
    girdiler.push(girdi);
  }

  return Buffer.concat([
    baslik,
    ...girdiler,
    ...goruntuler.map((g) => g.veri),
  ]);
}

async function olcekle(boyut) {
  return sharp(kaynak)
    .resize(boyut, boyut, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

const boyutlar = [16, 32, 48];
const goruntuler = await Promise.all(
  boyutlar.map(async (boyut) => ({ boyut, veri: await olcekle(boyut) })),
);

const ico = join(kokDizin, "src", "app", "favicon.ico");
await writeFile(ico, icoPaketle(goruntuler));
console.log(`• Yazıldı : ${ico} (${boyutlar.join("/")} px)`);

const apple = join(kokDizin, "src", "app", "apple-icon.png");
await writeFile(apple, await olcekle(180));
console.log(`• Yazıldı : ${apple} (180 px)`);
