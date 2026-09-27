import type { Metadata } from "next";
import { PricesPage } from "@/components/site/pages/prices-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/tsiny",
  altPath: "/ru/tseny",
  title: "Ціни на шоколадні цукерки ручної роботи в Харкові (2026) | CraftChocoKharkiv",
  description:
    "Прозорий прайс майстерні CraftChocoKharkiv: набори цукерок від 150 ₴, букети та плитки з Callebaut. Калькулятор подарунка за бюджетом і корпоративного тиражу. Упаковка — безкоштовно.",
});

export default function Page() {
  return <PricesPage locale="uk" path="/tsiny" />;
}
