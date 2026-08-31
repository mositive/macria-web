import Image from "next/image";
import { nav, site } from "@/lib/site";
import type { SurumBilgisi } from "@/lib/github";

export function Footer({ surum }: { surum: SurumBilgisi }) {
  return (
    <footer className="relative border-t border-line/70 px-4 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-8 sm:py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/macria-logo.png"
            alt=""
            width={34}
            height={34}
            className="drop-shadow-[0_0_10px_rgba(31,107,240,0.5)]"
          />
          <div>
            <div className="font-display font-semibold text-white">{site.name}</div>
            <div className="text-xs text-slate-500">{site.tagline}</div>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-1">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-1.5 text-sm text-slate-400 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="py-1.5 text-sm text-slate-400 transition-colors hover:text-white"
          >
            GitHub
          </a>
        </nav>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 border-t border-line/50 pt-6 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name} · Sürüm {surum.surum}
        </p>
        <p>
          CATIA ve 3DEXPERIENCE, Dassault Systèmes&apos;in tescilli markalarıdır.
          Bu proje Dassault Systèmes ile ilişkili değildir.
        </p>
      </div>
    </footer>
  );
}
