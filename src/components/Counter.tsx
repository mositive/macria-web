"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValueEvent, useSpring } from "motion/react";
import { bicimEtiketi, varsayilanDil, type Dil } from "@/lib/i18n";

/**
 * Görünür alana girince 0'dan hedefe sayan sayı. Değer sonradan değişirse
 * (örneğin malzeme seçimi) yeni değere yumuşak geçer.
 *
 * Ondalık ayracı dile bağlı: Türkçede 12,4 — İngilizcede 12.4.
 */
export function Counter({
  value,
  decimals = 0,
  dil = varsayilanDil,
}: {
  value: number;
  decimals?: number;
  dil?: Dil;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { margin: "-40px" });
  const spring = useSpring(0, { stiffness: 95, damping: 22, restDelta: 0.005 });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (inView) spring.set(value);
  }, [inView, value, spring]);

  useMotionValueEvent(spring, "change", (v) => setShown(v));

  return (
    <span ref={ref}>
      {shown.toLocaleString(bicimEtiketi[dil], {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
}
