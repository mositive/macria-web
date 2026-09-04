"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { SurumBilgisi } from "@/lib/github";
import type { Dil, Sozluk } from "@/lib/i18n";
import { IndirIkonu } from "./IndirIkonu";

export function Download({
  s,
  surum,
}: {
  dil: Dil;
  s: Sozluk;
  surum: SurumBilgisi;
}) {
  return (
    <section id="indir" className="relative px-4 py-20 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 44, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-line bg-ink-2 p-6 sm:p-12"
        >
          <div className="relative grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-display text-[1.65rem] leading-tight font-semibold tracking-tight text-white sm:text-4xl">
                {s.indirme.baslik}
              </h2>
              <p className="mt-4 max-w-lg text-[0.95rem] text-slate-300/90 sm:text-base">
                {s.indirme.aciklama}
              </p>

              <div className="mt-7 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={surum.indirmeUrl}
                  className="btn btn-primary btn-indir flex-wrap gap-y-1 px-6 py-4 sm:px-7"
                >
                  <IndirIkonu boyut={18} />
                  {s.indirme.tus}
                  <span className="rounded-md bg-white/20 px-2 py-0.5 font-mono text-[11px]">
                    v{surum.surum}
                  </span>
                </a>

                <a
                  href={surum.tumSurumlerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary px-6 py-4"
                >
                  {s.indirme.tumSurumler}
                </a>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                <a
                  href="#guvenlik"
                  className="group inline-flex items-center gap-2 text-xs text-slate-400 transition-colors hover:text-white"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-brand-300">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  {s.indirme.taramaRaporu}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-0.5">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>

                <a
                  href="#surumler"
                  className="group inline-flex items-center gap-2 text-xs text-slate-400 transition-colors hover:text-white"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-brand-300">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3.5 2" />
                  </svg>
                  {s.indirme.surumGecmisi}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-0.5">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>

            {/* dönen logo */}
            <div className="relative hidden justify-self-center md:block">
              <span className="absolute inset-0 m-auto size-40 animate-pulse-ring rounded-full border border-brand-400/30" />
              <Image
                src="/macria-logo.png"
                alt=""
                width={190}
                height={190}
                className="relative w-40 animate-float drop-shadow-[0_14px_44px_rgba(20,79,214,0.6)]"
              />
            </div>
          </div>

          {/* gereksinimler */}
          <dl className="relative mt-10 grid grid-cols-2 gap-x-5 gap-y-5 border-t border-brand-500/15 pt-7 sm:mt-12 sm:gap-x-8 sm:pt-8 lg:grid-cols-5">
            {s.indirme.gereksinimler.map((g, i) => (
              <motion.div
                key={g.baslik}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <dt className="font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">
                  {g.baslik}
                </dt>
                <dd className="mt-1.5 text-sm text-slate-200">{g.deger}</dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
