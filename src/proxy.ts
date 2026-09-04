import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { diller, varsayilanDil, gecerliDil, type Dil } from "@/lib/i18n";

/**
 * Dil öneki olmayan adresleri (/, /indir, /destek) uygun dile yönlendirir.
 *
 * Next 16'da bu dosyanın adı "middleware" değil "proxy"; eski ad kullanımdan
 * kaldırıldı (bkz. node_modules/next/dist/docs/.../file-conventions/proxy.md).
 *
 * Sıralama: önce kullanıcının kendi seçimi (çerez), sonra tarayıcının dili,
 * o da tutmazsa Türkçe. Seçimi çereze yazan yer src/components/DilSecici.tsx.
 */
const CEREZ = "MACRIA_DIL";

function tarayicidanDil(request: NextRequest): Dil {
  const kabul = request.headers.get("accept-language");
  if (!kabul) return varsayilanDil;

  // "tr-TR,tr;q=0.9,en-US;q=0.8" → ağırlığa göre sıralı dil kodları.
  const sirali = kabul
    .split(",")
    .map((parca) => {
      const [etiket, ...ekler] = parca.trim().split(";");
      const q = ekler.find((e) => e.trim().startsWith("q="));
      return { kod: etiket.toLowerCase().split("-")[0], agirlik: q ? Number(q.split("=")[1]) : 1 };
    })
    .sort((a, b) => b.agirlik - a.agirlik);

  return sirali.find((d) => gecerliDil(d.kod))?.kod as Dil | undefined ?? varsayilanDil;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const onekVar = diller.some((d) => pathname === `/${d}` || pathname.startsWith(`/${d}/`));
  if (onekVar) return;

  const secilen = request.cookies.get(CEREZ)?.value;
  const dil = secilen && gecerliDil(secilen) ? secilen : tarayicidanDil(request);

  const hedef = request.nextUrl.clone();
  hedef.pathname = pathname === "/" ? `/${dil}` : `/${dil}${pathname}`;
  return NextResponse.redirect(hedef);
}

export const config = {
  // Next'in kendi dosyaları, resim eniyileme ve public/ altındaki varlıklar
  // yönlendirmeye girmemeli; yoksa CSS ve logo da /tr altına itiliyor.
  matcher: ["/((?!_next|.*\\.[^/]+$).*)"],
};
