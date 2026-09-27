import Image from "next/image";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function About({ locale }: { locale: Locale }) {
  const t = getDict(locale).about;
  return (
    <section id="about" className="scroll-mt-20 texture-dots bg-cream py-20 lg:py-28" aria-label={t.aria}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="img-zoom relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/images/master.jpg"
                alt={t.masterAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="animate-float-slow absolute -bottom-6 -right-2 rounded-2xl bg-choco-900 px-6 py-5 text-cream shadow-xl sm:-right-6">
              <p className="font-display text-3xl font-bold text-gold-300">{t.statCard[0]}</p>
              <p className="mt-0.5 text-sm text-cream/75">{t.statCard[1]}</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="divider-gold text-[13px] font-semibold uppercase tracking-[0.3em] text-gold-700">
              {t.kicker}
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-choco-900 sm:text-5xl">
              {t.h2}
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-choco-700">
              {/* Снятие боли — первый абзац бьёт в проблему «неудобного подарка» */}
              <p className="rounded-2xl border-l-4 border-gold-500 bg-gold-500/10 p-4 font-semibold text-choco-900">
                {t.painHook}
              </p>
              <p>{t.p1}</p>
              <p>{t.p2}</p>
              <p>{t.p3}</p>
              <p>{t.p4}</p>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {t.stats.map((s: { value: string; label: string }) => (
                <div key={s.label} className="border-l-2 border-gold-500 pl-4">
                  <dd className="font-display text-3xl font-bold text-choco-900">{s.value}</dd>
                  <dt className="mt-1 text-sm leading-snug text-choco-500">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
