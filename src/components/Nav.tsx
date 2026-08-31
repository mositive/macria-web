"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { nav, site } from "@/lib/site";

export function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 24));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`transition-all duration-300 ${
          solid
            ? "border-b border-line/70 bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-8 sm:py-3.5">
          <a href="#" className="group flex shrink-0 items-center gap-2.5">
            <span className="relative flex size-8 items-center justify-center sm:size-9">
              <span className="absolute inset-0 rounded-xl bg-brand-500/25 blur-md transition-all group-hover:bg-brand-400/45" />
              <Image
                src="/macria-logo.png"
                alt=""
                width={36}
                height={36}
                className="relative size-8 drop-shadow-[0_0_10px_rgba(31,107,240,0.6)] sm:size-9"
              />
            </span>
            <span className="font-display text-base font-semibold tracking-tight text-white sm:text-lg">
              {site.name}
            </span>
          </a>

          {/* 7 bağlantı md genişliğine sığmıyordu; masaüstü menüsü lg'den açılır. */}
          <div className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative rounded-lg px-3.5 py-2 text-sm text-slate-300 transition-colors hover:text-white"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute inset-0 scale-90 rounded-lg bg-white/5 opacity-0 transition-all duration-200 hover:scale-100 hover:opacity-100" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-lg border border-line px-3.5 py-2 text-sm text-slate-300 transition-colors hover:border-brand-500/50 hover:text-white sm:block"
            >
              GitHub
            </a>
            <a
              href="#indir"
              className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-brand-600 to-brand-400 px-3.5 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-600/25 transition-shadow hover:shadow-brand-500/40 sm:px-4 sm:py-2"
            >
              <span className="relative z-10">İndir</span>
              <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/25 opacity-0 transition-opacity group-hover:animate-shimmer group-hover:opacity-100" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={open}
              aria-controls="mobil-menu"
              className="flex size-11 items-center justify-center rounded-lg border border-line text-slate-300 lg:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
              </svg>
            </button>
          </div>
        </nav>

        {/* Menü kapalıyken yüksekliği 0 ama bağlantılar hâlâ DOM'da; `inert`
            olmadan Tab ile görünmeyen linklere odaklanılabiliyordu. */}
        <motion.div
          id="mobil-menu"
          inert={!open}
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden border-t border-line/60 bg-ink/95 backdrop-blur-xl lg:hidden"
        >
          <div className="flex max-h-[calc(100svh-4rem)] flex-col overflow-y-auto px-4 py-2 pb-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3.5 text-[0.95rem] text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-between rounded-lg border border-line px-3 py-3.5 text-[0.95rem] text-slate-300 transition-colors hover:border-brand-500/50 hover:text-white"
            >
              GitHub
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M8 7h9v9" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
