import type { Metadata } from "next";
import { GeoShokoladPage } from "@/components/site/pages/geo-shokolad-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/shokolad-harkov",
  altPath: "/shokolad-harkiv",
  title: "Шоколад ручной работы в Харькове — на заказ из Callebaut | CraftChocoKharkiv",
  description:
    "Шоколад ручной работы в Харькове от мастерской CraftChocoKharkiv: конфеты, плитки и букеты из бельгийского Callebaut. Курьер в день заказа по всем районам, термобокс в жару.",
});

export default function Page() {
  return <GeoShokoladPage locale="ru" path="/ru/shokolad-harkov" />;
}
