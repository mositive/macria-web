// Tek yerden yönetilen site sabitleri.
//
// Sürüm ve indirme bağlantıları artık GitHub Releases API'sinden okunuyor
// (bkz. src/lib/github.ts). Buradaki `version` ve `downloads` yalnızca API'ye
// ulaşılamadığında devreye giren yedek değerler — yine de ara sıra güncel
// tutmakta fayda var ki API çöktüğünde site çok eski bir sürüm göstermesin.
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

// Menü hem başlıkta hem altbilgide kullanılıyor. Çapalar ana sayfadaki
// bölümlere ait olduğu için "/#..." biçiminde: /indir sayfasından tıklanınca
// da doğru yere gider.
export const nav = [
  { href: "/#ozellikler", label: "Araç seti" },
  { href: "/#akis", label: "Nasıl çalışır" },
  { href: "/indir", label: "İndir" },
  { href: "/destek", label: "Destek" },
] as const;

// Gönüllü destek kanalları.
//
// Bilerek "bağış" değil "destek" deniyor: 2860 sayılı Yardım Toplama Kanunu
// gerçek kişilerin izinsiz bağış toplamasını yasaklıyor. Kullanıcı burada bir
// bağış yapmıyor, bir destek paketi satın alıyor — para aynı, zemin farklı.
//
// Tek kanal: Shopier. Tahsilatı Shopier yaptığı için banka bilgisi sitede hiç
// görünmez. `url` boş bırakılırsa destek bölümü tamamen gizlenir.
export const support = {
  shopier: {
    // false yapılırsa buton griye döner ve tıklanamaz olur — ürünü yayından
    // kaldırdığın ya da hesapta bir sorun çıktığı zaman işe yarar.
    aktif: true,
    // "Macria Destek" ürünü. Birim fiyat ₺200; destekçi tutarı ödeme
    // ekranındaki adet seçiciyle artırıyor.
    url: "https://www.shopier.com/macria/50456694",
  },
} as const;
