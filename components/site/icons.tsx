import type { ReactNode } from "react";

/**
 * Единый SVG-спрайт иконок: один <symbol> вместо десятков инлайн-<svg>
 * (аудит: 151 инлайн-SVG ≈ 87 КБ лишнего HTML на странице).
 * Спрайт рендерится один раз в <Home/>; иконки ссылаются через <use href="#...">.
 */
export function IconSprite() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {/* звезда (lucide "star", заливка через currentColor) */}
        <symbol id="ic-star" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
          />
        </symbol>
      </defs>
    </svg>
  );
}

/** Рейтинг из 5 звёзд на спрайте — вместо 5 инлайн-SVG на вызов */
export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className={`h-4 w-4 ${i <= Math.round(rating) ? "fill-gold-500 text-gold-500" : "fill-cream-200 text-cream-200"}`}>
          <use href="#ic-star" />
        </svg>
      ))}
    </span>
  );
}

/** Обёртка, чтобы задать aria-label там, где рейтинг читается скринридером */
export function StarsRated({ rating, label, className = "" }: { rating: number; label: string; className?: string }) {
  return (
    <span role="img" aria-label={label} className={className}>
      <Stars rating={rating} />
    </span>
  );
}

export function SpriteProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <IconSprite />
      {children}
    </>
  );
}
