import { Bean, HeartHandshake, Sparkles, MapPin, CalendarClock, Gift } from "lucide-react";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const icons = [Bean, HeartHandshake, Sparkles, CalendarClock, Gift, MapPin];

export function Features({ locale }: { locale: Locale }) {
  const t = getDict(locale).why;
  return (
    <section id="why" className="scroll-mt-20 texture-dots bg-cream py-20 lg:py-24" aria-label={t.aria}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="divider-gold text-[13px] font-semibold uppercase tracking-[0.3em] text-gold-700">{t.kicker}</p>
          <h2 className="mt-4 font-display text-4xl font-bold text-choco-900 sm:text-5xl">
            {t.h2}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-choco-600">
            {t.sub}
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((f: { title: string; text: string }, i: number) => {
            const Icon = icons[i % icons.length];
            return (
              <li key={f.title} className="card-lift group rounded-2xl border border-border bg-white/80 p-7 shadow-sm">
                <span className="inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-choco-900 p-3.5 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-choco-950">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-choco-900">{f.title}</h3>
                <p className="mt-2.5 leading-relaxed text-choco-600">{f.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
