import { InnerShell } from "@/components/site/inner-shell";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Corporate } from "@/components/site/corporate";
import { CorporateEstimateCalculator } from "@/components/site/pages/corporate-estimate-calculator";
import { switchPairFor } from "@/lib/pages";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { breadcrumbLd } from "@/lib/inner-meta";

export function CorporatePage({ locale, path }: { locale: Locale; path: string }) {
  const uk = locale === "uk";
  const seo = uk
    ? {
        kicker: "Крафтові їстівні корпоративні подарунки · Харків та Україна",
        h1: "Їстівні корпоративні подарунки з шоколаду: солодкі набори для колег і партнерів",
        sub: "Свіжий бельгійський шоколад Callebaut ручної роботи до Нового року 2026 та корпоративних подій. Смачні та солідні їстівні подарунки під будь-який бюджет компанії: від міні-компліментів (130 ₴) до VIP-боксів. Нанесення логотипа на листівку, безкоштовний дегустаційний сет для вашого офісу, знижки до -10%, кожен 15-й набір у подарунок та офіційні документи для бухгалтерії.",
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
        h2WhyEdible: "Чому їстівні подарунки з шоколаду кращі за сувенірний мерч",
        whyEdibleItems: [
          {
            title: "100% задоволення замість пилу в шафі",
            desc: "Брендовані блокноти, ручки чи чашки часто роками припадають пилом або губляться. Свіжий бельгійський шоколад дарує щирі емоції радості тут і зараз.",
          },
          {
            title: "Преміальний статус без переплат",
            desc: "100% какао-масло Callebaut без пальмових жирів — ваші співробітники, ключові клієнти та інвестори відчувають справжню турботу та повагу компанії.",
          },
          {
            title: "Брендування та персоналізація",
            desc: "Додаємо святкові листівки з вашим фірмовим логотипом, індивідуальними теплими побажаннями або стрічками в корпоративних кольорах бренду.",
          },
          {
            title: "Безкоштовний дегустаційний сет",
            desc: "Сумніваєтеся у смаку перед замовленням тиражу? Ми безкоштовно привеземо або надішлемо зразки цукерок до вашого офісу на дегустацію.",
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
            text: "Обираєте потрібні набори (на 4, 6, 9, 12, 16 цукерок чи медіанти) та кількість. За потреби надсилаємо безкоштовний дегустаційний зразок.",
          },
          {
            title: "Логотип, листівка та оформлення",
            text: "Друкуємо фірмові святкові листівки з вашим логотипом і текстом привітання для співробітників та бізнес-партнерів.",
          },
          {
            title: "Оплата та документи для бухгалтерії",
            text: "Виставляємо офіційний рахунок на ФОП/ТОВ (IBAN). Надаємо повний пакет закривальних документів, накладні та договори.",
          },
          {
            title: "Свіже виробництво та доставка",
            text: "Готуємо свіжу партію безпосередньо перед датою вручення. Відправляємо кур'єром або Новою Поштою по всій Україні в захисному пакуванні.",
          },
        ],
        tastingTitle: "Бажаєте спробувати перед затвердженням бюджету?",
        tastingDesc: "Напишіть нам у месенджер — ми зберемо та передамо до вашого офісу безкоштовний дегустаційний сет із 4 авторських цукерок Callebaut.",
        tastingBtnTg: "Замовити дегустаційний сет у Telegram",
        tastingBtnViber: "Написати у Viber",
        h2Faq: "Часті питання корпоративних клієнтів",
        faq: [
          {
            q: "Чи можна додати логотип компанії до корпоративного набору?",
            a: "Так! Ми друкуємо фірмові листівки з вашим логотипом та індивідуальним текстом привітання, додаємо брендовані наліпки або стрічки в кольорах вашого бренду.",
          },
          {
            q: "Як замовити безкоштовний дегустаційний сет для офісу?",
            a: "Просто напишіть нам у Telegram чи Viber кількість співробітників і бажаний бюджет. Ми безкоштовно привеземо до вашого офісу в Харкові (або надішлемо Новою Поштою) дегустаційний бокс, щоб керівництво оцінило якість до оплати.",
          },
          {
            q: "Чи можна комбінувати різні набори в одному замовленні?",
            a: "Так, звісно! Ви можете замовити, наприклад, 25 наборів на 4 цукерки для співробітників, 10 наборів на 12 цукерок для ключових партнерів і дитячі медіанти зі звірятами для родин колег. Знижки та бонуси рахуються від загальної кількості!",
          },
          {
            q: "Як нараховуються знижки та бонуси 15+1?",
            a: "До 30 шт діє знижка 5%, понад 30 шт — 10%. При цьому акція «кожен 15-й набір у подарунок» (15+1) та особистий святковий презентаційний бокс організатору діють разом з вашою знижкою!",
          },
          {
            q: "Як оплатити замовлення від юридичної особи та чи є закривальні документи?",
            a: "Ми працюємо офіційно за безготівковим розрахунком (IBAN рахунок ФОП/ТОВ). Виставляємо рахунок, після виконання надаємо повний пакет бухгалтерських документів: договір, рахунок-фактуру та видаткові накладні.",
          },
          {
            q: "Скільки часу займає виготовлення тиражу до Нового року 2026?",
            a: "Партії до 50 наборів ми готуємо за 2–4 робочі дні. Великі замовлення (від 100 шт) узгоджуємо за графіком виробництва — рекомендуємо забронювати дату в жовтні-листопаді, щоб зафіксувати ціну та наявність святкового пакування.",
          },
        ],
      }
    : {
        kicker: "Крафтовые съедобные корпоративные подарки · Харьков и Украина",
        h1: "Съедобные корпоративные подарки из шоколада: сладкие наборы для коллег и партнёров",
        sub: "Свежий бельгийский шоколад Callebaut ручной работы к Новому году 2026 и корпоративным праздникам. Вкусные и солидные съедобные подарки под любой бюджет компании: от мини-комплиментов (130 ₴) до VIP-боксов. Нанесение логотипа на открытку, бесплатный дегустационный сет для вашего офиса, скидки до 10%, каждый 15-й набор в подарок и официальные закрывающие документы.",
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
        h2WhyEdible: "Почему съедобные подарки из шоколада лучше сувенирного мерча",
        whyEdibleItems: [
          {
            title: "100% удовольствия вместо пыли в шкафу",
            desc: "Брендированные блокноты, ручки или кружки годами пылятся на полках. Свежий ремесленный шоколад дарит живые искренние эмоции здесь и сейчас.",
          },
          {
            title: "Премиальный статус без переплат",
            desc: "100% какао-масло Callebaut без пальмовых масел — ваши сотрудники, партнёры и клиенты чувствуют подлинную заботу и уважение руководства.",
          },
          {
            title: "Брендирование и персонализация",
            desc: "Вкладываем открытки с вашим корпоративным логотипом, индивидуальным поздравлением или оформляем коробки лентами в цветах бренда.",
          },
          {
            title: "Бесплатный дегустационный сет",
            desc: "Хотите убедиться во вкусе перед заказом партии? Мы бесплатно доставим образцы конфет прямо к вам в офис на дегустацию.",
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
            title: "Логотип, открытка и оформление",
            text: "Печатаем фирменные открытки с вашим логотипом и поздравлением для сотрудников и партнёров.",
          },
          {
            title: "Оплата и документы для бухгалтерии",
            text: "Выставляем официальный счёт на ФЛП/ООО (IBAN). Предоставляем полный пакет закрывающих документов, накладные и договоры.",
          },
          {
            title: "Свежее производство и доставка",
            text: "Готовим свежую партию непосредственно перед датой вручения. Отправляем в надёжной упаковке прямо в ваш офис.",
          },
        ],
        tastingTitle: "Хотите попробовать перед утверждением сметы?",
        tastingDesc: "Напишите нам в мессенджер — мы соберём и передадим в ваш офис бесплатный дегустационный сет из 4 авторских конфет Callebaut.",
        tastingBtnTg: "Заказать дегустационный сет в Telegram",
        tastingBtnViber: "Написать в Viber",
        h2Faq: "Частые вопросы корпоративных клиентов",
        faq: [
          {
            q: "Можно ли нанести логотип компании на корпоративный набор?",
            a: "Да! Мы печатаем фирменные открытки с вашим логотипом и индивидуальным текстом поздравления, прикрепляем брендированные наклейки или подбираем ленты в корпоративных цветах.",
          },
          {
            q: "Как заказать бесплатный дегустационный сет для офиса?",
            a: "Просто напишите нам в Telegram или Viber количество сотрудников и примерный бюджет. Мы бесплатно привезём в ваш офис в Харькове (или отправим Новой Почтой) дегустационный бокс, чтобы руководство оценило качество до оплаты.",
          },
          {
            q: "Можно ли комбинировать разные наборы в одном заказе?",
            a: "Да, конечно! Вы можете заказать, например, 25 наборов на 4 конфеты для коллег, 10 наборов на 12 конфет для партнёров и детские медианты для семей сотрудников. Скидки и бонусы считаются от общего количества!",
          },
          {
            q: "Как начисляются скидки и подарочные наборы 15+1?",
            a: "До 30 шт действует скидка 5%, свыше 30 шт — 10%. При этом акция «каждый 15-й набор в подарок» (15+1) и личный презент организатору действуют вместе с вашей скидкой!",
          },
          {
            q: "Как оплатить заказ от юридического лица?",
            a: "Мы работаем официально по безналичному расчёту (IBAN счёт ФЛП/ООО). Выставляем счёт, после выполнения предоставляем полный пакет закрывающих документов: договор, счёт-фактуру и расходные накладные.",
          },
          {
            q: "Сколько времени занимает изготовление тиража к Новому году 2026?",
            a: "Заказы до 50 наборов мы готовим за 2–4 рабочих дня. Большие партии (от 100 шт) согласовываем индивидуально — рекомендуем бронировать даты в октябре-ноябре, чтобы зафиксировать праздничные упаковки.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: seo.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.a,
              },
            })),
          }).replace(/</g, "\\u003c"),
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

      {/* Почему именно съедобные подарки */}
      <section className="border-y border-gold-500/20 bg-gradient-to-b from-white via-cream-50/70 to-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-700">
              {uk ? "Емоції замість пилу на полицях" : "Эмоции вместо пыли на полках"}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-choco-950 sm:text-4xl">
              {seo.h2WhyEdible}
            </h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {seo.whyEdibleItems.map((item, idx) => (
              <div key={item.title} className="rounded-2xl border border-border/80 bg-white p-6 shadow-sm transition hover:border-gold-400 hover:shadow-md">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/15 font-display text-sm font-bold text-gold-800">
                  0{idx + 1}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-choco-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-choco-600">{item.desc}</p>
              </div>
            ))}
          </div>
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

      {/* Баннер бесплатного дегустационного сета */}
      <section className="mx-auto max-w-5xl px-4 pt-10 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-gold-500/50 bg-gradient-to-r from-choco-950 via-choco-900 to-choco-950 p-8 text-cream shadow-xl sm:p-10">
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-gold-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-400">
              {uk ? "Тест якості для вашої компанії" : "Тест качества для вашей компании"}
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
              {seo.tastingTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-cream/85 sm:text-base">
              {seo.tastingDesc}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://t.me/craftchococomua?text=${encodeURIComponent(
                  uk
                    ? "Доброго дня! Хочемо замовити безкоштовний дегустаційний сет для нашого офісу на корпоративні подарунки."
                    : "Здравствуйте! Хотим заказать бесплатный дегустационный сет для нашего офиса на корпоративные подарки."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-xs font-bold text-choco-950 shadow-md transition hover:bg-gold-400"
              >
                {seo.tastingBtnTg}
              </a>
              <a
                href="viber://chat?number=%2B380633190460"
                className="inline-flex items-center gap-2 rounded-full border border-gold-400/50 bg-white/10 px-6 py-3 text-xs font-bold text-cream backdrop-blur-sm transition hover:bg-white/20"
              >
                {seo.tastingBtnViber}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Интерактивный калькулятор сметы */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <CorporateEstimateCalculator locale={locale} />
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
