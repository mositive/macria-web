// Tek yerden yönetilen site sabitleri. Yeni sürüm çıktığında yalnızca burayı
// güncellemek yeterli: başlıktaki rozet, indirme butonları ve sürüm notu bağı
// hepsi bu değerleri kullanır.
export const site = {
  name: "Macria",
  tagline: "CATIA işlerini kolaylaştıran araç seti",
  version: "1.7.0",
  github: "https://github.com/mositive/Macria",
  // Yayın dosyalarını GitHub Releases'e yükledikten sonra bu bağlantılar
  // doğrudan çalışır. Başka bir yerde barındırıyorsan URL'leri değiştir.
  downloads: {
    portable: "https://github.com/mositive/Macria/releases/latest/download/Macria.exe",
    latest: "https://github.com/mositive/Macria/releases/latest",
  },
} as const;

export const nav = [
  { href: "#ozellikler", label: "Araç seti" },
  { href: "#akis", label: "Nasıl çalışır" },
  { href: "#dxf", label: "Toplu DXF" },
  { href: "#maliyet", label: "Maliyet" },
  { href: "#indir", label: "İndir" },
  { href: "#guvenlik", label: "Güvenlik" },
] as const;
