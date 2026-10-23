import type { Metadata } from "next";
import { CorporatePage } from "@/components/site/pages/corporate-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/korporativnye-podary",
  altPath: "/korporatyvni-podary",
  title: "Съедобные корпоративные подарки из шоколада: наборы для коллег и партнёров | CraftChoco",
  description:
    "Съедобные корпоративные подарки из бельгийского шоколада Callebaut ручной работы. Наборы от 130 ₴ к Новому году 2026: фирменные открытки с логотипом, скидки до 10%, дегустационный сет для офиса, безналичный расчёт.",
});

export default function Page() {
  return <CorporatePage locale="ru" path="/ru/korporativnye-podary" />;
}
