import { InnerShell } from "@/components/site/inner-shell";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Reviews } from "@/components/site/reviews";
import { switchPairFor } from "@/lib/pages";
import { rating } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import { breadcrumbLd } from "@/lib/inner-meta";

export function ReviewsPage({ locale, path }: { locale: Locale; path: string }) {
  const uk = locale === "uk";
  const seo = uk
    ? {
        kicker: "Відгуки та кейси",
        h1: "Відгуки про шоколадні цукерки CraftChocoKharkiv",
        sub: `Середня оцінка ${rating.value} з 5 за ${rating.count.toLocaleString("uk-UA")}+ подарунків. Тут — живі слова харків'ян, які вже дарували наші набори: від перших свидань до корпоративів на п'ятсот людей.`,
        h2Cases: "Кейси майстерні",
        cases: [
          {
            title: "Корпоративні набори з логотипом — 150 шт. за 5 днів",
            text: "IT-компанія з Харкова замовила набори з 9 цукерок з гравіюванням логотипа на плитці для клієнтів до річниці. Упакували індивідуально, надіслали рахунок з ПДВ, доставили на три адреси Новою поштою без єдиної тріснутої цукерки.",
          },
          {
            title: "«Букет, який не зів'яне» — весільні подарунки гостям",
            text: "Пара з Києва замовила 40 міні-букетів з шоколадних троянд як бононьєрки. Зібрали за 4 дні, кожен — в індивідуальній коробці з іменами гостей. Гості знімали відео, як «розпускають» троянди — дивіться у нашому Instagram.",
          },
          {
            title: "Щомісячна передплата для офісу — 24 місяці поспіль",
            text: "Харківське агентство щомісяця бере «Захоплення недоброзичливців» на зустрічі з клієнтами. 24 місяці поспіль без жодного пропущеного дня. Статус «офіс з найсмачнішими зустрічами» — в них, а не в конкурентів.",
          },
        ],
      }
    : {
        kicker: "Отзывы и кейсы",
        h1: "Отзывы о конфетах ручной работы CraftChocoKharkiv",
        sub: `Средняя оценка ${rating.value} из 5 за ${rating.count.toLocaleString("ru-RU")}+ подарков. Здесь — живые слова харьковчан, которые уже дарили наши наборы: от первых свиданий до корпоративов на пятьсот человек.`,
        h2Cases: "Кейсы мастерской",
        cases: [
          {
            title: "Корпоративные наборы с логотипом — 150 шт. за 5 дней",
            text: "IT-компания из Харькова заказала наборы из 9 конфет с гравировкой логотипа на плитке для клиентов к годовщине. Упаковали индивидуально, выслали счёт с НДС, доставили на три адреса Новой почтой без единой треснувшей конфеты.",
          },
          {
            title: "«Букет, который не завянет» — свадебные подарки гостям",
            text: "Пара из Киева заказала 40 мини-букетов из шоколадных роз в качестве бонбоньерок. Собрали за 4 дня, каждый — в индивидуальной коробке с именами гостей. Гости снимали видео, как «распускают» розы — смотрите в нашем Instagram.",
          },
          {
            title: "Ежемесячная подписка для офиса — 24 месяца подряд",
            text: "Харьковское агентство каждый месяц берёт «Восхищение недоброжелателей» на встречи с клиентами. 24 месяца подряд без единого пропущенного дня. Статус «офис с самыми вкусными встречами» — у них, а не у конкурентов.",
          },
        ],
      };

  return (
    <InnerShell locale={locale} switchPair={switchPairFor(path)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([{ name: uk ? "Головна" : "Главная", path: uk ? "/" : "/ru" }, { name: uk ? "Відгуки" : "Отзывы", path }]),
          ).replace(/</g, "\\u003c"),
        }}
      />
      <section className="bg-choco-950 pb-14 pt-32 text-cream sm:pt-36">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-gold-400">{seo.kicker}</p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">{seo.h1}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream/85">{seo.sub}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-choco-900">{seo.h2Cases}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {seo.cases.map((c) => (
            <article key={c.title} className="flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg font-bold leading-snug text-choco-900">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-choco-700">{c.text}</p>
            </article>
          ))}
        </div>
      </section>

      <Reviews locale={locale} />
    </InnerShell>
  );
}
