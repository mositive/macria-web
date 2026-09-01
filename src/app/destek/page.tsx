import type { Metadata } from "next";
import { Support } from "@/components/Support";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Destek ol — ${site.name}`,
  description:
    "Macria ücretsiz ve açık kaynaklı. Geliştirilmesine gönüllü katkı " +
    "sağlamak isteyenler için destek seçeneği.",
};

export default function DestekSayfasi() {
  return (
    <main className="pt-12 sm:pt-16">
      <Support />
    </main>
  );
}
