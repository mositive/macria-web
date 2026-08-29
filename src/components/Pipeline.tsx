"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Reveal } from "./Reveal";

const steps = [
  {
    n: "01",
    t: "Bağlanır",
    d: "Açık olan 3DEXPERIENCE (CATIA V6) oturumuna COM üzerinden bağlanır. ProgID bulunamayan kurumsal makinelerde CLSID ve ROT taramasına düşer.",
    icon: (
      <>
        <path d="M9 7V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3" />
        <rect x="4" y="7" width="16" height="6" rx="2" />
        <path d="M12 13v4M9 21h6" />
      </>
    ),
  },
  {
    n: "02",
    t: "Ağacı tarar",
    d: "Aktif montajın ürün ağacını baştan sona gezer, sac (sheet metal) parçaları ayıklar ve tekrar edenleri adet olarak toplar.",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="9" width="7" height="5" rx="1" />
        <rect x="14" y="17" width="7" height="4" rx="1" />
        <path d="M6.5 8v9.5a1.5 1.5 0 0 0 1.5 1.5h6M8 11.5h6" />
      </>
    ),
  },
  {
    n: "03",
    t: "Tabloya döker",
    d: "Ürün adı, parça adı, kalınlık ve adet tek tabloda. Sütunları siz seçersiniz, kendi formül sütunlarınızı eklersiniz.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M3 14.5h18M9 9v11M15 9v11" />
      </>
    ),
  },
  {
    n: "04",
    t: "İşi devralır",
    d: "Seçtiğiniz aracı çalıştırır: DXF aktarımında panelleri sizin yerinize sürer, maliyet aracında tabloyu hesaplar. Üstte duran ilerleme penceresi ve acil durdurma hep elinizin altında.",
    icon: (
      <>
        <path d="M13 2v6h6" />
        <path d="M19 8.5V20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h6z" />
        <path d="M9 15l2.5 2.5L15 13" />
      </>
    ),
  },
];

export function Pipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  const height = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section id="akis" className="relative px-4 py-20 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-[1.65rem] leading-tight font-semibold tracking-tight text-white sm:text-5xl">
            Dört Adım, Tek Pencere.
          </h2>
          <p className="mt-4 text-[0.95rem] text-slate-400 sm:text-lg">
            Hangi aracı kullanırsanız kullanın akış aynı — ve araç seti büyüdükçe de aynı
            kalacak. Uygulamayı açın, montaj zaten 3DEXPERIENCE&apos;ta açıksa gerisi
            kendiliğinden gelir.
          </p>
        </Reveal>

        <div ref={ref} className="relative mt-12 sm:mt-16 lg:mt-20">
          {/* dikey ilerleme çizgisi — düğümün ortasına hizalı */}
          <div className="absolute top-2 bottom-2 left-[23px] w-px bg-line sm:left-[27px] md:left-1/2 md:-translate-x-1/2">
            <motion.div
              style={{ height }}
              className="w-full bg-gradient-to-b from-brand-400 via-brand-500 to-accent shadow-[0_0_16px_2px] shadow-brand-500/40"
            />
          </div>

          <ol className="space-y-8 sm:space-y-10 md:space-y-16">
            {steps.map((s, i) => (
              <li
                key={s.n}
                className="relative flex items-start gap-4 sm:gap-5 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-0"
              >
                {/* düğüm — mobilde solda, masaüstünde ortada */}
                <div className="shrink-0 md:col-start-2 md:row-start-1 md:px-8">
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-90px" }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                    className="relative flex size-12 items-center justify-center rounded-full border border-brand-500/35 bg-ink font-mono text-sm font-medium text-brand-300 sm:size-14"
                  >
                    <span
                      className="absolute inset-0 animate-pulse-ring rounded-full border border-brand-400/30"
                      style={{ animationDelay: `${i * 0.4}s` }}
                    />
                    {s.n}
                  </motion.span>
                </div>

                {/* kart — masaüstünde dönüşümlü olarak sağ ve sol sütun */}
                <motion.div
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-90px" }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className={`min-w-0 flex-1 md:row-start-1 ${
                    i % 2 ? "md:col-start-3 md:pl-14" : "md:col-start-1 md:pr-14 md:text-right"
                  }`}
                >
                  <div className="group glass rounded-2xl p-5 transition-all duration-300 hover:border-brand-400/40 hover:shadow-[0_0_40px_-12px] hover:shadow-brand-500/40 sm:p-6">
                    <div className={`flex items-center gap-3 ${i % 2 ? "" : "md:flex-row-reverse"}`}>
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-brand-500/25 bg-brand-500/10 text-brand-300 transition-colors group-hover:border-brand-400/50 group-hover:text-accent sm:size-10">
                        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                          {s.icon}
                        </svg>
                      </span>
                      <h3 className="font-display text-lg font-semibold text-white sm:text-xl">{s.t}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{s.d}</p>
                  </div>
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
