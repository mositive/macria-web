"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";
import { Counter } from "./Counter";

// Uygulamadaki hazır malzeme listesinden bir kesit. Fiyatlar örnektir;
// uygulamada birim fiyatı kullanıcı girer.
const malzemeler = [
  { ad: "DKP / St37", yogunluk: 7.85, fiyat: 32 },
  { ad: "Paslanmaz 304", yogunluk: 7.9, fiyat: 145 },
  { ad: "Alüminyum 5754", yogunluk: 2.66, fiyat: 118 },
  { ad: "Bakır", yogunluk: 8.96, fiyat: 420 },
];

const parcalar = [
  { ad: "YAN-PANEL-SOL", kalinlik: 2.0, alan: 0.86, adet: 2 },
  { ad: "TABAN-SACI", kalinlik: 3.0, alan: 1.24, adet: 1 },
  { ad: "KAPAK-ON", kalinlik: 1.5, alan: 0.42, adet: 4 },
  { ad: "BRAKET-U", kalinlik: 4.0, alan: 0.09, adet: 8 },
  { ad: "GUSSET-30", kalinlik: 5.0, alan: 0.06, adet: 6 },
];

const tr = (n: number, basamak = 2) =>
  n.toLocaleString("tr-TR", { minimumFractionDigits: basamak, maximumFractionDigits: basamak });

