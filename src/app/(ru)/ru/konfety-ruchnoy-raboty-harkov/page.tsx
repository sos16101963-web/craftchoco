import type { Metadata } from "next";
import { GeoTsukerkyPage } from "@/components/site/pages/geo-tsukerky-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/konfety-ruchnoy-raboty-harkov",
  altPath: "/tsukerky-ruchnoi-roboty-harkiv",
  title: "Конфеты ручной работы в Харькове от 130 ₴ — купить шоколадные наборы",
  description:
    "Купить конфеты ручной работы в Харькове из бельгийского Callebaut: наборы от 130 ₴, фруктовые ганаши и ручная роспись. Доставка по городу в день заказа.",
});

export default function Page() {
  return <GeoTsukerkyPage locale="ru" path="/ru/konfety-ruchnoy-raboty-harkov" />;
}
