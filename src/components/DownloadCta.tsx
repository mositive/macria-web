import Link from "next/link";
import Image from "next/image";
import { Reveal } from "./Reveal";
import type { SurumBilgisi } from "@/lib/github";

/**
 * Ana sayfanın kapanış şeridi. İndirme kartının kendisi /indir sayfasında;
 * burada yalnızca oraya götüren kısa bir çağrı var.
 */
export function DownloadCta({ surum }: { surum: SurumBilgisi }) {
  return (
    <section className="relative px-4 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-brand-500/25 bg-gradient-to-b from-brand-900/45 to-ink-2/80 p-6 backdrop-blur-xl sm:p-10">
            <span className="pointer-events-none absolute -top-28 left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-brand-500/15 blur-[100px]" />

            <div className="relative flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-[1.5rem] leading-tight font-semibold tracking-tight text-white sm:text-3xl">
                  Bir Sonraki Montajda Kullanın.
                </h2>
                <p className="mt-3 max-w-md text-[0.95rem] text-slate-300/90">
                  Kurulum yok, taşınabilir tek dosya, çevrimdışı çalışır.
                  İndirme sayfasında dosyanın doğrulama bilgileri ve sürüm
                  geçmişi de var.
                </p>

                <Link
                  href="/indir"
                  className="group relative mt-7 inline-flex overflow-hidden rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 px-6 py-3.5 font-medium text-white shadow-xl shadow-brand-600/35 transition-all hover:shadow-2xl hover:shadow-brand-500/50"
                >
                  <span className="relative z-10 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-y-0.5">
                      <path d="M12 3v13M6 11l6 6 6-6M4 21h16" />
                    </svg>
                    İndirme sayfasına git
                    <span className="rounded-md bg-white/20 px-2 py-0.5 font-mono text-[11px]">
                      v{surum.surum}
                    </span>
                  </span>
                  <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/30 opacity-0 transition-opacity group-hover:animate-shimmer group-hover:opacity-100" />
                </Link>
              </div>

              <div className="relative hidden shrink-0 justify-self-center sm:block">
                <span className="absolute inset-0 m-auto size-32 animate-pulse-ring rounded-full border border-brand-400/30" />
                <Image
                  src="/macria-logo.png"
                  alt=""
                  width={150}
                  height={150}
                  className="relative w-32 animate-float drop-shadow-[0_14px_44px_rgba(20,79,214,0.6)]"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
