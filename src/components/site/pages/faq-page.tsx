import { InnerShell } from "@/components/site/inner-shell";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Faq } from "@/components/site/faq";
import { switchPairFor } from "@/lib/pages";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { breadcrumbLd } from "@/lib/inner-meta";

export function FaqPage({ locale, path }: { locale: Locale; path: string }) {
  const uk = locale === "uk";
  const t = getDict(locale);
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((f: { q: string; a: string }) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const seo = uk
    ? {
        kicker: "Питання та відповіді",
        h1: "Питання про шоколад ручної роботи — відповіді майстра",
        sub: "Все, про що питають у Viber і Telegram перед першим замовленням: терміни зберігання, склад, доставка, оплата та корпоративні тиражі. Не знайшли своє питання — напишіть, відповідаємо швидко.",
      }
    : {
        kicker: "Вопросы и ответы",
        h1: "Вопросы о шоколаде ручной работы — ответы мастера",
        sub: "Всё, о чём спрашивают в Viber и Telegram перед первым заказом: сроки хранения, состав, доставка, оплата и корпоративные тиражи. Не нашли свой вопрос — напишите, отвечаем быстро.",
      };

  return (
    <InnerShell locale={locale} switchPair={switchPairFor(path)}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, "\\u003c") }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([{ name: uk ? "Головна" : "Главная", path: uk ? "/" : "/ru" }, { name: uk ? "Питання та відповіді" : "Вопросы и ответы", path }]),
          ).replace(/</g, "\\u003c"),
        }}
      />
      <section className="bg-choco-950 pb-14 pt-32 text-cream sm:pt-36">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-gold-400">{seo.kicker}</p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">{seo.h1}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream/85">{seo.sub}</p>
          <a href={site.phoneHref} className="mt-6 inline-flex h-12 items-center rounded-full bg-gold-500 px-8 font-bold text-choco-950 transition-colors hover:bg-gold-400">
            {site.phoneShort}
          </a>
        </div>
      </section>
      <div className="bg-cream-100 pb-10">
        <Faq locale={locale} />
      </div>
    </InnerShell>
  );
}
