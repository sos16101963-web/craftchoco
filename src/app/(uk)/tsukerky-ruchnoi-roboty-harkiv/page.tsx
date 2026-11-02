import type { Metadata } from "next";
import { GeoTsukerkyPage } from "@/components/site/pages/geo-tsukerky-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/tsukerky-ruchnoi-roboty-harkiv",
  altPath: "/ru/konfety-ruchnoy-raboty-harkov",
  title: "Купити цукерки ручної роботи у Харкові від 130 ₴ | CraftChoco",
  description:
    "Купити крафтові шоколадні цукерки ручної роботи у Харкові з бельгійського Callebaut від 130 ₴: свіжі фруктові ганаші та ручний розпис. Доставка день у день!",
});

export default function Page() {
  return <GeoTsukerkyPage locale="uk" path="/tsukerky-ruchnoi-roboty-harkiv" />;
}
