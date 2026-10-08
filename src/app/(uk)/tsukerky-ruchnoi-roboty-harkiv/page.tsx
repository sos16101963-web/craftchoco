import type { Metadata } from "next";
import { GeoTsukerkyPage } from "@/components/site/pages/geo-tsukerky-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/tsukerky-ruchnoi-roboty-harkiv",
  altPath: "/ru/konfety-ruchnoy-raboty-harkov",
  title: "Цукерки ручної роботи в Харкові від 130 ₴ — купити шоколадні набори",
  description:
    "Купити цукерки ручної роботи в Харкові з бельгійського Callebaut: набори від 130 ₴, фруктові ганаші та ручний розпис. Доставка по місту в день замовлення.",
});

export default function Page() {
  return <GeoTsukerkyPage locale="uk" path="/tsukerky-ruchnoi-roboty-harkiv" />;
}
