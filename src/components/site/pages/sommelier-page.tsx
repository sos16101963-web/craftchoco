import Link from "next/link";
import { InnerShell } from "@/components/site/inner-shell";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { ChocolateSommelier } from "@/components/site/chocolate-sommelier";
import { ThermoBanner } from "@/components/site/thermo-banner";
import { switchPairFor } from "@/lib/pages";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import { breadcrumbLd } from "@/lib/inner-meta";
import { Sparkles, Heart, Award, ShieldCheck, Truck, HelpCircle } from "lucide-react";

export function SommelierPage({ locale, path }: { locale: Locale; path: string }) {
  const uk = locale === "uk";

  const seo = uk
    ? {
        kicker: "Крафтовий подарунковий гід · CraftChoco",
        h1: "Шоколадний сомельє: підбір подарунка за психотипом, емоцією та бюджетом",
        intro:
          "Звичайні магазини пропонують випадкові коробки. Наш інтерактивний Шоколадний сомельє аналізує характер адресата, привід та смакові вподобання — і за 20 секунд пропонує ідеальний набір ручної роботи зі свіжого бельгійського шоколаду Callebaut. З персональним обґрунтуванням смаку та знижкою 10% за промокодом SOMELIER10.",
        breadcrumbs: [{ name: "Шоколадний сомельє", path: "/sommelier" }],
        guideTitle: "Як Шоколадний сомельє обирає ваш подарунок",
        guideItems: [
          {
            icon: Heart,
            title: "Психотип та статус адресата",
            text: "Для дівчини важлива естетика та ніжність (реалістичні троянди, витончені серця), для чоловіка — стриманий дизайн та насичене гірке какао Callebaut 70%, для сім'ї — багате асорті ягід і горіхів.",
          },
          {
            icon: Sparkles,
            title: "Бажана емоція та ефект",
            text: "Шоколад дарують заради спогадів. Сомельє враховує, що саме потрібно: викликати вау-ефект від скульптурних троянд чи подарувати затишок у формі гарячої кави з ремісничими брусочками.",
          },
          {
            icon: Award,
            title: "Баланс смакових нот",
            text: "Алгоритм підбирає набори з ідеальним співвідношенням солодкості, фруктової кислинки маракуйї чи малини та шляхетної какао-гірчинки без зайвої нудотності.",
          },
          {
            icon: ShieldCheck,
            title: "100% свіжість та ручний розпис",
            text: "Кожен набір готується під замовлення в харківській майстерні з натурального какао-масла без пальмового жиру та штучних консервантів.",
          },
        ],
        faqTitle: "Часті запитання про підбір шоколадного подарунка",
        faqs: [
          {
            q: "Що робити, якщо я зовсім не знаю, який шоколад любить людина?",
            a: "Обирайте опцію «Асорті» та універсальний набір «Свято без приводу» на 16 цукерок або «Подвійна насолода» (9 цукерок + плитка). У таких наборах зібрані як класичні молочні смаки, так і фруктові ганаші з маракуйєю та малиною — кожен обов'язково знайде свій фаворит.",
          },
          {
            q: "Як скористатися промокодом SOMELIER10?",
            a: "Після вибору набору натисніть кнопку «Замовити зі знижкою 10% в Telegram». Промокод автоматично додасться до повідомлення, і шоколатьє врахує знижку -10% при узгодженні замовлення.",
          },
          {
            q: "Чи можна замінити окремі смаки в наборі?",
            a: "Так! Оскільки ми — крафтова майстерня, перед відправкою у Telegram або Viber ви можете попросити прибрати певний алерген або додати більше саме тих цукерок, які подобаються вашому адресату.",
          },
          {
            q: "Як швидко доставляється обраний набір?",
            a: "По Харкову діє швидка кур'єрська доставка в день замовлення або на обраний вами час. По Україні відправляємо Новою Поштою у термоупаковці за 1–2 дні.",
          },
        ],
      }
    : {
        kicker: "Крафтовый подарочный гид · CraftChoco",
        h1: "Шоколадный сомелье: подбор подарка по психотипу, эмоции и бюджету",
        intro:
          "Обычные магазины предлагают случайные коробки. Наш интерактивный Шоколадный сомелье анализирует характер адресата, повод и вкусовые предпочтения — и за 20 секунд подбирает идеальный набор ручной работы из бельгийского шоколада Callebaut. С персональным обоснованием вкуса и скидкой 10% по промокоду SOMELIER10.",
        breadcrumbs: [{ name: "Шоколадный сомелье", path: "/ru/sommelier" }],
        guideTitle: "Как Шоколадный сомелье выбирает ваш подарок",
        guideItems: [
          {
            icon: Heart,
            title: "Психотип и статус адресата",
            text: "Для девушки важна эстетика и нежность (реалистичные розы, изящные сердца), для мужчины — сдержанный дизайн и благородное горькое какао Callebaut 70%, для семьи — богатое ассорти ягод и орехов.",
          },
          {
            icon: Sparkles,
            title: "Желаемая эмоция и эффект",
            text: "Шоколад дарят ради ярких эмоций. Сомелье учитывает, что именно нужно: вызвать вау-эффект от скульптурных роз или подарить уют в форме горячего кофе с ремесленными брусочками.",
          },
          {
            icon: Award,
            title: "Баланс вкусовых нот",
            text: "Алгоритм подбирает наборы с идеальным балансом сладости, фруктовой кислинки маракуйи или малины и благородной какао-горчинки без приторности.",
          },
          {
            icon: ShieldCheck,
            title: "100% свежесть и ручная роспись",
            text: "Каждый набор создаётся под заказ в харьковской мастерской из натурального какао-масла без пальмового жира и искусственных консервантов.",
          },
        ],
        faqTitle: "Частые вопросы о подборе шоколадного подарка",
        faqs: [
          {
            q: "Что делать, если я не знаю, какой шоколад любит человек?",
            a: "Выбирайте опцию «Ассорти» и универсальный набор «Праздник без повода» на 16 конфет или «Двойное удовольствие» (9 конфет + плитка). В них собраны классические молочные вкусы и фруктовые ганаши — каждый обязательно найдёт свой фаворит.",
          },
          {
            q: "Как воспользоваться промокодом SOMELIER10?",
            a: "После подбора набора нажмите кнопку «Заказать со скидкой 10% в Telegram». Промокод автоматически включится в сообщение, и шоколатье учтёт скидку -10% при согласовании заказа.",
          },
          {
            q: "Можно ли заменить вкусы в наборе?",
            a: "Да! Так как мы — крафтовая мастерская, перед отправкой в Telegram или Viber вы можете попросить убрать определённый аллерген или добавить больше тех вкусов, которые нравятся вашему получателю.",
          },
          {
            q: "Как быстро доставляется выбранный набор?",
            a: "По Харькову действует быстрая курьерская доставка в день заказа либо к точному времени. По Украине отправляем Новой Почтой в термоупаковке за 1–2 дня.",
          },
        ],
      };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: seo.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <InnerShell locale={locale} switchPair={switchPairFor(path)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: uk ? "Головна" : "Главная", path: uk ? "/" : "/ru" },
              { name: uk ? "Шоколадний сомельє" : "Шоколадный сомелье", path },
            ])
          ).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero Header */}
      <section className="bg-choco-950 pb-12 pt-32 text-cream sm:pt-36">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-gold-400">
            {seo.kicker}
          </p>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl text-cream">
            {seo.h1}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream/85 sm:text-lg">
            {seo.intro}
          </p>
        </div>
      </section>

      <ThermoBanner locale={locale} />

      {/* Хлебные крошки */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={seo.breadcrumbs} locale={locale} />
      </div>

      {/* Интерактивный шоколадный сомелье */}
      <div className="pb-16">
        <ChocolateSommelier locale={locale} standalone />
      </div>

      {/* Экспертный гид сомелье */}
      <section className="bg-cream-100 py-16 lg:py-24 border-t border-gold-500/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-700">
              {uk ? "Методологія майстерні" : "Методология мастерской"}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-choco-950 sm:text-4xl">
              {seo.guideTitle}
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {seo.guideItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-border/80 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-800">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-choco-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-choco-600">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-800">
              <HelpCircle className="h-4 w-4 text-gold-600" />
              {uk ? "Запитання та відповіді" : "Вопросы и ответы"}
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold text-choco-950 sm:text-4xl">
              {seo.faqTitle}
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {seo.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border/80 bg-white p-6 shadow-sm"
              >
                <h3 className="font-display text-lg font-bold text-choco-950">
                  {faq.q}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-choco-700">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href={uk ? "/katalog" : "/ru/katalog"}
              className="inline-flex items-center gap-2 rounded-xl bg-choco-900 px-6 py-3 text-sm font-bold text-gold-300 hover:bg-choco-800 transition-colors shadow-sm"
            >
              {uk ? "Переглянути весь каталог цукерок" : "Посмотреть весь каталог конфет"}
            </Link>
          </div>
        </div>
      </section>
    </InnerShell>
  );
}
