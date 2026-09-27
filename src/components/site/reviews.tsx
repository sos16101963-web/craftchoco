import { Quote } from "lucide-react";
import { Stars } from "./stars";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function Reviews({ locale }: { locale: Locale }) {
  const t = getDict(locale).reviews;
  return (
    <section id="reviews" className="scroll-mt-20 bg-cream-100 py-20 lg:py-28" aria-label={t.aria}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="divider-gold text-[13px] font-semibold uppercase tracking-[0.3em] text-gold-700">{t.kicker}</p>
          <h2 className="mt-4 font-display text-4xl font-bold text-choco-900 sm:text-5xl">{t.h2}</h2>
          <p className="mt-4 text-lg leading-relaxed text-choco-600">
            {t.sub}
          </p>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {t.items.map((r: { name: string; text: string; rating: number; initials: string; role: string; date: string }) => (
            <li
              key={r.name}
              className="card-lift relative flex flex-col rounded-2xl border border-border bg-white/85 p-6 shadow-sm"
            >
              <Quote className="absolute right-5 top-5 h-8 w-8 text-gold-500/25" aria-hidden="true" />
              <Stars rating={r.rating} locale={locale} />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-choco-700">{r.text}</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-choco-900 font-display text-sm font-bold text-gold-300"
                  aria-hidden="true"
                >
                  {r.initials}
                </span>
                <span>
                  <span className="block font-bold text-choco-900">{r.name}</span>
                  <span className="block text-xs text-choco-500">
                    {r.role} · {r.date}
                  </span>
                </span>
              </figcaption>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
