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
        h1: "Корпоративні подарунки з шоколаду: набори для колег і партнерів",
        sub: "Свіжий бельгійський шоколад Callebaut ручної роботи для компаній та підприємств. Будь-які набори під ваш бюджет: на 4, 6, 9, 12 та 16 цукерок, плитки або корисні дитячі медіанти. Гнучкі знижки, кожен 15-й набір у подарунок, презент особисто замовнику та безготівковий розрахунок.",
        h2Offers: "Спеціальні умови та бонуси для підприємств",
        offers: [
          {
            title: "Знижки від об'єму",
            badge: "до -10%",
            desc: "До 30 наборів — знижка 5%. Понад 30 наборів — знижка 10% на все замовлення.",
          },
          {
            title: "Кожен 15-й набір — безкоштовно",
            badge: "15 + 1",
            desc: "Замовляєте 15 наборів — отримуєте 16-й у подарунок. Замовляєте 30 — отримуєте +2 набори безкоштовно!",
          },
          {
            title: "Подарунок особисто замовнику",
            badge: "Для вас",
            desc: "Ми цінуємо вашу роботу як організатора: при замовленні від 30 наборів даруємо великий святковий набір шоколаду особисто вам.",
          },
          {
            title: "Безкоштовна доставка від 50 наборів",
            badge: "Доставка 0 ₴",
            desc: "Повністю оплачуємо кур'єрську доставку по місту або відправку Новою Поштою по всій Україні до вашого офісу.",
          },
        ],
        h2Formats: "Будь-який формат під бюджет вашої компанії",
        formats: [
          {
            name: "Міні-компліменти",
            size: "Набори на 4 цукерки або брусочки",
            price: "від 130 ₴ – 150 ₴",
            desc: "Ідеально для привітання великого колективу, клієнтів на ресепшн або до масових корпоративних подій.",
          },
          {
            name: "Класичні подарунки",
            size: "Набори на 6 цукерок, дитячі медіанти або плитки",
            price: "від 150 ₴ – 220 ₴",
            desc: "Універсальний презент для співробітників відділів, до Дня народження компанії або професійних свят.",
          },
          {
            name: "Середні та бізнес-набори",
            size: "Набори на 9 та 12 цукерок, комбо-бокси",
            price: "від 300 ₴ – 380 ₴",
            desc: "Золотий стандарт для цінних спеціалістів, керівників відділів та ділових партнерів.",
          },
          {
            name: "Преміум та VIP-набори",
            size: "Великі набори на 16 цукерок, шоколадні букети троянд",
            price: "від 450 ₴ – 600 ₴",
            desc: "Розкішні презенти для топ-менеджменту, ключових бізнес-партнерів, VIP-клієнтів та інвесторів.",
          },
        ],
        h2How: "Як легко зробити корпоративне замовлення",
        steps: [
          {
            title: "Вибір формату та бюджету",
            text: "Обираєте потрібні набори (на 4, 6, 9, 12, 16 цукерок чи медіанти) та кількість. За потреби надсилаємо дегустаційний зразок.",
          },
          {
            title: "Листівка та оформлення",
            text: "Додаємо святкові фірмові листівки з вашим теплим текстом привітання для колег і партнерів.",
          },
          {
            title: "Оплата та документи для бухгалтерії",
            text: "Виставляємо офіційний рахунок на ФОП/ТОВ. Надаємо повний пакет закривальних документів, накладні та договори.",
          },
          {
            title: "Свіже виробництво та доставка",
            text: "Готуємо свіжу партію безпосередньо перед датою вручення. Відправляємо в надійному пакуванні (термобокси у спеку, захисна плівка).",
          },
        ],
        h2Faq: "Часті питання корпоративних клієнтів",
        faq: [
          {
            q: "Чи можна комбінувати різні набори в одному замовленні?",
            a: "Так, звісно! Ви можете замовити, наприклад, 20 наборів на 4 цукерки для співробітників, 10 наборів на 12 цукерок для партнерів і дитячі медіанти для сімей колег. Знижки та бонуси рахуються від загальної кількості!",
          },
          {
            q: "Як нараховуються знижки та подарункові набори?",
            a: "До 30 шт діє знижка 5%, понад 30 шт — 10%. При цьому акція «кожен 15-й набір у подарунок» та особистий презент організатору діють разом з вашою знижкою!",
          },
          {
            q: "Як оплатити замовлення від юридичної особи?",
            a: "Ми працюємо офіційно за безготівковим розрахунком (IBAN рахунок ФОП/ТОВ). Виставляємо рахунок, після виконання надаємо всі необхідні бухгалтерські документи.",
          },
          {
            q: "Скільки часу займає виготовлення тиражу?",
            a: "Замовлення до 50 наборів ми готуємо за 2–4 робочі дні. Великі партії (від 100 шт) узгоджуємо індивідуально — рекомендуємо бронювати дати за 1–2 тижні до свята.",
          },
        ],
      }
    : {
        kicker: "Корпоративные подарки",
        h1: "Корпоративные подарки из шоколада: наборы для коллег и партнёров",
        sub: "Свежий бельгийский шоколад Callebaut ручной работы для компаний и предприятий. Любые наборы под ваш бюджет: на 4, 6, 9, 12 и 16 конфет, плитки или полезные детские медианты. Гибкие скидки, каждый 15-й набор в подарок, презент лично заказчику и безналичный расчёт.",
        h2Offers: "Специальные условия и бонусы для предприятий",
        offers: [
          {
            title: "Скидки от объёма",
            badge: "до 10%",
            desc: "До 30 наборов — скидка 5%. Свыше 30 наборов — скидка 10% на весь заказ.",
          },
          {
            title: "Каждый 15-й набор — бесплатно",
            badge: "15 + 1",
            desc: "Заказываете 15 наборов — получаете 16-й в подарок. Заказываете 30 — получаете +2 набора бесплатно!",
          },
          {
            title: "Подарок лично заказчику",
            badge: "Для вас",
            desc: "Мы ценим ваш труд организатора: при заказе от 30 наборов дарим большой праздничный набор шоколада лично вам.",
          },
          {
            title: "Бесплатная доставка от 50 наборов",
            badge: "Доставка 0 ₴",
            desc: "Полностью оплачиваем курьерскую доставку по городу или отправку Новой Почтой по всей Украине прямо в ваш офис.",
          },
        ],
        h2Formats: "Любой формат под бюджет вашей компании",
        formats: [
          {
            name: "Мини-комплименты",
            size: "Наборы на 4 конфеты или брусочки",
            price: "от 130 ₴ – 150 ₴",
            desc: "Идеально для поздравления большого коллектива, клиентов на ресепшн или к массовым корпоративным событиям.",
          },
          {
            name: "Классические подарки",
            size: "Наборы на 6 конфет, детские медианты или плитки",
            price: "от 150 ₴ – 220 ₴",
            desc: "Универсальный презент для сотрудников отделов, ко Дню рождения компании или профессиональным праздникам.",
          },
          {
            name: "Средние и бизнес-наборы",
            size: "Наборы на 9 и 12 конфет, комбо-боксы",
            price: "от 300 ₴ – 380 ₴",
            desc: "Золотой стандарт для ценных специалистов, руководителей отделов и деловых партнёров.",
          },
          {
            name: "Премиум и VIP-наборы",
            size: "Большие наборы на 16 конфет, букеты шоколадных роз",
            price: "от 450 ₴ – 600 ₴",
            desc: "Роскошные презенты для топ-менеджмента, ключевых бизнес-партнёров, VIP-клиентов и инвесторов.",
          },
        ],
        h2How: "Как легко сделать корпоративный заказ",
        steps: [
          {
            title: "Выбор формата и бюджета",
            text: "Выбираете нужные наборы (на 4, 6, 9, 12, 16 конфет или медианты) и количество. По необходимости высылаем дегустационный образец.",
          },
          {
            title: "Открытка и оформление",
            text: "Добавляем праздничные фирменные открытки с вашим тёплым текстом поздравления для коллег и партнёров.",
          },
          {
            title: "Оплата и документы для бухгалтерии",
            text: "Выставляем официальный счёт на ФЛП/ООО. Предоставляем полный пакет закрывающих документов, накладные и договоры.",
          },
          {
            title: "Свежее производство и доставка",
            text: "Готовим свежую партию непосредственно перед датой вручения. Отправляем в надёжной упаковке (термобоксы в жару, защитная плёнка).",
          },
        ],
        h2Faq: "Частые вопросы корпоративных клиентов",
        faq: [
          {
            q: "Можно ли комбинировать разные наборы в одном заказе?",
            a: "Да, конечно! Вы можете заказать, например, 20 наборов на 4 конфеты для коллег, 10 наборов на 12 конфет для партнёров и детские медианты для семей сотрудников. Скидки и бонусы считаются от общего количества!",
          },
          {
            q: "Как начисляются скидки и подарочные наборы?",
            a: "До 30 шт действует скидка 5%, свыше 30 шт — 10%. При этом акция «каждый 15-й набор в подарок» и личный презент организатору действуют вместе с вашей скидкой!",
          },
          {
            q: "Как оплатить заказ от юридического лица?",
            a: "Мы работаем официально по безналичному расчёту (IBAN счёт ФЛП/ООО). Выставляем счёт, после выполнения предоставляем все необходимые бухгалтерские документы.",
          },
          {
            q: "Сколько времени занимает изготовление тиража?",
            a: "Заказы до 50 наборов мы готовим за 2–4 рабочих дня. Большие партии (от 100 шт) согласовываем индивидуально — рекомендуем бронировать даты за 1–2 недели до праздника.",
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
      <section className="bg-choco-950 pb-16 pt-32 text-cream sm:pt-36">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-gold-400">{seo.kicker}</p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">{seo.h1}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream/85">{seo.sub}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={site.messengers[2].href} target="_blank" rel="noopener noreferrer" className="inline-flex h-13 items-center rounded-full bg-gold-500 px-8 py-3.5 font-bold text-choco-950 transition-colors hover:bg-gold-400">
              {uk ? "Розрахувати замовлення в Telegram" : "Рассчитать заказ в Telegram"}
            </a>
            <a href={site.messengers[0].href} className="inline-flex h-13 items-center rounded-full border border-gold-400/50 bg-white/10 px-8 py-3.5 font-bold text-cream backdrop-blur-sm transition-colors hover:bg-white/20">
              {uk ? "Написати у Viber" : "Написать в Viber"}
            </a>
          </div>
        </div>
      </section>

      {/* Бонусы и спецпредложения */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold text-choco-900">{seo.h2Offers}</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {seo.offers.map((off) => (
            <div key={off.title} className="rounded-2xl border border-gold-500/30 bg-white p-6 shadow-sm transition hover:shadow-md">
              <span className="inline-block rounded-full bg-gold-500/20 px-3 py-1 text-xs font-bold text-gold-800">
                {off.badge}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold text-choco-900">{off.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-choco-600">{off.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Форматы под любой бюджет */}
      <section className="bg-cream-100/70 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-choco-900">{seo.h2Formats}</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {seo.formats.map((fmt) => (
              <div key={fmt.name} className="flex flex-col justify-between rounded-2xl border border-border bg-white p-6 shadow-sm">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-bold text-choco-900">{fmt.name}</h3>
                    <span className="font-display text-lg font-bold text-gold-700">{fmt.price}</span>
                  </div>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-choco-500">{fmt.size}</p>
                  <p className="mt-3 text-sm leading-relaxed text-choco-600">{fmt.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={uk ? "/katalog" : "/ru/katalog"} className="inline-flex items-center font-semibold text-gold-700 hover:text-gold-800 underline underline-offset-4">
              {uk ? "Подивитися весь каталог та склад наборів →" : "Посмотреть весь каталог и состав наборов →"}
            </a>
          </div>
        </div>
      </section>

      {/* Порядок работы */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="text-center font-display text-3xl font-bold text-choco-900">{seo.h2How}</h2>
        <ol className="mt-10 grid gap-5 sm:grid-cols-2">
          {seo.steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 font-display text-base font-bold text-choco-950">{i + 1}</span>
              <h3 className="mt-3 font-display text-lg font-bold text-choco-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-choco-700">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        <h2 className="text-center font-display text-3xl font-bold text-choco-900">{seo.h2Faq}</h2>
        <div className="mt-8 space-y-4">
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
