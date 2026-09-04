import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { site } from "@/lib/site";
import { surumBilgisiniAl } from "@/lib/github";
import { diller, gecerliDil, sozlukAl } from "@/lib/i18n";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Her iki dil de derleme sırasında üretilsin; adres önekli olduğu için
// çalışma zamanında dil çözmeye gerek yok.
export function generateStaticParams() {
  return diller.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!gecerliDil(lang)) notFound();
  const s = await sozlukAl(lang);

  return {
    title: `${site.name} — ${s.meta.anaSayfa.baslik}`,
    description: s.meta.anaSayfa.aciklama,
    // Aynı içeriğin iki dildeki adresi; arama motoru hangisini kime
    // göstereceğini buradan biliyor.
    alternates: {
      canonical: `/${lang}`,
      languages: { tr: "/tr", en: "/en" },
    },
    openGraph: {
      title: `${site.name} — ${s.meta.anaSayfa.baslik}`,
      description: s.meta.anaSayfa.ogAciklama,
      type: "website",
      locale: lang === "tr" ? "tr_TR" : "en_GB",
      siteName: site.name,
    },
    // İkonlar dosya kuralıyla veriliyor: src/app/favicon.ico ve
    // src/app/apple-icon.png. Burada ayrıca tanımlamak ikinci bir <link>
    // basıp hangisinin kullanılacağını tarayıcının insafına bırakıyordu.
    // İkisi de "npm run icons" ile logodan üretilir.
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  // Mobil tarayıcı kendi arayüzünü ve form denetimlerini koyu şemaya göre çizsin.
  colorScheme: "dark",
};

// Başlık ve altbilgi her sayfada aynı; düzende duruyorlar ki sayfalar arası
// geçişte yeniden kurulmasınlar. Arka plan düz renk, globals.css'te body'de.
export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!gecerliDil(lang)) notFound();

  const [surum, s] = await Promise.all([surumBilgisiniAl(), sozlukAl(lang)]);

  return (
    <html lang={lang} className={`${sora.variable} ${inter.variable}`}>
      <body className="antialiased">
        <Nav dil={lang} s={s} />
        {children}
        <Footer dil={lang} s={s} surum={surum} />
      </body>
    </html>
  );
}
