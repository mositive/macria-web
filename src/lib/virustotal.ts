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

// v1.8.0 taraması. Buradaki hash release.ts'teki sha256 ile birebir aynı
// olmalı — aksi halde site, indirilen dosyadan başka bir dosyanın raporunu
// göstermiş olur.
export const virustotal: VirusTotalRaporu | null = {
  url: "https://www.virustotal.com/gui/file/78d150d218e855cac4062726451e7b84caf9565dbcea9944433b750edb720885",
  tespit: 0,
  toplam: 69,
  tarandi: "2026-09-02",
};
