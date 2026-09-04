import { support } from "@/lib/site";
import { Reveal } from "./Reveal";

// Shopier'e yeni sekmede gidildiğini anlatan dış bağlantı ikonu.
function DisBaglantiIkonu() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 4h6v6" />
      <path d="M20 4 10.5 13.5" />
      <path d="M19 14.5V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 3 19V6a1.5 1.5 0 0 1 1.5-1.5H9" />
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
          <div className="relative overflow-hidden rounded-3xl border border-line bg-ink-2 p-6 sm:p-9">
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
                    className="btn btn-primary px-6 py-4 sm:px-7"
                  >
                    Destek ol
                    <DisBaglantiIkonu />
                  </a>
                ) : (
                  // Devre dışıyken bağlantı değil düz bir kutu: tıklanamaz,
                  // Tab ile odaklanılamaz, ekran okuyucuya da link demez.
                  <div
                    aria-disabled="true"
                    className="btn cursor-not-allowed border border-line bg-white/[0.03] px-6 py-4 text-slate-500 select-none sm:px-7"
                  >
                    Destek ol
                    <DisBaglantiIkonu />
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
