"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";
import type { SurumKaydi } from "@/lib/github";

// İlk açılışta kaç sürüm görünsün. Geri kalanı "Tümünü göster" ile açılır;
// on beş sürümü birden basmak bölümü sayfanın yarısı kadar uzatıyor.
const BASLANGIC = 3;

function Notlar({ kayit }: { kayit: SurumKaydi }) {
  if (!kayit.notlar.length) {
    return (
      <p className="mt-3 text-sm text-slate-500">
        Bu sürüm için not yazılmamış.
      </p>
    );
  }

  return (
    <div className="mt-3 space-y-3">
      {kayit.notlar.map((not, i) => {
        if (not.tur === "baslik") {
          return (
            <div
              key={i}
              className="font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase"
            >
              {not.metin}
            </div>
          );
        }

        if (not.tur === "liste") {
          return (
            <ul key={i} className="space-y-1.5">
              {not.ogeler.map((oge, j) => (
                <li key={j} className="flex gap-2.5 text-sm text-slate-300">
                  <span className="mt-[0.45rem] size-1 shrink-0 rounded-full bg-brand-400/70" />
                  <span>{oge}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className="text-sm leading-relaxed text-slate-400">
            {not.metin}
          </p>
        );
      })}
    </div>
  );
}

export function Changelog({ gecmis }: { gecmis: SurumKaydi[] }) {
  const [hepsi, setHepsi] = useState(false);

  // GitHub'a ulaşılamadıysa bölümü hiç gösterme; boş bir zaman çizelgesi
  // sayfada anlamsız bir boşluk bırakıyor.
  if (!gecmis.length) return null;

  const gorunen = hepsi ? gecmis : gecmis.slice(0, BASLANGIC);
  const kalan = gecmis.length - gorunen.length;

  return (
    <section id="surumler" className="relative px-4 py-20 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <div className="font-mono text-[10px] tracking-[0.18em] text-brand-300/80 uppercase">
            Sürüm geçmişi
          </div>
          <h2 className="mt-4 font-display text-[1.65rem] leading-tight font-semibold tracking-tight text-white sm:text-4xl">
            Her Sürümde Ne Değişti?
          </h2>
          <p className="mt-4 text-[0.95rem] text-slate-400 sm:text-base">
            Yeni gelen sürümlerle birlikte Macria&apos;ya eklenen özellikler, yapılan değişiklikler ve düzeltmelerin detaylarını aşağıda bulabilirsiniz. Her sürümün notları, kullanıcıların güncellemelerden haberdar olmasını ve yeni özellikleri keşfetmesini kolaylaştırır.
          </p>
        </Reveal>

        <div className="mt-10 sm:mt-12">
          {gorunen.map((kayit, i) => (
            <motion.article
              key={kayit.surum}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                // Açılan sürümlerin hepsi birden gecikmesin diye gecikme
                // yalnızca ilk ekrandaki kartlara uygulanıyor.
                delay: i < BASLANGIC ? i * 0.08 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative grid gap-x-8 gap-y-3 border-l border-line/70 pb-8 pl-6 last:border-transparent last:pb-0 sm:grid-cols-[10rem_1fr] sm:gap-y-0 sm:pl-8"
            >
              {/* zaman çizelgesi noktası */}
              <span className="absolute top-1.5 -left-[4.5px] size-2 rounded-full bg-brand-400 shadow-[0_0_0_4px_rgba(31,107,240,0.15)]" />

              <div className="sm:pt-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-lg font-semibold tracking-tight text-white">
                    v{kayit.surum}
                  </span>
                  {i === 0 && !kayit.onSurum && (
                    <span className="rounded-md bg-brand-500/20 px-2 py-0.5 font-mono text-[10px] text-brand-300">
                      Güncel
                    </span>
                  )}
                  {kayit.onSurum && (
                    <span className="rounded-md bg-amber-300/15 px-2 py-0.5 font-mono text-[10px] text-amber-300">
                      Ön sürüm
                    </span>
                  )}
                </div>
                {kayit.tarih && (
                  <div className="mt-1 font-mono text-[11px] text-slate-500">
                    {kayit.tarih}
                  </div>
                )}
              </div>

              <div>
                <Notlar kayit={kayit} />
                <a
                  href={kayit.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-4 inline-flex items-center gap-2 text-xs text-slate-500 transition-colors hover:text-white"
                >
                  GitHub&apos;da aç
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                    <path d="M7 17L17 7M8 7h9v9" />
                  </svg>
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          {kalan > 0 && (
            <button
              type="button"
              onClick={() => setHepsi(true)}
              className="rounded-xl border border-line bg-white/[0.03] px-5 py-3.5 text-sm font-medium text-slate-200 transition-all hover:border-brand-400/45 hover:bg-white/[0.06] hover:text-white"
            >
              Önceki {kalan} sürümü göster
            </button>
          )}
          <a
            href={`${site.github}/releases`}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center justify-center gap-2 px-1 text-sm text-slate-500 transition-colors hover:text-white sm:justify-start"
          >
            Tüm yayınlar GitHub&apos;da
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
              <path d="M7 17L17 7M8 7h9v9" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
