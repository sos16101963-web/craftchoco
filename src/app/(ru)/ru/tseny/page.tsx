import type { Metadata } from "next";
import { PricesPage } from "@/components/site/pages/prices-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/tseny",
  altPath: "/tsiny",
  title: "Цены на шоколадные конфеты ручной работы в Харькове (2026)",
  description:
    "Прозрачный прайс мастерской CraftChocoKharkiv: наборы конфет от 150 ₴, букеты и плитки из Callebaut. Калькулятор подарка по бюджету и корпоративного тиража. Упаковка — бесплатно.",
});

export default function Page() {
  return <PricesPage locale="ru" path="/ru/tseny" />;
}
