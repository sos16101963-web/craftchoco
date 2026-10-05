import type { Metadata } from "next";
import { AboutPage } from "@/components/site/pages/about-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/o-nas",
  altPath: "/pro-nas",
  title: "О мастерской шоколада в Харькове",
  description:
    "История и принципы мастерской CraftChoco: конфеты ручной работы из бельгийского Callebaut, темперирование по стандарту, 500+ выполненных заказов.",
});

export default function Page() {
  return <AboutPage locale="ru" path="/ru/o-nas" />;
}
