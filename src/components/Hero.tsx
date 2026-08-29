"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { site } from "@/lib/site";
import { virustotal } from "@/lib/virustotal";

const line: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(10px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stats = [
  { k: "Sürüm", v: site.version },
  { k: "Platform", v: "Windows x64" },
  { k: "Kurulum", v: "Gerekmez" },
  { k: "Dağıtım", v: "Tek dosya" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  // Fare konumuna göre logoyu eğ; yay ile yumuşat ki takip ederken sıçramasın.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 120, damping: 18 });
  const glowX = useTransform(mx, [-0.5, 0.5], ["30%", "70%"]);
  const glowY = useTransform(my, [-0.5, 0.5], ["30%", "70%"]);
  const glow = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(63,141,255,0.5), transparent 62%)`;

  // Aşağı kaydırdıkça hero yavaşça geri çekilsin.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      onPointerMove={(e) => {
        // Yalnızca fare: dokunmatikte parmak kaydırırken de tetikleniyor,
        // her karede yay animasyonu çalışıp kaydırmayı takıldırıyordu.
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative flex min-h-svh items-center overflow-hidden px-4 pt-24 pb-14 sm:px-8 sm:pt-28 sm:pb-16"
    >
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="mx-auto grid w-full max-w-7xl items-center gap-8 sm:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8"
      >
        {/* --- metin --- */}
        <div className="relative z-10 lg:order-1">
          {/* satırlar tek satırda kalsın diye kısa tutuldu; ölçüler ona göre */}
          {/* 320 px'lik ekranlarda da satırlar bölünmesin diye viewport'a bağlı */}
          <h1 className="font-display text-[clamp(1.75rem,8.4vw,2.1rem)] leading-[1.08] font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.7rem]">
            <motion.span custom={0} variants={line} initial="hidden" animate="show" className="block">
              Tekrar eden işler
            </motion.span>
            <motion.span custom={1} variants={line} initial="hidden" animate="show" className="block">
              <span className="text-gradient">tek pencerede,</span>
            </motion.span>
            <motion.span custom={2} variants={line} initial="hidden" animate="show" className="block">
              <span className="text-gradient">tek tuşla.</span>
            </motion.span>
          </h1>

          <motion.p
            custom={3}
            variants={line}
            initial="hidden"
            animate="show"
            className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-slate-400 sm:mt-6 sm:text-lg"
          >
            3DEXPERIENCE&apos;taki açık montaja bağlanır, tekrarlı işleri sizin yerinize
            yapar.
          </motion.p>

          <motion.div
            custom={4}
            variants={line}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <a
              href="#indir"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 px-6 py-3.5 text-center font-medium text-white shadow-xl shadow-brand-600/30 transition-all hover:shadow-2xl hover:shadow-brand-500/45"
            >
              <span className="relative z-10 flex items-center justify-center gap-2.5">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="transition-transform group-hover:translate-y-0.5">
                  <path d="M12 3v13M6 11l6 6 6-6M4 21h16" />
                </svg>
                Windows için indir
              </span>
              <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/30 opacity-0 transition-opacity group-hover:animate-shimmer group-hover:opacity-100" />
            </a>
            <a
              href="#akis"
              className="rounded-xl border border-line bg-white/[0.03] px-6 py-3.5 text-center font-medium text-slate-200 backdrop-blur transition-all hover:border-brand-500/45 hover:bg-white/[0.06] hover:text-white"
            >
              Nasıl çalışır?
            </a>
          </motion.div>

          {/* tarama rozeti — ayrıntısı Güvenlik bölümünde */}
          {virustotal && (
            <motion.a
              href="#guvenlik"
              custom={5}
              variants={line}
              initial="hidden"
              animate="show"
              className="group mt-5 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] py-1.5 pr-3.5 pl-1.5 text-xs backdrop-blur transition-colors hover:border-accent/40"
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-accent/12 text-accent">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <span className="text-slate-300">VirusTotal</span>
              <span className="font-mono text-accent">
                {virustotal.tespit}/{virustotal.toplam}
              </span>
              <span className="text-slate-500">güvenli</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-600 transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </motion.a>
          )}

          <motion.dl
            custom={6}
            variants={line}
            initial="hidden"
            animate="show"
            className="mt-8 grid max-w-lg grid-cols-2 gap-x-5 gap-y-4 border-t border-line/70 pt-6 sm:mt-9 sm:gap-x-6 sm:gap-y-5 sm:pt-7 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.k}>
                <dt className="font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">
                  {s.k}
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-slate-100">{s.v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* --- logo sahnesi ---
            Mobilde başlığın ÜSTÜNDE ve küçük duruyor: tek sütuna inildiğinde
            ızgarada ikinci sırada kaldığı için metnin, rozetin ve künyenin
            altına, ekranın çok aşağısına düşüyordu. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative -order-1 mx-auto flex aspect-square w-full max-w-[12rem] items-center justify-center sm:max-w-[16rem] lg:order-2 lg:max-w-[30rem]"
          style={{ perspective: 1200 }}
        >
          {/* nabız halkaları */}
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="absolute size-[62%] animate-pulse-ring rounded-full border border-brand-400/35"
              style={{ animationDelay: `${i * 1.05}s` }}
            />
          ))}

          {/* dönen yörüngeler */}
          <span className="absolute size-[86%] animate-spin-slow rounded-full border border-dashed border-brand-500/20">
            <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_14px_3px] shadow-accent/60" />
          </span>
          <span
            className="absolute size-[68%] animate-spin-slow rounded-full border border-brand-400/15"
            style={{ animationDirection: "reverse", animationDuration: "30s" }}
          >
            <span className="absolute top-1/2 -right-1 size-1.5 -translate-y-1/2 rounded-full bg-brand-300 shadow-[0_0_10px_2px] shadow-brand-400/60" />
          </span>

          {/* fareyi izleyen ışık */}
          <motion.div style={{ background: glow }} className="absolute inset-6 rounded-full blur-3xl" />

          {/* logo */}
          <motion.div
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
            className="relative animate-float"
          >
            <Image
              src="/macria-logo.png"
              alt="Macria logosu"
              width={420}
              height={420}
              priority
              className="w-[7.5rem] drop-shadow-[0_18px_60px_rgba(20,79,214,0.55)] sm:w-[10.5rem] lg:w-[19rem]"
            />
            <div
              className="absolute inset-x-5 -bottom-4 h-6 rounded-[50%] bg-brand-600/35 blur-xl sm:inset-x-8 sm:-bottom-6 sm:h-10 sm:blur-2xl"
              style={{ transform: "translateZ(-60px)" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Kaydırma göstergesi. Mobilde bölüm zaten ekrandan uzun; gösterge ilk
          bakışta görünmediği gibi logonun üstüne de biniyordu. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute inset-x-0 bottom-6 hidden justify-center lg:flex"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-line p-1">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
            className="size-1.5 rounded-full bg-brand-300"
          />
        </div>
      </motion.div>
    </section>
  );
}
