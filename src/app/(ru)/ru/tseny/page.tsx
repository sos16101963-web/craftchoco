import type { Metadata } from "next";
import { PricesPage } from "@/components/site/pages/prices-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/tseny",
  altPath: "/tsiny",
  title: "Цены на шоколадные конфеты ручной работы в Харькове",
  description:
    "Прайс мастерской CraftChoco: наборы конфет от 150 ₴, букеты и плитки из Callebaut. Бесплатная упаковка, доставка по Харькову в день заказа.",
});

export default function Page() {
  return <PricesPage locale="ru" path="/ru/tseny" />;
}
