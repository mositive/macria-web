import { Hero } from "@/components/Hero";
import { Pipeline } from "@/components/Pipeline";
import { Features } from "@/components/Features";
import { ExportDemo } from "@/components/ExportDemo";
import { CostDemo } from "@/components/CostDemo";
import { Developers } from "@/components/Developers";
import { DownloadCta } from "@/components/DownloadCta";
import { surumBilgisiniAl } from "@/lib/github";

export default async function Home() {
  // Aynı istek düzende de yapılıyor; Next aynı adrese giden fetch'leri tek
  // render içinde birleştirdiği için GitHub'a yine tek istek gidiyor.
  const surum = await surumBilgisiniAl();

  return (
    <main>
      <Hero surum={surum} />
      <Pipeline />
      <ExportDemo />
      <Features />
      <CostDemo />
      <Developers />
      <DownloadCta surum={surum} />
    </main>
  );
}
