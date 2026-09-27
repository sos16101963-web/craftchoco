"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

type FilmChapterProps = {
  id: string;
  src: string;
  alt: string;
  /** Метка главы, например «Глава X · Коллекция» */
  chapter: string;
  /** Крупный межтитульный заголовок */
  title: string;
  /** Подзаголовок под межтитров */
  lead?: string;
  /** Высота сцены в vh (по умолчанию 160) */
  stageHeight?: number;
  /** Насколько «входим» в кадр (доля зума, по умолчанию 0.9) */
  zoom?: number;
  /** Скрытый пункт навигации — если true, глава не анонсируется стрелкой */
  ariaLabel?: string;
  /** Функциональный контент главы (поднимается занавесом) */
  children: ReactNode;
};

const smooth = (x: number) => x * x * (3 - 2 * x); // smoothstep

/**
 * Глава «сайта-фильма»: sticky-сцена с зумом внутрь кадра и межтитрами,
 * затем контент главы поднимается занавесом поверх зумированного кадра.
 */
export function FilmChapter({
  id,
  src,
  alt,
  chapter,
  title,
  lead,
  stageHeight = 160,
  zoom = 0.9,
  ariaLabel,
  children,
}: FilmChapterProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const viewedRef = useRef(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    // Кеш layout-измерений: все чтения (offsetHeight/getBoundingClientRect)
    // собраны здесь и вызываются только на mount/resize/загрузку шрифтов.
    // Внутри rAF-скролла остаются только чтения scrollY и записи transform —
    // принудительная компоновка (forced reflow) исключена.
    let topInDoc = 0;
    let stageH = 0;
    let runway = 1;
    const measure = () => {
      stageH = stage.offsetHeight;
      runway = Math.max(stageH - window.innerHeight, 1);
      topInDoc = stage.getBoundingClientRect().top + window.scrollY;
    };

    const update = () => {
      const rectTop = topInDoc - window.scrollY;
      const vh = window.innerHeight;
      // Глава либо ещё ниже экрана, либо уже пройдена — считаем только в зоне
      if (rectTop + stageH < 0 || rectTop > vh) return;
      const p = Math.min(1, Math.max(0, -rectTop / runway));

      if (imgWrapRef.current) {
        const scale = reduced ? 1 : 1 + smooth(Math.min(1, p / 0.8)) * zoom;
        imgWrapRef.current.style.transform = `scale(${scale})`;
      }

      if (textRef.current) {
        // Межтитры: видны в начале, растворяются к p=0.7, лёгкий дрейф вверх
        const op = Math.min(1, Math.max(0, (0.7 - p) / 0.25));
        textRef.current.style.opacity = String(op);
        textRef.current.style.transform = `translateY(${(1 - op) * -28}px)`;
        textRef.current.style.visibility = op <= 0.01 ? "hidden" : "visible";
      }

      if (p > 0.45 && !viewedRef.current) {
        viewedRef.current = true;
        trackEvent("chapter_view", { chapter });
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    const onMeasure = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onMeasure);
    // Изображения/шрифты сдвигают layout — перемеряемся после их готовности
    const t1 = window.setTimeout(measure, 1000);
    const t2 = window.setTimeout(measure, 3000);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onMeasure);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      cancelAnimationFrame(raf);
    };
  }, [chapter, zoom]);

  return (
    <>
      {/* Кинематографическая сцена-межтитр */}
      <div
        ref={stageRef}
        id={id}
        role="img"
        aria-label={ariaLabel ?? `${chapter} — ${alt}`}
        className="relative bg-choco-950"
        style={{ height: `${stageHeight}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div ref={imgWrapRef} className="absolute inset-0 will-change-transform" style={{ transform: "scale(1)" }}>
            <Image src={src} alt="" fill sizes="100vw" className="object-cover" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-t from-choco-950/90 via-choco-950/35 to-choco-950/55" />
          </div>

          <div
            ref={textRef}
            className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center text-cream"
          >
            <div className="max-w-3xl">
              <p className="divider-gold text-[12px] font-semibold uppercase tracking-[0.3em] text-gold-400 sm:text-[13px]">
                {chapter}
              </p>
              <h2 className="mt-5 font-display text-4xl font-bold leading-[1.08] sm:text-6xl">{title}</h2>
              {lead && (
                <p className="mx-auto mt-5 max-w-2xl font-display text-xl font-semibold leading-snug text-cream/85 sm:text-3xl sm:leading-snug">
                  {lead}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Занавес контента — поднимается поверх зумированного кадра */}
      <div className="relative z-10 -mt-[8vh] overflow-hidden rounded-t-[2.5rem] shadow-[0_-30px_60px_-30px_rgba(0,0,0,0.55)]">
        {children}
      </div>
    </>
  );
}
