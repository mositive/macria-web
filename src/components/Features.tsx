"use client";

import type { ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { RevealGroup, RevealItem, Reveal } from "./Reveal";
import { site } from "@/lib/site";
import type { Sozluk } from "@/lib/i18n";

// Yalnızca ikonlar; başlık ve metin sözlükte (features.kartlar). İkisinin
// sırası aynı, dizideki i'inci ikon i'inci kartın ikonu.
const ikonlar: ReactNode[] = [
  <>
    <path d="M13 2v6h6" />
    <path d="M19 8.5V20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h6z" />
    <path d="M8.5 17.5h7" />
  </>,
  <>
    <rect x="3" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="9" width="7" height="5" rx="1" />
    <rect x="14" y="17" width="7" height="4" rx="1" />
    <path d="M6.5 8v9.5a1.5 1.5 0 0 0 1.5 1.5h6M8 11.5h6" />
  </>,
  <>
    <path d="M12 3v18M7 7h10" />
    <path d="M7 7l-3.5 7a3.5 3.5 0 0 0 7 0z" />
    <path d="M17 7l-3.5 7a3.5 3.5 0 0 0 7 0z" />
  </>,
  <>
    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
    <circle cx="12" cy="12" r="2.5" />
  </>,
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M8 8h8M8 12h4M8 16h6" />
  </>,
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 10h18M3 15h18M9 4v16M15 4v16" />
  </>,
  <>
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </>,
  <>
    <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9z" />
    <path d="M12 20v-9l8-4.5M12 11L4 6.5" />
  </>,
];

function Card({
  baslik,
  metin,
  ikon,
}: {
  baslik: string;
  metin: string;
  ikon: ReactNode;
}) {
  // Kartın üzerindeki ışık lekesi imleci takip eder.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spot = useMotionTemplate`radial-gradient(340px circle at ${mx}px ${my}px, rgba(63,141,255,0.14), transparent 72%)`;

  return (
    <motion.div
      onPointerMove={(e) => {
        // Dokunmatikte parmak sürüklerken ışık lekesini kovalamanın anlamı yok.
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group glass relative h-full overflow-hidden rounded-2xl p-5 transition-colors duration-300 hover:border-brand-400/35 sm:p-6"
    >
      <motion.div style={{ background: spot }} className="pointer-events-none absolute inset-0" />

      {/* üst kenardaki ışık çizgisi */}
      <span className="pointer-events-none absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        <span className="flex size-11 items-center justify-center rounded-xl border border-brand-500/25 bg-brand-500/10 text-brand-300 transition-all duration-300 group-hover:scale-105 group-hover:border-brand-400/50 group-hover:text-accent group-hover:shadow-[0_0_22px_-4px] group-hover:shadow-brand-400/60">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            {ikon}
          </svg>
        </span>
        <h3 className="mt-4 font-display text-lg font-semibold text-white sm:mt-5">{baslik}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{metin}</p>
      </div>
    </motion.div>
  );
}

export function Features({ s }: { s: Sozluk }) {
  return (
    <section id="ozellikler" className="relative px-4 py-20 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-[1.65rem] leading-tight font-semibold tracking-tight text-white sm:text-5xl">
            {s.features.baslik}
          </h2>
          <p className="mt-4 text-[0.95rem] text-slate-400 sm:text-lg">{s.features.aciklama}</p>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-3.5 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {s.features.kartlar.map((kart, i) => (
            <RevealItem key={kart.baslik}>
              <Card baslik={kart.baslik} metin={kart.metin} ikon={ikonlar[i]} />
            </RevealItem>
          ))}

          {/* öneri kartı */}
          <RevealItem>
            <a
              href={`${site.github}/issues`}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col justify-between rounded-2xl border border-dashed border-brand-500/25 bg-brand-500/[0.04] p-5 transition-colors hover:border-brand-400/50 hover:bg-brand-500/[0.08] sm:p-6"
            >
              <div>
                <span className="flex size-11 items-center justify-center rounded-xl border border-brand-500/25 bg-brand-500/10 text-brand-300 transition-transform duration-300 group-hover:scale-105">
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-white sm:mt-5">
                  {s.features.oneri.baslik}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                  {s.features.oneri.metin}
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-300 transition-colors group-hover:text-accent">
                {s.features.oneri.tus}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
