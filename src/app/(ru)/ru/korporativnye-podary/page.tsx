import type { Metadata } from "next";
import { CorporatePage } from "@/components/site/pages/corporate-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/korporativnye-podary",
  altPath: "/korporatyvni-podary",
  title: "Брендированные и сладкие подарки на Николая и Новый Год для компаний — Наборы от 130 ₴ | CraftChoco",
  description:
    "Брендированные сладкие подарки на Николая и Новый Год для компаний: корпоративный крафтовый шоколад с логотипом. Наборы от 130 ₴, бесплатный дегустационный сет в офис, скидки до -10%, безнал ФЛП/ООО, доставка по Украине.",
});

export default function Page() {
  return <CorporatePage locale="ru" path="/ru/korporativnye-podary" />;
}
