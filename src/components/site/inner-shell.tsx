import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { CartSheet } from "@/components/site/cart-sheet";
import { LeadMagnet } from "@/components/site/lead-magnet";
import { StarSprite } from "@/components/site/stars";
import type { Locale } from "@/lib/i18n";

/**
 * Оболочка внутренних страниц многостраничника.
 * Отличие от SiteShell: без 3D-погружения и тяжёлых блоков главной —
 * быстрая загрузка посадочных, полный вес которого отдан SEO-контенту.
 */
export function InnerShell({
  locale,
  switchPair,
  children,
}: {
  locale: Locale;
  /** пара (uk, ru) для переключателя языков */
  switchPair: { uk: string; ru: string };
  children: React.ReactNode;
}) {
  return (
    <>
      <StarSprite />
      <Header locale={locale} switchPair={switchPair} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
      <CartSheet locale={locale} />
      <LeadMagnet locale={locale} />
    </>
  );
}
