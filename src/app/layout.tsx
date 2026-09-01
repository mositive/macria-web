import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { surumBilgisiniAl } from "@/lib/github";
import { Backdrop } from "@/components/Backdrop";
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

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description:
    "3DEXPERIENCE (CATIA V6) üzerinde tekrar eden işleri devralan masaüstü araç seti. " +
    "Sac parça listesi, toplu DXF aktarımı, ağırlık ve maliyet hesabı tek pencerede.",
  keywords: [
    "CATIA V6",
    "3DEXPERIENCE",
    "DXF export",
    "sac metal",
    "açınım",
    "maliyet hesaplama",
    "CATIA makro",
    "Macria",
  ],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description:
      "Tekrar eden CATIA işlerini tek pencerede toplayan masaüstü araç seti.",
    type: "website",
    locale: "tr_TR",
    siteName: site.name,
  },
  // İkonlar dosya kuralıyla veriliyor: src/app/favicon.ico ve
  // src/app/apple-icon.png. Burada ayrıca tanımlamak ikinci bir <link>
  // basıp hangisinin kullanılacağını tarayıcının insafına bırakıyordu.
  // İkisi de "npm run icons" ile logodan üretilir.
};

export const viewport: Viewport = {
  themeColor: "#04060d",
  // Mobil tarayıcı kendi arayüzünü ve form denetimlerini koyu şemaya göre çizsin.
  colorScheme: "dark",
};

// Arka plan, başlık ve altbilgi her sayfada aynı; düzende duruyorlar ki
// sayfalar arası geçişte yeniden kurulmasınlar.
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const surum = await surumBilgisiniAl();

  return (
    <html lang="tr" className={`${sora.variable} ${inter.variable}`}>
      <body className="antialiased">
        <Backdrop />
        <Nav />
        {children}
        <Footer surum={surum} />
      </body>
    </html>
  );
}
