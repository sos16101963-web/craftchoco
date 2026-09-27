import type { Metadata } from "next";
import { CorporatePage } from "@/components/site/pages/corporate-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/korporativnye-podary",
  altPath: "/korporatyvni-podary",
  title: "Корпоративные подарки с логотипом в Харькове — шоколад от 30 шт.",
  description:
    "Корпоративные шоколадные подарки: тиражи с гравировкой логотипа от 30 наборов, дегустационные образцы, безналичный расчёт, доставка по Харькову.",
});

export default function Page() {
  return <CorporatePage locale="ru" path="/ru/korporativnye-podary" />;
}
