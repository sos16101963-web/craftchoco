import { InnerShell } from "@/components/site/inner-shell";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PriceCalculator } from "@/components/site/pages/price-calculator";
import { switchPairFor } from "@/lib/pages";
import { catalogFor } from "@/lib/products";
import { productPath } from "@/lib/slugs";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { breadcrumbLd } from "@/lib/inner-meta";

export function PricesPage({ locale, path }: { locale: Locale; path: string }) {
  const uk = locale === "uk";
  const products = [...catalogFor(locale)].sort((a, b) => a.price - b.price);
  const t = getDict(locale);

  const seo = uk
    ? {
        kicker: "Прайс 2026 · Чесна вартість",
        h1: "Скільки коштують шоколадні цукерки ручної роботи у Харкові",
        sub: "Прозорий прайс майстерні CraftChoco: від 25 ₴ за авторську цукерку, готові подарункові набори від 130 ₴, шоколадні букети троянд та плитки з бельгійського Callebaut. Святкова коробка та термобокс у спеку — завжди 0 ₴. Без прихованих доплат: ціна на сайті = сума у вашому чеку.",
        h2Breakdown: "Скільки коштує набір цукерок ручної роботи за форматом",
        breakdowns: [
          {
            format: "Міні-компліменти",
            size: "4 цукерки · 35 г",
            price: "від 130 ₴",
            unit: "від 32.5 ₴ / цукерка",
            desc: "Компактний хіт «Чотири настрої». Найкраще рішення для невеликого знаку уваги колегам або дітям.",
          },
          {
            format: "Класичні набори",
            size: "6 цукерок · 50 г",
            price: "200 ₴",
            unit: "33 ₴ / цукерка",
            desc: "«Перше побачення» — витончена подарункова класика з яскравими фруктовими ганашами.",
          },
          {
            format: "Комбо-бокси",
            size: "9 цукерок + плитка · 180 г",
            price: "320 ₴",
            unit: "цукерки + плитка",
            desc: "«Подвійна насолода» — ідеальний баланс корпусних цукерок та ремісничого шоколаду з ягодами.",
          },
          {
            format: "Бізнес-набори",
            size: "12 цукерок · 120 г",
            price: "350 ₴",
            unit: "29 ₴ / цукерка",
            desc: "«Мелодія кохання» з шоколадними серцями та трояндами. Золотий стандарт подарунка близьким.",
          },
          {
            format: "Святкові флагмани",
            size: "16 цукерок · 130 г",
            price: "450 ₴",
            unit: "28 ₴ / цукерка",
            desc: "«Свято без приводу» — нарядна коробка з 4 фруктовими ганашами ручного розпису какао-маслом.",
          },
          {
            format: "Шоколадні букети",
            size: "від 4 до 6 троянд",
            price: "від 200 ₴ – 600 ₴",
            unit: "скульптурний Callebaut",
            desc: "Реалістичні квіти, які не в'януть і дарують справжній бельгійський шоколад замість листя.",
          },
        ],
        h2WhyCost: "З чого складається ціна цукерок ручної роботи",
        whyCostItems: [
          {
            title: "100% справжній бельгійський Callebaut",
            desc: "Ми використовуємо натуральне какао-масло преміум-сорту без дешевих гідрогенізованих жирів, пальмової олії та синтетичних замінників.",
          },
          {
            title: "Натуральні свіжі ганаші",
            desc: "Пюре французької маракуйї, свіжого лайма, соковитої лісової малини та манго. Без штучних порошкових ароматизаторів.",
          },
          {
            title: "4–6 годин ручної праці шоколатьє",
            desc: "Правильне темперування на мармуровій плиті для дзеркального глянцю та дзвінкого хрускоту. Кожен купол розписаний майстром вручну.",
          },
          {
            title: "Свіжість без хімічних консервантів",
            desc: "Цукерки живуть 14–30 днів, а не рік, як фабричні. Ви отримуєте свіжий десерт, приготований під ваше замовлення.",
          },
        ],
        h2Table: "Повний прайс на всі солодощі (актуальний на 2026 рік)",
        h2Calc: "Калькулятор: скільки коштуватиме ваш подарунок",
        h2Terms: "Що вже входить у вартість кожного набору (0 ₴ без доплат)",
        inclusions: [
          "Бельгійський шоколад Callebaut — без компромісів та «кондитерської глазурі»",
          "Святкова подарункова коробка зі стрічкою — 0 ₴",
          "Термобокс з охолодженням у теплу пору року — 0 ₴",
          "Живе фото вашого готового набору перед відправкою в Viber/Telegram — 0 ₴",
          "Фірмова листівка з вашим побажанням від руки — 0 ₴",
        ],
        h2Faq: "Часті запитання про вартість цукерок",
        faq: [
          {
            q: "Скільки коштує одна шоколадна цукерка ручної роботи?",
            a: "У середньому одна авторська цукерка ручної роботи з бельгійського шоколаду Callebaut коштує від 25 ₴ до 35 ₴ залежно від розміру набору та складності фруктового ганаша. Чим більша коробка, тим вигідніша ціна за одиницю.",
          },
          {
            q: "Скільки коштує найдоступніший готовий подарунок?",
            a: "Найдоступніший набір — міні-бокс «Чотири настрої» за 130 ₴ (4 цукерки з ганашами), а також порційні дитячі медіанти «Маленькі друзі: Четвірка» за 150 ₴. Це повноцінні подарунки у святковій упаковці.",
          },
          {
            q: "Чому цукерки ручної роботи коштують дорожче за фабричні плитки з супермаркету?",
            a: "У масовому шоколаді з супермаркету дороге какао-масло часто замінюють пальмовим жиром, а замість ягід кладуть ароматизатори. Ми працюємо з натуральним бельгійським какао-маслом Callebaut, натуральними ягодами та розписуємо кожну цукерку вручну без консервантів.",
          },
          {
            q: "Чи потрібно окремо доплачувати за подарункову коробку та стрічку?",
            a: "Ні, ніяких прихованих доплат немає. Усі набори вже упаковані у фірмові святкові коробки зі стрічкою. Ціна на сайті є остаточною.",
          },
          {
            q: "Яка вартість та умови доставки?",
            a: "По Харкову діє швидка доставка кур'єром. По Україні відправляємо Новою Поштою (1–2 дні). При замовленні від 1 500 ₴ доставка повністю безкоштовна.",
          },
        ],
      }
    : {
        kicker: "Прайс 2026 · Честная стоимость",
        h1: "Сколько стоят шоколадные конфеты ручной работы в Харькове",
        sub: "Прозрачный прайс мастерской CraftChoco: от 25 ₴ за авторскую конфету, готовые подарочные наборы от 130 ₴, шоколадные букеты роз и плитки из бельгийского Callebaut. Праздничная коробка и термобокс в жару — всегда 0 ₴. Без скрытых доплат: цена на сайте = сумма в вашем чеке.",
        h2Breakdown: "Сколько стоит набор конфет ручной работы по форматам",
        breakdowns: [
          {
            format: "Мини-комплименты",
            size: "4 конфеты · 35 г",
            price: "от 130 ₴",
            unit: "от 32.5 ₴ / конфета",
            desc: "Компактный хит «Четыре настроения». Лучшее решение для приятного знака внимания коллегам или детям.",
          },
          {
            format: "Классические наборы",
            size: "6 конфет · 50 г",
            price: "200 ₴",
            unit: "33 ₴ / конфета",
            desc: "«Первое свидание» — изящная подарочная классика с яркими фруктовыми ганашами.",
          },
          {
            format: "Комбо-боксы",
            size: "9 конфет + плитка · 180 г",
            price: "320 ₴",
            unit: "конфеты + плитка",
            desc: "«Двойное удовольствие» — идеальный баланс корпусных конфет и ремесленного шоколада с ягодами.",
          },
          {
            format: "Бизнес-наборы",
            size: "12 конфет · 120 г",
            price: "350 ₴",
            unit: "29 ₴ / конфета",
            desc: "«Мелодия любви» с шоколадными сердцами и розами. Золотой стандарт подарка близким.",
          },
          {
            format: "Праздничные флагманы",
            size: "16 конфет · 130 г",
            price: "450 ₴",
            unit: "28 ₴ / конфета",
            desc: "«Праздник без повода» — нарядная коробка с 4 фруктовыми ганашами ручной росписи какао-маслом.",
          },
          {
            format: "Шоколадные букеты",
            size: "от 4 до 6 роз",
            price: "от 200 ₴ – 600 ₴",
            unit: "скульптурный Callebaut",
            desc: "Реалистичные цветы, которые не вянут и дарят настоящий бельгийский шоколад вместо увядших лепестков.",
          },
        ],
        h2WhyCost: "Из чего складывается цена конфет ручной работы",
        whyCostItems: [
          {
            title: "100% настоящий бельгийский Callebaut",
            desc: "Мы используем натуральное какао-масло премиум-сорта без дешёвых гидрогенизированных жиров, пальмового масла и заменителей.",
          },
          {
            title: "Натуральные свежие ганаши",
            desc: "Пюре французской маракуйи, свежего лайма, лесной малины и манго. Без искусственных порошковых ароматизаторов.",
          },
          {
            title: "4–6 часов ручного труда шоколатье",
            desc: "Темперирование на мраморной плите для зеркального глянца и звонкого хруста. Каждый купол расписан мастером вручную.",
          },
          {
            title: "Свежесть без химических консервантов",
            desc: "Конфеты живут 14–30 дней, а не год, как фабричные. Вы получаете свежий десерт, приготовленный под ваш заказ.",
          },
        ],
        h2Table: "Полный прайс на все сладости (актуальный на 2026 год)",
        h2Calc: "Калькулятор: сколько будет стоить ваш подарок",
        h2Terms: "Что уже входит в стоимость каждого набора (0 ₴ без доплат)",
        inclusions: [
          "Бельгийский шоколад Callebaut — без компромиссов и «кондитерской глазури»",
          "Праздничная подарочная коробка с лентой — 0 ₴",
          "Термобокс с охлаждением в тёплое время года — 0 ₴",
          "Живое фото вашего готового набора перед отправкой в Viber/Telegram — 0 ₴",
          "Фирменная открытка с вашим пожеланием от руки — 0 ₴",
        ],
        h2Faq: "Частые вопросы о стоимости конфет",
        faq: [
          {
            q: "Сколько стоит одна шоколадная конфета ручной работы?",
            a: "В среднем одна авторская конфета ручной работы из бельгийского шоколада Callebaut стоит от 25 ₴ до 35 ₴ в зависимости от объёма набора и рецептуры начинки. Чем больше коробка, тем выгоднее цена за штуку.",
          },
          {
            q: "Сколько стоит самый доступный готовый подарок?",
            a: "Самый доступный набор — мини-бокс «Четыре настроения» за 130 ₴ (4 конфеты с ганашами), а также детские медианты со зверятами за 150 ₴. Это полноценные подарки в праздничной упаковке.",
          },
          {
            q: "Почему конфеты ручной работы стоят дороже фабричных из супермаркета?",
            a: "В фабричном шоколаде какао-масло заменяют пальмовым жиром, а вместо ягод используют химические ароматизаторы. Мы работаем с натуральным бельгийским какао-маслом Callebaut, натуральными фруктами и расписываем конфеты вручную без консервантов.",
          },
          {
            q: "Нужно ли отдельно доплачивать за подарочную коробку и ленту?",
            a: "Нет, никаких скрытых доплат. Все наборы упакованы в подарочные коробки с лентой. Цена на сайте является окончательной.",
          },
          {
            q: "Какая стоимость и условия доставки?",
            a: "По Харькову действует быстрая курьерская доставка. По Украине отправляем Новой Почтой (1–2 дня). При заказе от 1 500 ₴ доставка бесплатная.",
          },
        ],
      };

  return (
    <InnerShell locale={locale} switchPair={switchPairFor(path)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([{ name: uk ? "Головна" : "Главная", path: uk ? "/" : "/ru" }, { name: uk ? "Ціни" : "Цены", path }]),
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
      <section className="bg-choco-950 pb-14 pt-32 text-cream sm:pt-36">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-gold-400">{seo.kicker}</p>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-5xl lg:text-5xl">{seo.h1}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream/85">{seo.sub}</p>
        </div>
      </section>

      {/* Быстрый гид: сколько стоит коробка конфет по форматам */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-700">
            {uk ? "Орієнтир за бюджетом" : "Ориентир по бюджету"}
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold text-choco-950 sm:text-3xl">
            {seo.h2Breakdown}
          </h2>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {seo.breakdowns.map((b) => (
            <div key={b.format} className="flex flex-col justify-between rounded-2xl border border-border/80 bg-white p-6 shadow-sm hover:border-gold-500/50 hover:shadow-md transition">
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-bold text-choco-900">{b.format}</h3>
                  <span className="font-display text-xl font-bold text-gold-700">{b.price}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-choco-500">
                  <span>{b.size}</span>
                  <span className="font-semibold text-emerald-700">{b.unit}</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-choco-600">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Почему конфеты ручной работы стоят дороже фабричных */}
      <section className="border-y border-gold-500/20 bg-cream-100/60 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-700">
              {uk ? "Цінність у кожній цукерці" : "Ценность в каждой конфете"}
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-choco-950 sm:text-3xl">
              {seo.h2WhyCost}
            </h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {seo.whyCostItems.map((item, idx) => (
              <div key={item.title} className="rounded-2xl border border-border/80 bg-white p-5 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500/15 font-display text-sm font-bold text-gold-800">
                  0{idx + 1}
                </span>
                <h3 className="mt-3 font-display text-base font-bold text-choco-900">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-choco-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Полный прайс-лист таблица */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-bold text-choco-900 sm:text-3xl">{seo.h2Table}</h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-cream-100 text-xs uppercase tracking-wider text-choco-600">
                <th className="px-5 py-3.5 font-semibold">{uk ? "Набір" : "Набор"}</th>
                <th className="px-5 py-3.5 font-semibold">{t.common.weight}</th>
                <th className="px-5 py-3.5 font-semibold">{uk ? "Ціна" : "Цена"}</th>
                <th className="px-5 py-3.5 font-semibold" aria-label={uk ? "Сторінка набору" : "Страница набора"} />
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-border/60 last:border-0 hover:bg-gold-500/5">
                  <td className="px-5 py-3.5 font-semibold text-choco-900">{p.name}</td>
                  <td className="px-5 py-3.5 text-choco-600">{p.weight}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 font-bold text-gold-700">
                    {p.priceFrom ? `${uk ? "від" : "от"} ` : ""}
                    {p.price} ₴
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <a href={productPath(p.id, locale)} className="font-semibold text-choco-700 underline decoration-gold-500/50 underline-offset-4 hover:text-gold-700">
                      {t.common.details}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-choco-500">
          {uk
            ? `Замовлення від ${site.freeShippingFrom.toLocaleString("uk-UA")} ₴ доставимо безкоштовно по Харкову та Новою поштою.`
            : `Заказы от ${site.freeShippingFrom.toLocaleString("ru-RU")} ₴ доставим бесплатно по Харькову и Новой почтой.`}
        </p>
      </section>

      {/* Интерактивный калькулятор подарка */}
      <section className="bg-cream-100/60 py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-choco-900 sm:text-3xl">{seo.h2Calc}</h2>
          <div className="mt-8">
            <PriceCalculator locale={locale} />
          </div>
        </div>
      </section>

      {/* Что входит в стоимость */}
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-bold text-choco-900 sm:text-3xl">{seo.h2Terms}</h2>
        <ul className="mt-6 space-y-3">
          {seo.inclusions.map((line) => (
            <li key={line} className="flex items-start gap-3 rounded-xl border border-border bg-white px-5 py-3.5 text-[15px] leading-relaxed text-choco-800">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
              {line}
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ для поиска: Сколько стоят конфеты ручной работы */}
      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        <h2 className="font-display text-2xl font-bold text-choco-900 sm:text-3xl">{seo.h2Faq}</h2>
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
