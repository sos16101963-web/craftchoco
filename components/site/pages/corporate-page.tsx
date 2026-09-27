import { InnerShell } from "@/components/site/inner-shell";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Corporate } from "@/components/site/corporate";
import { switchPairFor } from "@/lib/pages";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { breadcrumbLd } from "@/lib/inner-meta";

export function CorporatePage({ locale, path }: { locale: Locale; path: string }) {
  const uk = locale === "uk";
  const seo = uk
    ? {
        kicker: "Корпоративні подарунки",
        h1: "Корпоративні подарунки з логотипом — шоколад Callebaut, Харків",
        sub: "Подарунки, які не соромно поставити на стіл партнерам: шоколадні набори ручної роботи з гравіюванням вашого логотипа, фірмовою упаковкою та листівкою-привітанням. Тиражі від 30 штук, рахунок для юросіб, дегустаційний набір перед замовленням.",
        h2How: "Як ми робимо корпоративні замовлення",
        steps: [
          {
            title: "Дегустаційний набір",
            text: "Перед тиражем збираємо міні-бокс зі смаками, які розглядаєте. Вирішуєте колективом або керівником — без здогадок.",
          },
          {
            title: "Макет і узгодження",
            text: "Готуємо візуалізацію: логотип на плитці, колір коробки, текст листівки. Тираж запускаємо тільки після вашого «так».",
          },
          {
            title: "Виробництво тиражу",
            text: "Від 30 до 500 наборів. Строк — від 3 до 7 днів залежно від об'єму; святкові слоти бронюйте заздалегідь.",
          },
          {
            title: "Доставка та документи",
            text: "Розвозимо по відділеннях/адресах або віддаємо на Нову пошту. Рахунок, накладні, акти — все для бухгалтерії.",
          },
        ],
        h2Faq: "Часті питання про корпоративні замовлення",
        faq: [
          {
            q: uk ? "Який мінімальний тираж?" : "Какой минимальный тираж?",
            a: uk ? "Від 30 наборів. Менше — вигідніше взяти позиції з каталогу: ціна буде нижчою, а вигляд такий самий святковий." : "От 30 наборов. Меньше — выгоднее взять позиции из каталога: цена будет ниже, а вид такой же праздничный.",
          },
          {
            q: uk ? "Чи можна логотип на кожній цукерці?" : "Можно ли логотип на каждой конфете?",
            a: uk ? "На плитках і брусках — так, гравіювання какао-маслом. На цукерках — логотип на кришці коробки та листівці; самі цукерки залишаються авторськими." : "На плитках и брусках — да, гравировка какао-маслом. На конфетах — логотип на крышке коробки и открытке; сами конфеты остаются авторскими.",
          },
          {
            q: uk ? "Як оплатити від юрособи?" : "Как оплатить от юрлица?",
            a: uk ? "Виставляємо рахунок з усіма даними ФОП/ТОВ. Після оплати фіксуємо слот виробництва і надсилаємо фото готових наборів перед відправкою." : "Выставляем счёт со всеми данными ФЛП/ООО. После оплаты фиксируем слот производства и присылаем фото готовых наборов перед отправкой.",
          },
          {
            q: uk ? "Скільки триває виробництво 150 наборів?" : "Сколько длится производство 150 наборов?",
            a: uk ? "5–7 днів у звичайний сезон, у грудні — бронюйте за 2–3 тижні. У дегустації та макеті допомагаємо за 1 день." : "5–7 дней в обычный сезон, в декабре — бронируйте за 2–3 недели. С дегустацией и макетом помогаем за 1 день.",
          },
        ],
      }
    : {
        kicker: "Корпоративные подарки",
        h1: "Корпоративные подарки с логотипом — шоколад Callebaut, Харьков",
        sub: "Подарки, которые не стыдно поставить на стол партнёрам: шоколадные наборы ручной работы с гравировкой вашего логотипа, фирменной упаковкой и открыткой-поздравлением. Тиражи от 30 штук, счёт для юрлиц, дегустационный набор перед заказом.",
        h2How: "Как мы делаем корпоративные заказы",
        steps: [
          {
            title: "Дегустационный набор",
            text: "Перед тиражом собираем мини-бокс со вкусами, которые рассматриваете. Решаете коллективом или руководителем — без догадок.",
          },
          {
            title: "Макет и согласование",
            text: "Готовим визуализацию: логотип на плитке, цвет коробки, текст открытки. Тираж запускаем только после вашего «да».",
          },
          {
            title: "Производство тиража",
            text: "От 30 до 500 наборов. Срок — от 3 до 7 дней в зависимости от объёма; праздничные слоты бронируйте заранее.",
          },
          {
            title: "Доставка и документы",
            text: "Развозим по отделениям/адресам или отдаём на Новую почту. Счёт, накладные, акты — всё для бухгалтерии.",
          },
        ],
        h2Faq: "Частые вопросы о корпоративных заказах",
        faq: [
          {
            q: "Какой минимальный тираж?",
            a: "От 30 наборов. Меньше — выгоднее взять позиции из каталога: цена будет ниже, а вид такой же праздничный.",
          },
          {
            q: "Можно ли логотип на каждой конфете?",
            a: "На плитках и брусках — да, гравировка какао-маслом. На конфетах — логотип на крышке коробки и открытке; сами конфеты остаются авторскими.",
          },
          {
            q: "Как оплатить от юрлица?",
            a: "Выставляем счёт со всеми данными ФЛП/ООО. После оплаты фиксируем слот производства и присылаем фото готовых наборов перед отправкой.",
          },
          {
            q: "Сколько длится производство 150 наборов?",
            a: "5–7 дней в обычный сезон, в декабре — бронируйте за 2–3 недели. С дегустацией и макетом помогаем за 1 день.",
          },
        ],
      };

  return (
    <InnerShell locale={locale} switchPair={switchPairFor(path)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([{ name: uk ? "Головна" : "Главная", path: uk ? "/" : "/ru" }, { name: uk ? "Корпоративні подарунки" : "Корпоративные подарки", path }]),
          ).replace(/</g, "\\u003c"),
        }}
      />
      <section className="bg-choco-950 pb-14 pt-32 text-cream sm:pt-36">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-gold-400">{seo.kicker}</p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">{seo.h1}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream/85">{seo.sub}</p>
          <a href={site.messengers[2].href} className="mt-7 inline-flex h-13 items-center rounded-full bg-gold-500 px-9 py-3.5 font-bold text-choco-950 transition-colors hover:bg-gold-400">
            {uk ? "Обговорити тираж у Telegram" : "Обсудить тираж в Telegram"}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-choco-900">{seo.h2How}</h2>
        <ol className="mt-8 grid gap-5 sm:grid-cols-2">
          {seo.steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 font-display text-base font-bold text-choco-950">{i + 1}</span>
              <h3 className="mt-3 font-display text-lg font-bold text-choco-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-choco-700">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <Corporate locale={locale} />

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-choco-900">{seo.h2Faq}</h2>
        <div className="mt-6 space-y-4">
          {seo.faq.map((f) => (
            <details key={f.q} className="rounded-2xl border border-border bg-white p-5 open:shadow-md">
              <summary className="cursor-pointer list-none font-semibold text-choco-900">{f.q}</summary>
              <p className="mt-3 text-[15px] leading-relaxed text-choco-700">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </InnerShell>
  );
}
