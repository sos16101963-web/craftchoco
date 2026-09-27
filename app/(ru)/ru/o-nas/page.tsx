import type { Metadata } from "next";
import { AboutPage } from "@/components/site/pages/about-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/o-nas",
  altPath: "/pro-nas",
  title: "О шоколадной мастерской CraftChocoKharkiv в Харькове — ручная работа, Callebaut",
  description:
    "История и принципы харьковской мастерской CraftChocoKharkiv: конфеты ручной работы из бельгийского шоколада Callebaut, малые партии, темперирование по стандарту, 2000+ счастливых семей.",
});

export default function Page() {
  return <AboutPage locale="ru" path="/ru/o-nas" />;
}
