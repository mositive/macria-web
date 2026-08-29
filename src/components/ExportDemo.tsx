"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Reveal } from "./Reveal";

const parts = [
  { ad: "YAN-PANEL-SOL", kalinlik: "2,0", adet: 2 },
  { ad: "TABAN-SACI", kalinlik: "3,0", adet: 1 },
  { ad: "KAPAK-ON", kalinlik: "1,5", adet: 4 },
  { ad: "BRAKET-U", kalinlik: "4,0", adet: 8 },
  { ad: "ARKA-KAPAK", kalinlik: "2,0", adet: 1 },
  { ad: "GUSSET-30", kalinlik: "5,0", adet: 6 },
  { ad: "MENTESE-PLK", kalinlik: "3,0", adet: 4 },
];

const STEP_MS = 620;

export function ExportDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-120px" });
  const [done, setDone] = useState(0);

  // Bölüm ekrandayken aktarımı ilerlet; sona gelince kısa bir bekleyip baştan al.
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setDone((d) => (d > parts.length ? 0 : d + 1));
    }, STEP_MS);
    return () => clearInterval(id);
  }, [inView]);

  const pct = Math.min(100, Math.round((Math.min(done, parts.length) / parts.length) * 100));
  const finished = done >= parts.length;

  return (
    <section id="dxf" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-white sm:text-4xl">
            Yüz Parçalık Montajda Da Tek Tuş.
          </h2>
          <p className="mt-4 text-slate-400 sm:text-lg">
            Parçaları tek tek açıp &quot;Save As DXF&quot; demek yerine listeyi seçip başlatın.
            Macria panelleri sizin yerinize sürer; her adımda hangi parçada olduğunuzu
            gösteren küçük pencere bütün uygulamaların üstünde kalır.
          </p>

          <ul className="mt-8 space-y-3.5">
            {[
              "Seçili parça ya da listenin tamamı",
              "Üstte duran ilerleme penceresi (PiP)",
              "Tek tuşla acil durdurma",
              "Aktarım biter bitmez klasörü aç",
            ].map((t, i) => (
              <motion.li
                key={t}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className="flex items-start gap-3 text-sm text-slate-300"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-accent">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                {t}
              </motion.li>
            ))}
          </ul>
        </Reveal>

        {/* --- sahte uygulama penceresi --- */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40, rotateX: 12 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
          style={{ perspective: 1400 }}
        >
          <div className="glass overflow-hidden rounded-2xl shadow-2xl shadow-brand-950/60">
            {/* başlık çubuğu */}
            <div className="flex items-center gap-2 border-b border-line/70 bg-white/[0.03] px-4 py-3">
              <span className="size-2.5 rounded-full bg-slate-600" />
              <span className="size-2.5 rounded-full bg-slate-600" />
              <span className="size-2.5 rounded-full bg-brand-500" />
              <span className="ml-2 font-mono text-xs text-slate-400">
                Macria — Montaj1
              </span>
            </div>

            {/* tablo */}
            <div className="p-4">
              <div className="grid grid-cols-[1fr_3.2rem_2.6rem_1.6rem] gap-2 border-b border-line/60 px-2 pb-2 font-mono text-[10px] tracking-wider text-slate-500 uppercase">
                <span>Parça</span>
                <span className="text-right">Kal.</span>
                <span className="text-right">Adet</span>
                <span />
              </div>

              <ul className="mt-1">
                {parts.map((p, i) => {
                  const state = i < done ? "ok" : i === done ? "run" : "wait";
                  return (
                    <li
                      key={p.ad}
                      className={`grid grid-cols-[1fr_3.2rem_2.6rem_1.6rem] items-center gap-2 rounded-lg px-2 py-2 text-xs transition-colors duration-300 ${
                        state === "run" ? "bg-brand-500/10" : ""
                      }`}
                    >
                      <span
                        className={`truncate font-mono transition-colors duration-300 ${
                          state === "wait" ? "text-slate-500" : "text-slate-200"
                        }`}
                      >
                        {p.ad}
                      </span>
                      <span className="text-right font-mono text-slate-400">{p.kalinlik}</span>
                      <span className="text-right font-mono text-slate-400">{p.adet}</span>
                      <span className="flex justify-end">
                        <AnimatePresence mode="wait" initial={false}>
                          {state === "ok" && (
                            <motion.svg
                              key="ok"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-accent"
                            >
                              <path d="M20 6L9 17l-5-5" />
                            </motion.svg>
                          )}
                          {state === "run" && (
                            <motion.span
                              key="run"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1, rotate: 360 }}
                              exit={{ scale: 0 }}
                              transition={{
                                rotate: { duration: 0.9, repeat: Infinity, ease: "linear" },
                                scale: { duration: 0.2 },
                              }}
                              className="size-3.5 rounded-full border-2 border-brand-400/25 border-t-brand-300"
                            />
                          )}
                          {state === "wait" && (
                            <motion.span
                              key="wait"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="size-1.5 rounded-full bg-slate-700"
                            />
                          )}
                        </AnimatePresence>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* ilerleme */}
            <div className="border-t border-line/70 bg-white/[0.02] px-5 py-4">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className={finished ? "text-accent" : "text-slate-400"}>
                  {finished
                    ? "Aktarım tamamlandı"
                    : `Aktarılıyor — ${parts[Math.min(done, parts.length - 1)].ad}`}
                </span>
                <span className="text-slate-300">
                  {Math.min(done, parts.length)}/{parts.length}
                </span>
              </div>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-line">
                <motion.div
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent shadow-[0_0_12px_1px] shadow-brand-400/50"
                />
              </div>
            </div>
          </div>

          {/* üstte duran küçük ilerleme penceresi */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -right-3 -bottom-7 w-[15rem] rounded-xl border border-brand-400/25 bg-ink-2/95 p-3.5 shadow-2xl shadow-brand-950/80 backdrop-blur-xl sm:-right-8"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-wider text-brand-300 uppercase">
                DXF aktarımı
              </span>
              <span className="font-mono text-[10px] text-slate-500">%{pct}</span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-line">
              <motion.div
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="h-full rounded-full bg-accent"
              />
            </div>
            <button
              type="button"
              tabIndex={-1}
              aria-hidden
              className="mt-3 w-full rounded-lg border border-red-500/30 bg-red-500/10 py-1.5 text-[11px] font-medium text-red-300"
            >
              Durdur
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
