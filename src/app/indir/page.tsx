import type { Metadata } from "next";
import { Download } from "@/components/Download";
import { Security } from "@/components/Security";
import { Changelog } from "@/components/Changelog";
import { site } from "@/lib/site";
import { surumBilgisiniAl, surumGecmisiniAl } from "@/lib/github";

export const metadata: Metadata = {
  title: `İndir — ${site.name}`,
  description:
    "Macria'yı indirin: kurulum gerektirmeyen tek dosya, dosya doğrulama " +
    "bilgileri ve bütün sürümlerin değişiklik notları.",
};

export default async function IndirSayfasi() {
  const [surum, gecmis] = await Promise.all([
    surumBilgisiniAl(),
    surumGecmisiniAl(),
  ]);

  return (
    // Sabit başlığın altında kalmasın diye üstte fazladan boşluk; ana sayfada
    // bu işi hero'nun kendi dolgusu görüyordu.
    <main className="pt-12 sm:pt-16">
      <Download surum={surum} />
      <Security surum={surum} />
      <Changelog gecmis={gecmis} />
    </main>
  );
}
