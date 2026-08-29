import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

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
  icons: { icon: "/macria-logo.png", apple: "/macria-logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#04060d",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${sora.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
