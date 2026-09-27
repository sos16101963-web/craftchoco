import { Bike, Package, Store, Banknote, CreditCard, Smartphone, Snowflake, Clock } from "lucide-react";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const cardIcons = [Bike, Package, Store];
const payIcons = [CreditCard, Smartphone, Banknote, Snowflake, Clock];

export function Delivery({ locale }: { locale: Locale }) {
  const t = getDict(locale).delivery;
  return (
    <section id="delivery" className="scroll-mt-20 texture-dots bg-cream py-20 lg:py-28" aria-label={t.aria}>
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

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {t.cards.map((d: { title: string; price: string; text: string }, i: number) => {
            const Icon = cardIcons[i];
            return (
              <li key={d.title} className="card-lift flex flex-col rounded-2xl border border-border bg-white/85 p-7 shadow-sm">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-choco-900 text-gold-400">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold text-choco-900">{d.title}</h3>
                <p className="mt-1 text-sm font-bold text-gold-700">{d.price}</p>
                <p className="mt-3 flex-1 leading-relaxed text-choco-600">{d.text}</p>
              </li>
            );
          })}
        </ul>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {t.payments.map((p: string, i: number) => {
            const Icon = payIcons[i % payIcons.length];
            return (
              <li
                key={p}
                className="flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-2.5 text-sm font-semibold text-choco-700"
              >
                <Icon className="h-4.5 w-4.5 text-gold-700" aria-hidden="true" />
                {p}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
