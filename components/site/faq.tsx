import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function Faq({ locale }: { locale: Locale }) {
  const t = getDict(locale).faq;
  return (
    <section id="faq" className="bg-cream-100 py-20 lg:py-28" aria-label={t.aria}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="divider-gold text-[13px] font-semibold uppercase tracking-[0.3em] text-gold-700">{t.kicker}</p>
          <h2 className="mt-4 font-display text-4xl font-bold text-choco-900 sm:text-5xl">{t.h2}</h2>
          <p className="mt-4 text-lg leading-relaxed text-choco-600">
            {t.sub}
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-12 space-y-3.5">
          {t.items.map((f: { q: string; a: string }, i: number) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-2xl border border-border bg-white/85 px-6 shadow-sm last:border-border data-[state=open]:border-gold-500/50"
            >
              <AccordionTrigger className="py-5 text-left font-display text-lg font-bold text-choco-900 hover:no-underline hover:text-choco-700">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-[15px] leading-relaxed text-choco-600">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
