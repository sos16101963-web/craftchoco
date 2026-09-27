"use client";

import { useEffect, useRef } from "react";
import { journey, clamp } from "@/lib/journey";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

/**
 * HUD темперирования: индикатор 45 °C → 31 °C по мере погружения.
 * Фиксирован внизу слева, исчезает после прохождения маршрута.
 */
export default function TemperingHUD({ locale }: { locale: Locale }) {
  const t = getDict(locale).journey.hud;
  const wrapRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const tempRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const p = journey.progress;
      if (wrapRef.current) {
        // скрываем HUD после финиша
        const o = clamp(1 - (p - 0.9) / 0.08, 0, 1);
        wrapRef.current.style.opacity = String(o);
      }
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${p})`;
      }
      if (tempRef.current) {
        // 45 °C на старте → 31 °C в конце (реальные шаги темперирования Callebaut)
        tempRef.current.textContent = `${(45 - 14 * p).toFixed(0)} °C`;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none fixed bottom-5 left-5 z-20 hidden select-none sm:block"
    >
      <div className="rounded-2xl border border-gold-500/25 bg-choco-950/60 px-4 py-3 backdrop-blur-xl">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold-300/80">
          {t.kicker}
        </p>
        <div className="mt-2 flex items-baseline gap-2">
          <span
            ref={tempRef}
            className="font-display text-xl font-bold text-cream"
          >
            45 °C
          </span>
          <span className="text-[11px] text-cream/50">{t.ready}</span>
        </div>
        <div className="mt-2 h-1 w-44 overflow-hidden rounded-full bg-white/10">
          <div
            ref={barRef}
            className="h-full w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-200"
          />
        </div>
      </div>
    </div>
  );
}
