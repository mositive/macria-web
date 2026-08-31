import { support } from "@/lib/site";
import { Reveal } from "./Reveal";

function KartIkonu() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="5" width="20" height="14" rx="2.5" />
      <path d="M2 10h20" />
    </svg>
  );
}

export function Support() {
  // Bağlantı tanımlanmadan bölümü hiç basma: çalışmayan bir destek butonu
  // olmasındansa bölüm hiç olmasın.
  if (!support.shopier.url) return null;

  return (
    <section id="destek" className="relative px-4 py-20 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="font-mono text-[10px] tracking-[0.18em] text-brand-300/80 uppercase">
            Destek ol
          </div>
          <h2 className="mt-4 font-display text-[1.65rem] leading-tight font-semibold tracking-tight text-white sm:text-4xl">
            Macria&apos;nın Geliştirme Sürecini Destekleyin.
          </h2>
          <p className="mt-4 max-w-xl text-[0.95rem] text-slate-300/90 sm:text-base">
            Macria tamamen ücretsiz ve açık kaynaklıdır. Destekleriniz, yeni
            özelliklerin eklenmesine, hataların düzeltilmesine ve genel olarak
            Macria&apos;nın daha iyi bir araç haline gelmesine yardımcı olur.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 sm:mt-10">
          <div className="relative overflow-hidden rounded-3xl border border-brand-500/25 bg-gradient-to-b from-brand-900/45 to-ink-2/80 p-6 backdrop-blur-xl sm:p-9">
            <span className="pointer-events-none absolute -top-28 left-1/2 size-[26rem] -translate-x-1/2 rounded-full bg-brand-500/15 blur-[100px]" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">
                  Bilgilendirme
                </div>
                <p className="mt-2 max-w-md text-sm text-slate-300">
                  Destekleriniz Shopier üzerinden güvenli bir şekilde işlenir. Ödeme bilgileri doğrudan Shopier tarafından işlenir ve Macria web sitesinde saklanmaz.
                </p>
              </div>

              <div className="shrink-0">
                {support.shopier.aktif ? (
                  <a
                    href={support.shopier.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative block overflow-hidden rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 px-6 py-4 text-center font-medium text-white shadow-xl shadow-brand-600/35 transition-all hover:shadow-2xl hover:shadow-brand-500/50 sm:px-7"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2.5">
                      <KartIkonu />
                      Destek ol
                    </span>
                    <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/30 opacity-0 transition-opacity group-hover:animate-shimmer group-hover:opacity-100" />
                  </a>
                ) : (
                  // Devre dışıyken bağlantı değil düz bir kutu: tıklanamaz,
                  // Tab ile odaklanılamaz, ekran okuyucuya da link demez.
                  <div
                    aria-disabled="true"
                    className="cursor-not-allowed rounded-xl border border-line bg-white/[0.04] px-6 py-4 text-center font-medium text-slate-500 select-none sm:px-7"
                  >
                    <span className="flex items-center justify-center gap-2.5">
                      <KartIkonu />
                      Destek ol
                    </span>
                  </div>
                )}

                {!support.shopier.aktif && (
                  <p className="mt-2.5 text-center text-[11px] text-slate-500">
                    Ödeme altyapısı hazırlanıyor, çok yakında.
                  </p>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        <p className="mt-6 text-xs leading-relaxed text-slate-600">
          Destek tamamen gönüllüdür; ödeme yapmak size ek bir hak, öncelik ya da
          lisans sağlamaz.
        </p>
      </div>
    </section>
  );
}
