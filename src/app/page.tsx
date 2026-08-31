import { Backdrop } from "@/components/Backdrop";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Pipeline } from "@/components/Pipeline";
import { Features } from "@/components/Features";
import { ExportDemo } from "@/components/ExportDemo";
import { CostDemo } from "@/components/CostDemo";
import { Download } from "@/components/Download";
import { Security } from "@/components/Security";
import { Support } from "@/components/Support";
import { Footer } from "@/components/Footer";
import { surumBilgisiniAl } from "@/lib/github";

export default async function Home() {
  // Sürüm, dosya boyutu ve özet tek yerden çekilip aşağı dağıtılır; böylece
  // sayfada tek bir GitHub isteği olur.
  const surum = await surumBilgisiniAl();

  return (
    <>
      <Backdrop />
      <Nav />
      <main>
        <Hero surum={surum} />
        <Pipeline />
        <ExportDemo />
        <Features />
        <CostDemo />
        <Download surum={surum} />
        <Security surum={surum} />
        <Support />
      </main>
      <Footer surum={surum} />
    </>
  );
}
