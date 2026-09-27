import type { Metadata } from "next";
import { GeoShokoladPage } from "@/components/site/pages/geo-shokolad-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/shokolad-harkov",
  altPath: "/shokolad-harkiv",
  title: "Шоколад ручной работы в Харькове из Callebaut",
  description:
    "Шоколад ручной работы в Харькове: авторские конфеты, плитки и букеты из бельгийского Callebaut. Доставка в день заказа по всем районам города.",
});

export default function Page() {
  return <GeoShokoladPage locale="ru" path="/ru/shokolad-harkov" />;
}
