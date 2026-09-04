"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { diller, type Dil, type Sozluk } from "@/lib/i18n";

const CEREZ = "MACRIA_DIL";

/**
 * TR / EN geçişi. İki dil olduğu için açılır liste değil, iki durumlu bir
 * anahtar: seçili olan vurgulu, diğeri tıklanabilir.
 *
 * Bağlantı, bulunulan sayfanın öteki dildeki karşılığına gidiyor: /tr/indir
 * üzerindeyken EN, /en/indir'e götürüyor — ana sayfaya değil.
 */
export function DilSecici({ dil, s }: { dil: Dil; s: Sozluk }) {
  const pathname = usePathname();

  // Görüntülenen dil çereze yazılıyor ki kullanıcı bir dahaki sefere köke (/)
  // girdiğinde src/proxy.ts onu doğrudan bu dile yönlendirsin. Tıklama anında
  // değil burada yazılıyor: paylaşılan bir /en bağlantısıyla gelen ziyaretçinin
  // seçimi de böylece hatırlanıyor.
  useEffect(() => {
    document.cookie = `${CEREZ}=${dil}; path=/; max-age=31536000; samesite=lax`;
  }, [dil]);

  // "/tr/indir" → "/indir". Önek her zaman var: bütün sayfalar [lang] altında.
  const oneksiz = pathname.replace(/^\/[^/]+/, "");

  return (
    <div
      className="flex items-center rounded-xl border border-line bg-white/[0.035] p-0.5"
      role="group"
      aria-label={s.dil.etiket}
    >
      {diller.map((d) => {
        const secili = d === dil;
        return (
          <Link
            key={d}
            href={`/${d}${oneksiz}`}
            aria-current={secili ? "true" : undefined}
            className={`rounded-[0.6rem] px-2.5 py-1.5 font-mono text-[11px] tracking-wide transition-colors ${
              secili ? "bg-white/[0.09] text-white" : "text-slate-500 hover:text-slate-200"
            }`}
          >
            {d.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
