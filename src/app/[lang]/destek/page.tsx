import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Support } from "@/components/Support";
import { site } from "@/lib/site";
import { gecerliDil, sozlukAl } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/destek">): Promise<Metadata> {
  const { lang } = await params;
  if (!gecerliDil(lang)) notFound();
  const s = await sozlukAl(lang);

  return {
    title: `${s.meta.destek.baslik} — ${site.name}`,
    description: s.meta.destek.aciklama,
    alternates: {
      canonical: `/${lang}/destek`,
      languages: { tr: "/tr/destek", en: "/en/destek" },
    },
  };
}

export default async function DestekSayfasi({ params }: PageProps<"/[lang]/destek">) {
  const { lang } = await params;
  if (!gecerliDil(lang)) notFound();
  const s = await sozlukAl(lang);

  return (
    <main className="pt-12 sm:pt-16">
      <Support s={s} />
    </main>
  );
}
