import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

/**
 * SVG-спрайт звёзд: один <symbol> вместо сотен инлайн-SVG
 * (раньше 151 копия звезды давали 87 КБ HTML; теперь — <use href="#ic-star">).
 */
export function StarSprite() {
  return (
    <svg aria-hidden="true" focusable="false" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
      <symbol id="ic-star" viewBox="0 0 24 24">
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
      </symbol>
    </svg>
  );
}

export function Stars({ rating, locale = "uk", className = "" }: { rating: number; locale?: Locale; className?: string }) {
  const label =
    locale === "uk" ? `Рейтинг ${rating} з 5` : `Рейтинг ${rating} из 5`;
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} role="img" aria-label={label}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={cn(
            "h-4 w-4",
            i <= Math.round(rating) ? "fill-gold-500 text-gold-500" : "fill-cream-200 text-cream-200"
          )}
        >
          <use href="#ic-star" />
        </svg>
      ))}
    </span>
  );
}
