import type { Metadata } from "next";
import { GeoTsukerkyPage } from "@/components/site/pages/geo-tsukerky-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/tsukerky-ruchnoi-roboty-harkiv",
  altPath: "/ru/konfety-ruchnoy-raboty-harkov",
  title: "Цукерки ручної роботи в Харкові — купити набір від 150 ₴ | CraftChocoKharkiv",
  description:
    "Цукерки ручної роботи в Харкові з бельгійського Callebaut: набори від 150 ₴, фруктові ганаши, ручна розписка какао-маслом. Замовлення онлайн або в Viber/Telegram, доставка в день замовлення.",
});

export default function Page() {
  return <GeoTsukerkyPage locale="uk" path="/tsukerky-ruchnoi-roboty-harkiv" />;
}
