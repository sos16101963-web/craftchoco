import type { Metadata } from "next";
import { CatalogPage } from "@/components/site/pages/catalog-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/katalog",
  altPath: "/katalog",
  title: "Каталог конфет ручной работы в Харькове — 14 наборов | CraftChocoKharkiv",
  description:
    "Каталог наборов конфет, плиток и шоколадных букетов ручной работы из бельгийского Callebaut. Цены от 150 ₴, подарочная упаковка бесплатно, доставка по Харькову в день заказа.",
});

export default function Page() {
  return <CatalogPage locale="ru" path="/ru/katalog" />;
}
