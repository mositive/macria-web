"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";

const gereksinimler = [
  { k: "İşletim sistemi", v: "Windows 10 / 11 · x64" },
  { k: "CAD", v: "3DEXPERIENCE · CATIA V6" },
  { k: "Çalışma zamanı", v: ".NET 8" },
  { k: "Kurulum", v: "Gerekmez, taşınabilir tek dosya." },
  { k: "İnternet", v: "Gerekmez, çevrimdışı çalışır." },
];

export function Download() {
  return (
    <section id="indir" className="relative px-4 py-20 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 44, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-brand-500/25 bg-gradient-to-b from-brand-900/45 to-ink-2/80 p-6 backdrop-blur-xl sm:p-12"
        >
          {/* arka plan efektleri */}
          <div className="pointer-events-none absolute -top-32 left-1/2 size-[34rem] -translate-x-1/2 rounded-full bg-brand-500/18 blur-[110px]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(30deg, rgba(63,141,255,0.12) 1px, transparent 1px)," +
                "linear-gradient(150deg, rgba(63,141,255,0.12) 1px, transparent 1px)",
              backgroundSize: "56px 33px, 56px 33px",
              maskImage: "radial-gradient(70% 60% at 50% 0%, #000, transparent)",
              WebkitMaskImage: "radial-gradient(70% 60% at 50% 0%, #000, transparent)",
            }}
          />

          <div className="relative grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-display text-[1.65rem] leading-tight font-semibold tracking-tight text-white sm:text-4xl">
                Bir Sonraki Montajda Kullanın.
              </h2>
              <p className="mt-4 max-w-lg text-[0.95rem] text-slate-300/90 sm:text-base">
                İndirin, çift tıklayın. Kurulum yok, internet
                bağlantısı ihtiyacı yok.
              </p>

              <div className="mt-7 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={site.downloads.portable}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 px-6 py-4 font-medium text-white shadow-xl shadow-brand-600/35 transition-all hover:shadow-2xl hover:shadow-brand-500/50 sm:px-7"
                >
                  <span className="relative z-10 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-y-0.5">
                      <path d="M12 3v13M6 11l6 6 6-6M4 21h16" />
                    </svg>
                    Macria.exe indir
                    <span className="rounded-md bg-white/20 px-2 py-0.5 font-mono text-[11px]">
                      v{site.version}
                    </span>
                  </span>
                  <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/30 opacity-0 transition-opacity group-hover:animate-shimmer group-hover:opacity-100" />
                </a>

                <a
                  href={site.downloads.latest}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-line bg-white/[0.04] px-6 py-4 text-center font-medium text-slate-200 transition-all hover:border-brand-400/45 hover:bg-white/[0.08] hover:text-white"
                >
                  Tüm sürümler
                </a>
              </div>

              <a
                href="#guvenlik"
                className="group mt-5 inline-flex items-center gap-2 text-xs text-slate-400 transition-colors hover:text-white"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-brand-300">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                VirusTotal tarama raporu
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
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
            {gereksinimler.map((g, i) => (
              <motion.div
                key={g.k}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <dt className="font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">
                  {g.k}
                </dt>
                <dd className="mt-1.5 text-sm text-slate-200">{g.v}</dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
