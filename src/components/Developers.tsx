import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { gelistiriciler, type Gelistirici } from "@/lib/site";
import type { Dil, Sozluk } from "@/lib/i18n";

function LinkedInIkonu() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

// Fotoğraf konmadıysa kart boş kalmasın: adın baş harfleri.
function basHarfler(ad: string) {
  const parcalar = ad.trim().split(/\s+/);
  const ilk = parcalar[0] ?? "";
  const son = parcalar.length > 1 ? parcalar[parcalar.length - 1] : "";
  return (ilk.charAt(0) + son.charAt(0)).toLocaleUpperCase("tr-TR");
}

function Kart({ g, dil }: { g: Gelistirici; dil: Dil }) {
  return (
    <a
      href={g.linkedin}
      target="_blank"
      rel="noreferrer"
      className="group glass relative flex h-full items-center gap-4 overflow-hidden rounded-2xl p-5 transition-colors hover:border-brand-400/40 sm:gap-5 sm:p-6"
    >
      <span className="pointer-events-none absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <span className="relative size-16 shrink-0 overflow-hidden rounded-full border border-brand-500/25 bg-brand-500/10 sm:size-[4.5rem]">
        {g.foto ? (
          <Image
            src={g.foto}
            alt={g.ad}
            fill
            sizes="72px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <span className="flex size-full items-center justify-center font-display text-lg font-semibold text-brand-300">
            {basHarfler(g.ad)}
          </span>
        )}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate font-display text-lg font-semibold text-white">
          {g.ad}
        </span>
        <span className="mt-1 block text-sm text-slate-400">{g.rol[dil]}</span>
        <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-brand-300 transition-colors group-hover:text-accent">
          <LinkedInIkonu />
          LinkedIn
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </span>
      </span>
    </a>
  );
}

export function Developers({ dil, s }: { dil: Dil; s: Sozluk }) {
  // Ekip tanımlanmadıysa boş bir başlık basmanın anlamı yok.
  if (gelistiriciler.length === 0) return null;

  return (
    <section id="gelistiriciler" className="relative px-4 py-20 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <div className="font-mono text-[10px] tracking-[0.18em] text-brand-300/80 uppercase">
            {s.gelistiriciler.etiket}
          </div>
          <h2 className="mt-4 font-display text-[1.65rem] leading-tight font-semibold tracking-tight text-white sm:text-5xl">
            {s.gelistiriciler.baslik}
          </h2>
          <p className="mt-4 text-[0.95rem] text-slate-400 sm:text-lg">
            {s.gelistiriciler.aciklama}
          </p>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-3.5 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {gelistiriciler.map((g) => (
            <RevealItem key={g.linkedin}>
              <Kart g={g} dil={dil} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
