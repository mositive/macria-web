"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import type { SurumBilgisi } from "@/lib/github";
import { IndirIkonu } from "./IndirIkonu";

const line: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

// Hero'nun altındaki üçlü şerit: sayfanın geri kalanına açılan kapılar.
// Metinler kısa; ayrıntı zaten ilgili bölümde duruyor.
const kapilar = [
  {
    href: "#dxf",
    baslik: "Toplu DXF aktarımı",
    metin: "Yüz parçalık montajda tek tuş.",
    ikon: (
      <>
        <path d="M12 3v11M7.5 9.5 12 14l4.5-4.5" />
        <path d="M4 20h16" />
      </>
    ),
  },
  {
    href: "#ozellikler",
    baslik: "Sac parça listesi",
    metin: "Kalınlık ve adet tek ekranda.",
    ikon: (
      <>
        <path d="M4 6h16M4 12h16M4 18h10" />
      </>
    ),
  },
  {
    href: "#maliyet",
    baslik: "Ağırlık ve maliyet",
    metin: "Açınımdan doğrudan hesap.",
    ikon: (
      <>
        <path d="M5 4h14v16H5z" />
        <path d="M8 8h8M8 12h3M8 16h3M14 12v4" />
      </>
    ),
  },
];

export function Hero({ surum }: { surum: SurumBilgisi }) {
  const ref = useRef<HTMLDivElement>(null);
  const vt = surum.virustotal;

  // Aşağı kaydırdıkça hero yavaşça geri çekilsin.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh items-center overflow-hidden px-4 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-20"
    >
      {/* Alt köşelerden yükselen lacivert-mavi ışıklar. Sayfanın geri kalanı
          düz antrasit; renk yalnızca burada var. Saf CSS, JS çalışmıyor.
          Mobilde blur yarıya iner ve animasyon kapanır — tam ekran blur'un
          her karede yeniden boyanması telefon GPU'sunda kaydırmayı takıyor. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Her ışık üç katman: geniş lacivert yayılma + içinde daha dar,
            daha parlak bir çekirdek. Tek katman blur'da renk fazla dağılıp
            sönük kalıyordu. */}
        <div className="absolute -bottom-20 -left-28 h-[11rem] w-[25rem] sm:-bottom-24 sm:-left-36 sm:h-[16rem] sm:w-[42rem] sm:animate-glow-left">
          <div className="absolute inset-0 rounded-full bg-brand-700/75 blur-[70px] sm:blur-[100px]" />
          <div className="absolute inset-[20%] rounded-full bg-brand-500/60 blur-[55px] sm:blur-[75px]" />
          <div className="absolute inset-[38%] rounded-full bg-brand-400/40 blur-[45px] sm:blur-[60px]" />
        </div>

        <div className="absolute -right-28 -bottom-20 h-[11rem] w-[25rem] sm:-right-36 sm:-bottom-24 sm:h-[16rem] sm:w-[42rem] sm:animate-glow-right">
          <div className="absolute inset-0 rounded-full bg-brand-700/75 blur-[70px] sm:blur-[100px]" />
          <div className="absolute inset-[20%] rounded-full bg-brand-500/60 blur-[55px] sm:blur-[75px]" />
          <div className="absolute inset-[38%] rounded-full bg-brand-400/40 blur-[45px] sm:blur-[60px]" />
        </div>
      </div>

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        {/* İlk satır bağlamı kuruyor, vurgu ikinci satırda: logonun mavileri
            arasında yavaşça gezinen gradyan. Önceki hâlinde renk beyazdan
            camgöbeğine gidiyordu, marka paletiyle ilgisi yoktu. */}
        <h1 className="font-display text-[clamp(2rem,8.5vw,2.4rem)] leading-[1.06] font-semibold tracking-tight sm:text-5xl lg:text-[3.9rem]">
          <motion.span
            custom={0}
            variants={line}
            initial="hidden"
            animate="show"
            className="block text-slate-200"
          >
            Tekrar eden işler
          </motion.span>
          <motion.span
            custom={1}
            variants={line}
            initial="hidden"
            animate="show"
            className="text-brand-sweep mt-1 block pb-1 sm:mt-2"
          >
            tek pencerede, tek tuşla.
          </motion.span>
        </h1>

        <motion.p
          custom={2}
          variants={line}
          initial="hidden"
          animate="show"
          className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-slate-400 sm:mt-6 sm:text-lg"
        >
          Macria, 3DEXPERIENCE&apos;taki açık montajınıza bağlanır ve tekrarlı
          işleri sizin yerinize yapar. Kurulum gerekmez, çevrimdışı çalışır.
        </motion.p>

        <motion.div
          custom={3}
          variants={line}
          initial="hidden"
          animate="show"
          className="mt-8 flex w-full flex-col items-stretch gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:items-center"
        >
          <a href="/indir" className="btn btn-primary btn-indir px-6 py-3.5">
            <IndirIkonu />
            Windows için indir
          </a>
          <a href="#akis" className="btn btn-secondary px-6 py-3.5">
            Nasıl çalışır?
          </a>
        </motion.div>

        {/* tarama rozeti — ayrıntısı Güvenlik bölümünde */}
        {vt && (
          <motion.a
            href="/indir#guvenlik"
            custom={4}
            variants={line}
            initial="hidden"
            animate="show"
            className="group mt-6 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/[0.07] py-2 pr-4 pl-2.5 text-sm transition-colors hover:border-accent/50 hover:bg-accent/[0.12]"
          >
            <span className="flex size-5 items-center justify-center rounded-full bg-accent/20 text-accent">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            <span className="font-medium text-slate-200">VirusTotal ile Tarandı:</span>
            <span className="font-mono font-medium text-accent">
              {vt.tespit}/{vt.toplam}
            </span>
            <span className="text-slate-400">Güvenli Yazılım</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-500 transition-transform group-hover:translate-x-0.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </motion.a>
        )}

        {/* Alt şerit. Hücreler arasındaki 1 px'lik çizgi ayrı kenarlık değil,
            ızgaranın kendi boşluğu: bg-line üstünde gap-px duran hücreler. */}
        <motion.div
          custom={5}
          variants={line}
          initial="hidden"
          animate="show"
          className="mt-12 grid w-full gap-px overflow-hidden rounded-2xl border border-line bg-line text-left sm:mt-16 sm:grid-cols-3"
        >
          {kapilar.map((k) => (
            <a
              key={k.href}
              href={k.href}
              className="group bg-ink-2 p-5 transition-colors hover:bg-ink-3"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-brand-300"
                aria-hidden
              >
                {k.ikon}
              </svg>
              <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-slate-100">
                {k.baslik}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-600 transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
              <p className="mt-1 text-xs text-slate-500">{k.metin}</p>
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
