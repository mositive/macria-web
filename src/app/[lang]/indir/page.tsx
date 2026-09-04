import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Download } from "@/components/Download";
import { Security } from "@/components/Security";
import { Changelog } from "@/components/Changelog";
import { site } from "@/lib/site";
import { surumBilgisiniAl, surumGecmisiniAl } from "@/lib/github";
import { gecerliDil, sozlukAl } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/indir">): Promise<Metadata> {
  const { lang } = await params;
  if (!gecerliDil(lang)) notFound();
  const s = await sozlukAl(lang);

  return {
    title: `${s.meta.indir.baslik} — ${site.name}`,
    description: s.meta.indir.aciklama,
    alternates: {
      canonical: `/${lang}/indir`,
      languages: { tr: "/tr/indir", en: "/en/indir" },
    },
  };
}

export default async function IndirSayfasi({ params }: PageProps<"/[lang]/indir">) {
  const { lang } = await params;
  if (!gecerliDil(lang)) notFound();

  const [surum, gecmis, s] = await Promise.all([
    surumBilgisiniAl(),
    surumGecmisiniAl(),
    sozlukAl(lang),
  ]);

  return (
    // Sabit başlığın altında kalmasın diye üstte fazladan boşluk; ana sayfada
    // bu işi hero'nun kendi dolgusu görüyordu.
    <main className="pt-12 sm:pt-16">
      <Download dil={lang} s={s} surum={surum} />
      <Security dil={lang} s={s} surum={surum} />
      <Changelog s={s} gecmis={gecmis} />
    </main>
  );
}
