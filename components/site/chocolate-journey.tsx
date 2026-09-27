"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { Hero } from "@/components/site/hero";
import type { Locale } from "@/lib/i18n";
import { journey, JOURNEY_VH, clamp } from "@/lib/journey";
import { trackEvent } from "@/lib/analytics";
import type { JourneyCanvasProps } from "./journey/journey-canvas";
import { getDict } from "@/lib/i18n";

/**
 * «Шоколадное погружение» — гибридный вход на сайт в стиле igloo.inc.
 *
 * Архитектура:
 *  [прелоадер] → [3D-маршрут 540vh: букет шоколадных цветов из частиц → 3 витрины → Врата вкуса]
 *  → живой магазин (каталог, корзина, доставка, контакты)
 *
 * Один scroll-listener пишет прогресс в мутабельный journey-объект;
 * 3D и оверлеи читают его в rAF — без ре-рендеров React.
 * Fallback: без WebGL / prefers-reduced-motion → обычный Hero.
 */

const JourneyCanvas = dynamic<JourneyCanvasProps>(
  () => import("./journey/journey-canvas").then((m) => m.default),
  { ssr: false },
);

const JourneyOverlays = dynamic(() => import("./journey/journey-overlays"), {
  ssr: false,
});

const JourneyPreloader = dynamic(() => import("./journey/journey-preloader"), {
  ssr: false,
});

const TemperingHUD = dynamic(() => import("./journey/tempering-hud"), {
  ssr: false,
});

function webglSupported(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

/** софтверный рендер (SwiftShader/llvmpipe) — снижаем качество сцены */
function isSoftwareRenderer(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ||
      canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return true;
    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = dbg
      ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL))
      : "";
    return /SwiftShader|llvmpipe|Software|Basic/i.test(renderer);
  } catch {
    return true;
  }
}

export function ChocolateJourney({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const [mode, setMode] = useState<"3d" | "static" | null>(null);
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [canvasActive, setCanvasActive] = useState(true);
  const journeyRef = useRef<HTMLDivElement>(null);
  const [particleCount, setParticleCount] = useState(12000);
  /** 3D выключен из-за мобильного, но технически возможен — показываем кнопку opt-in */
  const [mobileCan3d, setMobileCan3d] = useState(false);

  // определяем режим: WebGL + отсутствие prefers-reduced-motion + не мобильный
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const supported = webglSupported();
      const isMobile = window.innerWidth < 768;
      const lowEnd =
        isSoftwareRenderer() ||
        isMobile ||
        (navigator.hardwareConcurrency ?? 8) <= 4;
      journey.quality = lowEnd ? "low" : "high";
      setParticleCount(lowEnd ? 3500 : 12000);

      // на мобильных 3D по умолчанию выключен (чтобы не тормозило) —
      // включается позже по желанию кнопкой в герое
      if (!supported || reduced || isMobile) {
        journey.mode = "static";
        setMode("static");
        setPreloaderVisible(false);
        setMobileCan3d(supported && !reduced && isMobile);
        document.body.style.overflow = "";
      } else {
        journey.mode = "3d";
        setMode("3d");
        document.body.style.overflow = "hidden"; // блокируем скролл до «Войти»
        // рестарт погружения при перезагрузке: браузер не восстанавливает старый скролл
        if ("scrollRestoration" in history) history.scrollRestoration = "manual";
        window.scrollTo(0, 0);
      }
    });
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
      if ("scrollRestoration" in history) history.scrollRestoration = "auto";
    };
  }, []);

  // мобильный opt-in: пользователь сам решил посмотреть 3D-погружение
  const enable3d = useCallback(() => {
    trackEvent("journey_enable_mobile");
    journey.mode = "3d";
    setMode("3d");
    setPreloaderVisible(true);
    document.body.style.overflow = "hidden";
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  // единый scroll-listener: прогресс 3D-маршрута
  useEffect(() => {
    if (mode !== "3d") return;
    const onScroll = () => {
      const el = journeyRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      journey.progress = clamp(-rect.top / Math.max(scrollable, 1), 0, 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mode]);

  // параллакс мышью
  useEffect(() => {
    if (mode !== "3d") return;
    const onMove = (e: PointerEvent) => {
      journey.mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      journey.mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mode]);

  // канвас активен, только пока маршрут в зоне видимости
  useEffect(() => {
    if (mode !== "3d") return;
    const el = journeyRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setCanvasActive(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mode]);

  const handleEnter = useCallback(() => {
    setPreloaderVisible(false);
    document.body.style.overflow = "";
    window.scrollTo({ top: 0 });
    journey.started = true;
    journey.startTime = performance.now();
    trackEvent("journey_start");
  }, []);

  const handleSkip = useCallback(() => {
    journey.started = true;
    journey.startTime = performance.now();
    setPreloaderVisible(false);
    document.body.style.overflow = "";
    trackEvent("journey_start", { skip: true });
    requestAnimationFrame(() => {
      document.getElementById("catalog")?.scrollIntoView({ behavior: "auto" });
    });
  }, []);

  return (
    <>
      {/* В 3D-режиме маршрут идёт ПЕРЕД героем: после тоннеля пользователь
          «выплывает» на живой герой с H1 — заголовок всегда остаётся в DOM
          (фикс аудита: SSR и финальный DOM содержат одинаковый семантический H1). */}
      {mode === "3d" && (
        <>
          <div
            ref={journeyRef}
            id="journey"
            className="relative"
            style={{ height: `${JOURNEY_VH}vh` }}
          >
            <div className="sticky top-0 h-screen overflow-hidden">
              <JourneyCanvas active={canvasActive} particleCount={particleCount} locale={locale} />
              <div
                className="pointer-events-none absolute inset-0 z-[5]"
                style={{
                  background:
                    "radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(10,4,2,0.55) 100%)",
                }}
              />
              <JourneyOverlays locale={locale} />
            </div>
          </div>
          <TemperingHUD locale={locale} />
        </>
      )}

      <Hero locale={locale} onEnable3d={mode === "static" && mobileCan3d ? enable3d : undefined} />

      {/* чёрный экран до определения режима (без вспышек контента) */}
      {mode === null && (
        <div className="fixed inset-0 z-[60] bg-[#120805]" aria-hidden />
      )}

      {mode === "3d" && (
        <AnimatePresence>
          {preloaderVisible && (
            <JourneyPreloader onEnter={handleEnter} onSkip={handleSkip} locale={locale} />
          )}
        </AnimatePresence>
      )}
    </>
  );
}
