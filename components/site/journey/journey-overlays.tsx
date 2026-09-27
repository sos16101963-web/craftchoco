"use client";

import { useEffect, useRef } from "react";
import { ChevronDown, ShoppingBag } from "lucide-react";
import { journey, clamp } from "@/lib/journey";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { formatProductPrice, products } from "@/lib/products";
import { trackEvent } from "@/lib/analytics";

/**
 * HTML-оверлеи, синхронизированные со скроллом по 3D-маршруту.
 * Прозрачность и сдвиг управляются напрямую через rAF (без ре-рендеров).
 *
 * Секции: 0 — герой, 1..3 — витрины товаров, 4 — Врата вкуса.
 */

const STATION_PRODUCTS = ["set-sixteen", "roses-marble", "art-bars"]
  .map((id) => products.find((p) => p.id === id)!)
  .filter(Boolean);



export default function JourneyOverlays({ locale }: { locale: Locale }) {
  const t = getDict(locale).journey.overlays;
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const progressLogged = useRef<Set<string>>(new Set());

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const p = journey.progress;
      const v = p * 4;

      // затемнение героя после начала скролла
      if (heroRef.current) {
        const heroFade = clamp(1 - p * 8, 0, 1);
        heroRef.current.style.opacity = String(heroFade);
        heroRef.current.style.transform = `translateY(${-p * 220}px)`;
      }

      refs.current.forEach((el, k) => {
        if (!el) return;
        const o = clamp(1 - Math.abs(v - k) * 1.6, 0, 1);
        el.style.opacity = String(o);
        // трансформ анимируем на внутреннем слое, чтобы не сбивать
        // центрирование внешнего (translate-x/y из Tailwind)
        const inner = el.firstElementChild as HTMLElement | null;
        if (inner) inner.style.transform = `translateY(${(1 - o) * 30}px)`;
        const card = el.querySelector<HTMLElement>("[data-interactive]");
        if (card) card.style.pointerEvents = o > 0.4 ? "auto" : "none";
      });

      // аналитика глубины погружения (один раз на порог)
      if (typeof window !== "undefined") {
        for (const mark of [25, 50, 75]) {
          if (p * 100 >= mark && !progressLogged.current.has(`j${mark}`)) {
            progressLogged.current.add(`j${mark}`);
            trackEvent("journey_progress", { percent: mark });
          }
        }
        if (p > 0.95 && !progressLogged.current.has("done")) {
          progressLogged.current.add("done");
          trackEvent("journey_complete");
        }
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {/* ——— Секция 0: герой ——— */}
      <div
        ref={heroRef}
        className="absolute inset-0 flex flex-col items-center justify-end pb-[13vh]"
      >
        <div className="px-6 text-center" data-interactive>
          <p className="font-display text-4xl font-bold tracking-tight text-cream drop-shadow-[0_0_32px_rgba(255,193,110,0.4)] sm:text-6xl lg:text-8xl" role="presentation">
            CRAFTCHOCO
            <span className="block text-gold-400 sm:inline">KHARKIV</span>
          </p>
          <p className="mx-auto mt-5 max-w-xl text-balance text-sm leading-relaxed text-cream/85 sm:text-base">
            {t.heroSub}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#catalog"
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-gold-400/50 bg-gold-500/15 px-6 py-3 text-sm font-medium text-gold-200 backdrop-blur transition-colors hover:bg-gold-500/25"
            >
              <ShoppingBag className="h-4 w-4" /> {t.toCatalog}
            </a>
          </div>
        </div>
        <div className="mt-9 flex flex-col items-center gap-1 text-gold-200/70">
          <span className="text-[11px] uppercase tracking-[0.3em]">
            {t.scrollHint}
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </div>
      </div>

      {/* ——— Секции 1..3: витрины товаров ——— */}
      {STATION_PRODUCTS.map((product, i) => (
        <div
          key={product.id}
          ref={(el) => {
            refs.current[i + 1] = el;
          }}
          className={`absolute bottom-32 left-1/2 -translate-x-1/2 sm:bottom-auto sm:left-auto sm:top-1/2 sm:translate-x-0 sm:-translate-y-1/2 ${
            i % 2 === 0 ? "sm:right-14" : "sm:left-14"
          } w-[min(92vw,360px)] opacity-0`}
        >
          <StationCard product={product} hint={t.hints[i]} stationHint={t.stationHint} />
        </div>
      ))}

      {/* ——— Секция 4: Врата вкуса ——— */}
      <div
        ref={(el) => {
          refs.current[4] = el;
        }}
        className="absolute inset-0 flex items-center justify-center opacity-0"
      >
        <div className="px-6 text-center" data-interactive>
          <p className="font-display text-xs uppercase tracking-[0.5em] text-gold-300">
            {t.gateKicker}
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold text-cream sm:text-6xl">
            {t.gateTitle[0]}
            <br />
            {t.gateTitle[1]}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-cream/80 sm:text-base">
            {t.gateText}
          </p>
          <a
            href="#catalog"
            className="pointer-events-auto mt-7 inline-flex items-center gap-2 rounded-full border border-gold-400/50 bg-gold-500/15 px-7 py-3 text-sm font-medium text-gold-200 backdrop-blur transition-colors hover:bg-gold-500/25"
          >
            {t.gateCta}
          </a>
        </div>
      </div>
    </div>
  );
}

function StationCard({
  product,
  hint,
  stationHint,
}: {
  product: (typeof products)[number];
  hint: string;
  stationHint: string;
}) {
  return (
    <div
      data-interactive
      className="pointer-events-none rounded-2xl border border-gold-500/25 bg-choco-950/70 p-5 shadow-[0_0_44px_rgba(255,180,94,0.14)] backdrop-blur-xl sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[11px] text-cream/85">
          {product.categoryLabel}
        </span>
        <span className="text-[11px] uppercase tracking-widest text-gold-300/70">
          {hint}
        </span>
      </div>

      <h3 className="font-display mt-3 text-lg font-bold leading-snug text-cream sm:text-xl">
        {product.name}
      </h3>
      <p className="mt-1 text-xs italic text-gold-200/80">{product.character}</p>
      <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-cream/75">
        {product.short}
      </p>

      <div className="mt-5">
        <div className="text-[11px] uppercase tracking-widest text-cream/50">
          {product.weight}
        </div>
        <div className="font-display mt-1 text-2xl font-bold text-cream">
          {formatProductPrice(product)}
        </div>
      </div>
      <p className="mt-3 text-[11px] text-cream/50">
        {stationHint}
      </p>
    </div>
  );
}
