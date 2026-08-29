// VirusTotal raporu — ELLE DÜZENLENİR.
//
// Yeni sürüm yayınlayınca: dosyayı VirusTotal'e yükle, tarama bitince rapor
// sayfasındaki değerleri buraya yaz. Bu dosya scripts/release-info.mjs
// tarafından üzerine yazılmaz.
//
//   tespit  : tehdit bulan motor sayısı (rapordaki soldaki sayı)
//   toplam  : taramaya katılan motor sayısı
//   url     : https://www.virustotal.com/gui/file/<sha256> adresi
//   tarandi : tarama tarihi, YYYY-AA-GG
//
// Rapor yoksa: virustotal = null bırak, site o bölümü "yakında" haliyle gösterir.

export type VirusTotalRaporu = {
  url: string;
  tespit: number;
  toplam: number;
  tarandi: string;
};

// v1.7.0 (yeniden derlenmiş sürüm) taraması. Buradaki hash release.ts'teki
// sha256 ile birebir aynı olmalı — aksi halde site, indirilen dosyadan başka
// bir dosyanın raporunu göstermiş olur.
export const virustotal: VirusTotalRaporu | null = {
  url: "https://www.virustotal.com/gui/file/86857f128f7d43ad0e6286806f66e80dec225a5cb2499b73595d36061ccb586a",
  tespit: 0,
  toplam: 68,
  tarandi: "2026-08-29",
};
