import Link from "next/link";
import Image from "next/image";
import { Reveal } from "./Reveal";
import type { SurumBilgisi } from "@/lib/github";
import { yol, type Dil, type Sozluk } from "@/lib/i18n";
import { IndirIkonu } from "./IndirIkonu";

/**
 * Ana sayfanın kapanış şeridi. İndirme kartının kendisi /indir sayfasında;
 * burada yalnızca oraya götüren kısa bir çağrı var.
 */
export function DownloadCta({
  dil,
  s,
  surum,
}: {
  dil: Dil;
  s: Sozluk;
  surum: SurumBilgisi;
}) {
  return (
    <section className="relative px-4 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-ink-2 p-6 sm:p-10">
            <div className="relative flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-[1.5rem] leading-tight font-semibold tracking-tight text-white sm:text-3xl">
                  {s.kapanis.baslik}
                </h2>
                <p className="mt-3 max-w-md text-[0.95rem] text-slate-300/90">
                  {s.kapanis.aciklama}
                </p>

                <Link
                  href={yol(dil, "/indir")}
                  className="btn btn-primary btn-indir mt-7 flex-wrap gap-y-1 px-6 py-3.5"
                >
                  <IndirIkonu />
                  {s.kapanis.tus}
                  <span className="rounded-md bg-white/20 px-2 py-0.5 font-mono text-[11px]">
                    v{surum.surum}
                  </span>
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
