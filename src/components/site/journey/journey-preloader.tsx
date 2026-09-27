"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

/**
 * Золотой прелоадер: фоном играет фирменный ролик мастерской
 * (коробка с логотипом → конфеты → шоколад → роза), поверх —
 * кнопки «Войти» (начать погружение) и «Сразу в каталог».
 */
export default function JourneyPreloader({
  onEnter,
  onSkip,
  locale,
}: {
  onEnter: () => void;
  onSkip: () => void;
  locale: Locale;
}) {
  const t = getDict(locale).journey.preloader;
  // Видео (1 МБ) грузим только на мощных десктопах; на мобильных — постер
  const [videoOk, setVideoOk] = useState(false);
  useEffect(() => {
    const lowEnd =
      window.innerWidth < 1024 ||
      (navigator.hardwareConcurrency ?? 8) <= 4 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setVideoOk(!lowEnd);
  }, []);
  return (
    <motion.div
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[#120805]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {/* фирменный ролик фоном */}
      {videoOk ? (
        <video
          aria-hidden
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/media/brand-intro-poster.jpg"
          src="/media/brand-intro.mp4"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45"
        />
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[url('/media/brand-intro-poster.jpg')] bg-cover bg-center opacity-45"
        />
      )}
      {/* затемнение для читаемости */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#120805]/55" />
      {/* тёплое свечение фона */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 42%, rgba(255,180,94,0.16) 0%, rgba(18,8,5,0) 70%)",
        }}
      />
      {/* плавящееся золото */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[3px]">
        <div className="journey-goldflow h-full w-1/3 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
      </div>

      <p className="font-display text-xs uppercase tracking-[0.55em] text-gold-300/90">
        {t.kicker}
      </p>
      <h1 className="font-display mt-6 text-center text-4xl font-bold tracking-tight text-cream sm:text-6xl">
        CRAFTCHOCO
        <span className="block text-gold-400">KHARKIV</span>
      </h1>
      <p className="mx-auto mt-6 max-w-md px-6 text-center text-sm leading-relaxed text-cream/70 sm:text-base">
        {t.sub}
      </p>

      <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
        <button
          onClick={onEnter}
          className="group inline-flex items-center gap-2 rounded-full bg-gold-500 px-8 py-3.5 text-sm font-semibold text-choco-950 shadow-[0_10px_36px_-8px_rgba(217,168,92,0.6)] transition-transform hover:scale-[1.03]"
        >
          {t.enter}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
        <button
          onClick={onSkip}
          className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-6 py-3 text-sm text-cream/80 transition-colors hover:border-gold-400/50 hover:text-cream"
        >
          <ShoppingBag className="h-4 w-4" /> {t.skip}
        </button>
      </div>

      <p className="mt-8 text-[11px] uppercase tracking-[0.3em] text-cream/35">
        {t.footer}
      </p>
    </motion.div>
  );
}
