import type { Metadata } from "next";
import { PricesPage } from "@/components/site/pages/prices-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/tseny",
  altPath: "/tsiny",
  title: "Сколько стоят конфеты ручной работы: прайс и цены 2026 | CraftChoco",
  description:
    "Сколько стоят шоколадные конфеты ручной работы: от 25 ₴ за штуку, готовые наборы от 130 ₴, шоколадные букеты из Callebaut. Честный прайс 2026 года, праздничная коробка — бесплатно.",
});

export default function Page() {
  return <PricesPage locale="ru" path="/ru/tseny" />;
}
