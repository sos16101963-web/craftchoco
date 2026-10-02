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

export function TikTokIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.87-4.49V8.78a8.27 8.27 0 0 0 4.9 1.58V6.91a4.84 4.84 0 0 1-1-.22z" />
    </svg>
  );
}

export function YouTubeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