export function CostDemo() {
  const [secili, setSecili] = useState(0);
  const m = malzemeler[secili];

  const satirlar = useMemo(() => {
    // kg = açınım alanı (m²) × kalınlık (mm) × yoğunluk (g/cm³)
    return parcalar.map((p) => {
      const agirlik = p.alan * p.kalinlik * m.yogunluk * p.adet;
      return { ...p, agirlik, maliyet: agirlik * m.fiyat };
    });
  }, [m]);

  const enAgir = Math.max(...satirlar.map((s) => s.agirlik));
  const enPahali = Math.max(...satirlar.map((s) => s.maliyet));
  const toplamAgirlik = satirlar.reduce((a, s) => a + s.agirlik, 0);
  const toplamMaliyet = satirlar.reduce((a, s) => a + s.maliyet, 0);

  return (
    <section id="maliyet" className="relative px-4 py-20 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-10 sm:gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        {/* --- metin --- */}
        <Reveal className="lg:order-2">
          <h2 className="font-display text-[1.65rem] leading-tight font-semibold tracking-tight text-white sm:text-4xl">
            Teklif İçin Tabloyu Beklemeyin.
          </h2>
          <p className="mt-4 text-[0.95rem] text-slate-400 sm:text-lg">
            Açınım alanı, kalınlık ve malzeme yoğunluğu zaten elinizde. Macria bunları
            birleştirip her parçanın ağırlığını ve maliyetini listeyle birlikte verir.
            Malzemeyi değiştirin, bütün tablo anında yeniden hesaplansın.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4">
            <div className="glass rounded-xl p-4 sm:p-5">
              <div className="font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">
                Toplam ağırlık
              </div>
              <div className="mt-2 font-display text-xl font-semibold text-white tabular-nums sm:text-2xl">
                <Counter value={toplamAgirlik} decimals={1} /> <span className="text-sm font-normal text-slate-500 sm:text-base">kg</span>
              </div>
            </div>
            <div className="glass rounded-xl p-4 sm:p-5">
              <div className="font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">
                Toplam maliyet
              </div>
              <div className="mt-2 font-display text-xl font-semibold text-white tabular-nums sm:text-2xl">
                <Counter value={toplamMaliyet} decimals={0} /> <span className="text-sm font-normal text-slate-500 sm:text-base">₺</span>
              </div>
            </div>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-slate-500">
            Yoğunluklar uygulamada hazır gelir; listede olmayan bir alaşımı kendiniz
            ekleyebilirsiniz. Birim fiyat sizindir — buradaki değerler yalnızca örnek.
          </p>
        </Reveal>

        {/* --- tablo --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="lg:order-1"
        >
          {/* malzeme seçimi */}
          <div className="mb-4 flex flex-wrap gap-2">
            {malzemeler.map((mal, i) => (
              <button
                key={mal.ad}
                type="button"
                onClick={() => setSecili(i)}
                className={`relative rounded-lg px-3.5 py-2.5 text-xs font-medium transition-colors ${
                  i === secili ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {i === secili && (
                  <motion.span
                    layoutId="malzeme-secim"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-lg border border-brand-400/40 bg-brand-500/15"
                  />
                )}
                <span className="relative">{mal.ad}</span>
              </button>
            ))}
          </div>

          <div className="glass overflow-hidden rounded-2xl shadow-2xl shadow-brand-950/60">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-line/70 bg-white/[0.03] px-3 py-3 sm:px-4">
              <span className="font-mono text-xs text-slate-400">Maliyet tablosu</span>
              <span className="font-mono text-[10px] text-slate-500">
                {tr(m.yogunluk)} g/cm³ · {tr(m.fiyat, 0)} ₺/kg
              </span>
            </div>

            {/* "Alan m²" mobilde gizli — kalan dört sütun 320 px'e sığıyor,
                böylece tablo yatay kaydırma istemiyor. */}
            <div className="scroll-x">
              <table className="w-full text-xs sm:min-w-[30rem]">
                <thead>
                  <tr className="border-b border-line/60 font-mono text-[10px] tracking-wider text-slate-500 uppercase">
                    <th className="px-2.5 py-2.5 text-left font-normal sm:px-4">Parça</th>
                    <th className="px-2 py-2.5 text-right font-normal sm:px-3">Kal.</th>
                    <th className="hidden px-3 py-2.5 text-right font-normal sm:table-cell">Alan m²</th>
                    <th className="px-2 py-2.5 text-right font-normal sm:px-3">Ağırlık</th>
                    <th className="px-2.5 py-2.5 text-right font-normal sm:px-4">Maliyet</th>
                  </tr>
                </thead>
                <tbody>
                  {satirlar.map((s, i) => (
                    <motion.tr
                      key={s.ad}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                      className="border-b border-line/40 last:border-0"
                    >
                      <td className="px-2.5 py-3 font-mono text-slate-200 sm:px-4">{s.ad}</td>
                      <td className="px-2 py-3 text-right font-mono text-slate-400 sm:px-3">
                        {tr(s.kalinlik, 1)}
                      </td>
                      <td className="hidden px-3 py-3 text-right font-mono text-slate-400 sm:table-cell">
                        {tr(s.alan)}
                      </td>
                      {/* ısı haritası: her sütun kendi içinde tonlanır */}
                      <td
                        className="px-2 py-3 text-right font-mono text-slate-100 tabular-nums transition-colors duration-500 sm:px-3"
                        style={{ background: `rgba(31,107,240,${(s.agirlik / enAgir) * 0.26})` }}
                      >
                        <Counter value={s.agirlik} decimals={1} /> kg
                      </td>
                      <td
                        className="px-2.5 py-3 text-right font-mono text-slate-100 tabular-nums transition-colors duration-500 sm:px-4"
                        style={{ background: `rgba(34,211,238,${(s.maliyet / enPahali) * 0.22})` }}
                      >
                        <Counter value={s.maliyet} decimals={0} /> ₺
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-line bg-white/[0.03] font-medium">
                    {/* Alan sütunu mobilde gizlendiği için birleştirme iki hücre */}
                    <td className="px-2.5 py-3 font-mono text-slate-400 sm:px-4" colSpan={2}>
                      Toplam
                    </td>
                    <td className="hidden sm:table-cell" />
                    <td className="px-2 py-3 text-right font-mono text-white tabular-nums sm:px-3">
                      <Counter value={toplamAgirlik} decimals={1} /> kg
                    </td>
                    <td className="px-2.5 py-3 text-right font-mono text-accent tabular-nums sm:px-4">
                      <Counter value={toplamMaliyet} decimals={0} /> ₺
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
