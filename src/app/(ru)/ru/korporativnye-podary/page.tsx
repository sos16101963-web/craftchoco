import type { Metadata } from "next";
import { CorporatePage } from "@/components/site/pages/corporate-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/korporativnye-podary",
  altPath: "/korporatyvni-podary",
  title: "Съедобные корпоративные подарки с логотипом в Харькове — Сладкие наборы от 130 ₴ | CraftChoco",
  description:
    "Корпоративный шоколад и съедобные подарки с логотипом компании к Новому году и Николаю. Наборы от 130 ₴, бесплатный дегустационный сет в офис, скидки до 10%, безнал ФЛП/ООО.",
});

export default function Page() {
  return <CorporatePage locale="ru" path="/ru/korporativnye-podary" />;
}
