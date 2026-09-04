import tr from "@/messages/tr.json";

/**
 * Site iki dilde: Türkçe ana dil, İngilizce çeviri. Adres önekiyle ayrışıyorlar
 * (/tr/indir, /en/indir); yönlendirmeyi src/proxy.ts yapıyor.
 *
 * Sözlüklerin şekli tr.json'dan türetiliyor. Yani en.json'da bir anahtar
 * eksik ya da fazla kalırsa hata derleme sırasında çıkıyor, sayfada boş bir
 * metin olarak değil.
 */
export const diller = ["tr", "en"] as const;
export type Dil = (typeof diller)[number];
export const varsayilanDil: Dil = "tr";

export type Sozluk = typeof tr;

export function gecerliDil(deger: string): deger is Dil {
  return (diller as readonly string[]).includes(deger);
}

const sozlukler: Record<Dil, () => Promise<Sozluk>> = {
  tr: () => import("@/messages/tr.json").then((m) => m.default),
  en: () => import("@/messages/en.json").then((m) => m.default as Sozluk),
};

export async function sozlukAl(dil: Dil): Promise<Sozluk> {
  return sozlukler[dil]();
}

/** Sayı ve tarih biçimleri için BCP-47 etiketi. */
export const bicimEtiketi: Record<Dil, string> = {
  tr: "tr-TR",
  en: "en-GB",
};

/**
 * Dil önekli adres üretir: yol("en", "/indir") → "/en/indir".
 * Kök için "/en" döner, "/en/" değil — sonda eğik çizgi ikinci bir adres yapıp
 * yönlendirme zinciri açıyordu.
 */
export function yol(dil: Dil, adres = "/"): string {
  return adres === "/" ? `/${dil}` : `/${dil}${adres}`;
}

/**
 * Metindeki {anahtar} yerlerini doldurur. Tam bir çeviri kütüphanesi değil;
 * sözlükte yalnızca birkaç yerde sayı/sürüm geçiyor, onlara yetiyor.
 */
export function doldur(kalip: string, degerler: Record<string, string | number>): string {
  return kalip.replace(/\{(\w+)\}/g, (tam, anahtar: string) =>
    anahtar in degerler ? String(degerler[anahtar]) : tam,
  );
}
