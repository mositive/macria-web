import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { Pipeline } from "@/components/Pipeline";
import { Features } from "@/components/Features";
import { ExportDemo } from "@/components/ExportDemo";
import { CostDemo } from "@/components/CostDemo";
import { Developers } from "@/components/Developers";
import { DownloadCta } from "@/components/DownloadCta";
import { surumBilgisiniAl } from "@/lib/github";
import { gecerliDil, sozlukAl } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!gecerliDil(lang)) notFound();

  // Aynı istek düzende de yapılıyor; Next aynı adrese giden fetch'leri tek
  // render içinde birleştirdiği için GitHub'a yine tek istek gidiyor.
  const [surum, s] = await Promise.all([surumBilgisiniAl(), sozlukAl(lang)]);

  return (
    <main>
      <Hero dil={lang} s={s} surum={surum} />
      <Pipeline s={s} />
      <ExportDemo s={s} />
      <Features s={s} />
      <CostDemo dil={lang} s={s} />
      <Developers dil={lang} s={s} />
      <DownloadCta dil={lang} s={s} surum={surum} />
    </main>
  );
}
