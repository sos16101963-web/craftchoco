"use client";

import { BadgeCheck, Building2, CalendarClock, FlaskConical, Send, MessageCircle, Phone } from "lucide-react";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

const icons = [BadgeCheck, Building2, FlaskConical, CalendarClock];

/**
 * Блок для корпоративных клиентов: тиражи с логотипом, счёт юрлицам,
 * дегустационные образцы. CTA — мессенджеры в один клик.
 */
export function Corporate({ locale }: { locale: Locale }) {
  const t = getDict(locale).corporate;
  return (
    <section id="corporate" className="scroll-mt-20 texture-dots bg-cream py-20 lg:py-28" aria-label={t.aria}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="divider-gold text-[13px] font-semibold uppercase tracking-[0.3em] text-gold-700">
            {t.kicker}
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold text-choco-900 sm:text-5xl">{t.h2}</h2>
          <p className="mt-4 text-lg leading-relaxed text-choco-600">{t.sub}</p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.bullets.map((b, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li key={b.title} className="card-lift rounded-2xl border border-border bg-white/85 p-6 shadow-sm">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-choco-900 text-gold-400">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-choco-900">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-choco-600">{b.text}</p>
              </li>
            );
          })}
        </ul>

        <dl className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
          {t.stats.map((s) => (
            <div key={s.label} className="text-center">
              <dd className="font-display text-3xl font-bold text-choco-900">{s.value}</dd>
              <dt className="mt-1 text-sm text-choco-500">{s.label}</dt>
            </div>
          ))}
        </dl>

        <div className="mx-auto mt-12 max-w-3xl rounded-3xl bg-choco-950 p-8 text-center text-cream shadow-xl sm:p-10">
          <h3 className="font-display text-2xl font-bold sm:text-3xl">{t.ctaTitle}</h3>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-cream/75">{t.ctaText}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href={site.messengers[2].href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("contact_click", { channel: "telegram", source: "corporate" })}
              className="inline-flex items-center gap-2 rounded-full bg-[#197cae] px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              <Send className="h-4 w-4" aria-hidden="true" /> Telegram
            </a>
            <a
              href={site.messengers[0].href}
              onClick={() => trackEvent("contact_click", { channel: "viber", source: "corporate" })}
              className="inline-flex items-center gap-2 rounded-full bg-[#6f5df1] px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Viber
            </a>
            <a
              href={site.messengers[1].href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("contact_click", { channel: "whatsapp", source: "corporate" })}
              className="inline-flex items-center gap-2 rounded-full bg-[#118159] px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> WhatsApp
            </a>
          </div>
          <p className="mt-4 text-xs text-cream/50">{site.phoneShort}</p>
        </div>
      </div>
    </section>
  );
}
