// Tek yerden yönetilen site sabitleri.
//
// Sürüm ve indirme bağlantıları artık GitHub Releases API'sinden okunuyor
// (bkz. src/lib/github.ts). Buradaki `version` ve `downloads` yalnızca API'ye
// ulaşılamadığında devreye giren yedek değerler — yine de ara sıra güncel
// tutmakta fayda var ki API çöktüğünde site çok eski bir sürüm göstermesin.
export const site = {
  name: "Macria",
  tagline: "CATIA işlerini kolaylaştıran araç seti",
  version: "1.8.0",
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

export type Gelistirici = {
  ad: string;
  rol: string;
  linkedin: string;
  /**
   * `public/ekip/` altındaki dosyanın yolu, örn. "/ekip/emre-kocak.jpg".
   *
   * LinkedIn'in kendi fotoğraf adresi bilerek kullanılmıyor: o adresler imzalı
   * ve süreli olduğu için birkaç hafta sonra 403 dönüp resmi kırıyor. Fotoğrafı
   * indirip kare olarak public/ekip/ içine koyun; kart 72 piksel bastığı için
   * 200x200 yeter, retina ekranda daha net dursun derseniz 400x400 ideal.
   *
   * Boş bırakılırsa kartta fotoğraf yerine adın baş harfleri görünür.
   */
  foto?: string;
};

// Sitede tanıtılan ekip. Ad/rol/bağlantıyı buradan düzenleyin.
export const gelistiriciler: Gelistirici[] = [
  {
    ad: "Emre Koçak",
    rol: "Geliştirici, Mekatronik Mühendisi",
    linkedin: "https://www.linkedin.com/in/",
    foto: "/ekip/emre-kocak.jpg",
  },
  {
    ad: "Enes Yeşilöz",
    rol: "Geliştirici, Lead Design Engineer",
    linkedin: "https://www.linkedin.com/in/enesyesiloz/",
    foto: "/ekip/enes-yesiloz.jpg",
  },
];

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
