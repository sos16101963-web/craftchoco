import type { Metadata } from "next";
import { GeoTsukerkyPage } from "@/components/site/pages/geo-tsukerky-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/konfety-ruchnoy-raboty-harkov",
  altPath: "/tsukerky-ruchnoi-roboty-harkiv",
  title: "Конфеты ручной работы в Харькове — купить набор от 150 ₴",
  description:
    "Конфеты ручной работы в Харькове из бельгийского Callebaut: наборы от 150 ₴, фруктовые ганаши, ручная роспись какао-маслом. Заказ онлайн или в Viber/Telegram, доставка в день заказа.",
});

export default function Page() {
  return <GeoTsukerkyPage locale="ru" path="/ru/konfety-ruchnoy-raboty-harkov" />;
}
