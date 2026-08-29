"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";
import { release } from "@/lib/release";
import { virustotal } from "@/lib/virustotal";
import { site } from "@/lib/site";

const boyutMB = (release.boyutBayt / 1024 / 1024).toLocaleString("tr-TR", {
  maximumFractionDigits: 0,
});

function VirusTotalPaneli() {
  const vt = virustotal;
  const [kopyalandi, setKopyalandi] = useState(false);

  async function ozetiKopyala() {
    try {
      await navigator.clipboard.writeText(release.sha256);
      setKopyalandi(true);
      setTimeout(() => setKopyalandi(false), 2000);
    } catch {
      // pano kapalıysa sessiz geç; özet zaten ekranda seçilebilir durumda
    }
  }

  // Rapor henüz yoksa panel boş durmasın: kullanıcı dosyayı kendi doğrulasın.
  if (!vt) {
    return (
      <div className="glass relative overflow-hidden rounded-2xl border-dashed p-5 sm:p-10">
        <span className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-brand-500/10 blur-[90px]" />

        <div className="relative">
          <div className="font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">
            VirusTotal
          </div>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
            Bu sürümün tarama raporu henüz hazır değil. Ama beklemenize gerek yok:
            indirdiğiniz dosyanın{" "}
            <span className="text-white">bizim yayınladığımız dosyanın aynısı</span>{" "}
            olduğunu şimdi kendiniz doğrulayabilirsiniz.
          </p>

          <div className="mt-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">
                {release.dosya} · {boyutMB} MB · SHA-256
              </span>
              <button
                type="button"
                onClick={ozetiKopyala}
                className="rounded-lg border border-line px-3.5 py-2.5 font-mono text-[10px] tracking-[0.14em] text-slate-400 uppercase transition-colors hover:border-brand-400/50 hover:text-white"
              >
                {kopyalandi ? "Kopyalandı" : "Kopyala"}
              </button>
            </div>
            <p className="mt-2 rounded-xl border border-line bg-white/[0.03] p-4 font-mono text-[11px] leading-relaxed break-all text-slate-300">
              {release.sha256}
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-line/60 bg-white/[0.02] p-4">
            <p className="text-xs leading-relaxed text-slate-400">
              İndirdiğiniz dosyanın bulunduğu klasörde PowerShell&apos;i açıp şunu
              çalıştırın — çıkan özet yukarıdakiyle birebir aynı olmalı:
            </p>
            <code className="scroll-x mt-2 block font-mono text-[11px] whitespace-nowrap text-brand-300">
              Get-FileHash .\{release.dosya} -Algorithm SHA256
            </code>
          </div>

          <div className="mt-6 flex flex-col gap-x-7 gap-y-4 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={`https://www.virustotal.com/gui/file/${release.sha256}`}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-medium text-brand-300 transition-colors hover:text-accent"
            >
              Bu özeti VirusTotal&apos;de sorgula
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
            >
              Kaynak kodu incele
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
  }

  const temiz = vt.tespit === 0;

  return (
    <a
      href={vt.url}
      target="_blank"
      rel="noreferrer"
      className="group glass relative block overflow-hidden rounded-2xl p-5 transition-colors hover:border-brand-400/40 sm:p-10"
    >
      <span className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-brand-500/10 blur-[90px]" />

      <div className="relative flex flex-col gap-6 sm:gap-8 md:flex-row md:items-center md:justify-between">
        {/* Mobilde alt alta: oran + ayraç + açıklama tek satıra sığmıyordu. */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
          {/* oran */}
          <div>
            <div className="font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">
              VirusTotal
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`font-display text-5xl leading-none font-semibold sm:text-6xl ${
                  temiz ? "text-accent" : "text-amber-300"
                }`}
              >
                {vt.tespit}
              </motion.span>
              <span className="font-display text-xl text-slate-500 sm:text-2xl">/ {vt.toplam}</span>
            </div>
          </div>

          <div className="hidden h-16 w-px bg-line sm:block" />

          <div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-300">
              {temiz
                ? "Hiçbir antivirüs motoru tehdit bulmadı."
                : `${vt.tespit} motor dosyayı işaretledi — ayrıntı için rapora bakın.`}
            </p>
            <p className="mt-2 font-mono text-[11px] text-slate-500">
              {release.dosya} · {boyutMB} MB ·{" "}
              {new Date(vt.tarandi).toLocaleDateString("tr-TR")}
            </p>
          </div>
        </div>

        <span className="inline-flex shrink-0 items-center justify-center gap-2 self-stretch rounded-xl border border-line bg-white/[0.03] px-5 py-3.5 text-sm font-medium text-slate-200 transition-all group-hover:border-brand-400/50 group-hover:text-white md:self-auto md:py-3">
          Raporu aç
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-0.5">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>

      {/* her motor için bir çentik; sırayla yanarak taramayı anlatır */}
      <div className="relative mt-7 border-t border-line/60 pt-5 sm:mt-8 sm:pt-6">
        <div className="flex flex-wrap justify-center gap-[4px] sm:gap-[5px]">
          {Array.from({ length: vt.toplam }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scaleY: 0.3 }}
              whileInView={{ opacity: 1, scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.32, delay: i * 0.014, ease: [0.22, 1, 0.36, 1] }}
              className={`h-4 w-[5px] rounded-full ${
                i < vt.tespit ? "bg-amber-300" : "bg-accent/55"
              }`}
            />
          ))}
        </div>
        <p className="mt-4 text-center font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">
          {vt.toplam} motor tarandı
        </p>
      </div>
    </a>
  );
}

export function Security() {
  return (
    <section id="guvenlik" className="relative px-4 py-20 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-[1.65rem] leading-tight font-semibold tracking-tight text-white sm:text-5xl">
            İndirdiğiniz Dosyanın Ne Olduğunu Bilin.
          </h2>
          <p className="mt-4 text-[0.95rem] text-slate-400 sm:text-lg">
            Kurumsal bir makineye indirdiğiniz imzasız bir exe&apos;ye körü körüne
            güvenmenizi beklemiyoruz.{" "}
            {virustotal
              ? "Yayınlanan dosya VirusTotal'de taranıyor, sonuç aşağıda."
              : "Yayınlanan dosyanın parmak izi aşağıda — indirdiğinizle karşılaştırın."}
          </p>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <VirusTotalPaneli />
        </motion.div>

        {/* imza notu */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 flex flex-col gap-3 rounded-2xl border border-line/60 bg-white/[0.02] p-4 text-xs leading-relaxed text-slate-400 sm:flex-row sm:items-center sm:p-5"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-brand-300">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <p>
            <span className="text-slate-200">Bu program henüz imzalanmamıştır.</span> Bu yüzden
            Windows SmartScreen ilk açılışta sizi uyarabilir. {" "}
            <span className="font-mono text-slate-300"> Ek bilgi → Yine de çalıştır</span> seçimini yaparak programı kullanmaya başlayabilirsiniz.
            Uyarı dosyanın zararlı olduğunu değil, imzasının henüz tanınmadığını belirtmektedir. 
          </p>
        </motion.div>
      </div>
    </section>
  );
}
