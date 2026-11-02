import type { Metadata } from "next";
import { GeoTsukerkyPage } from "@/components/site/pages/geo-tsukerky-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/konfety-ruchnoy-raboty-harkov",
  altPath: "/tsukerky-ruchnoi-roboty-harkiv",
  title: "Купить конфеты ручной работы в Харькове от 130 ₴ | CraftChoco",
  description:
    "Купить крафтовые шоколадные конфеты ручной работы в Харькове из бельгийского Callebaut от 130 ₴: свежие фруктовые ганаши и ручная роспись. Доставка день в день!",
});

export default function Page() {
  return <GeoTsukerkyPage locale="ru" path="/ru/konfety-ruchnoy-raboty-harkov" />;
}
