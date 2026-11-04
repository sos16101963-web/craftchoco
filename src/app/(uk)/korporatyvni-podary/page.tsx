import type { Metadata } from "next";
import { CorporatePage } from "@/components/site/pages/corporate-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/korporatyvni-podary",
  altPath: "/ru/korporativnye-podary",
  title: "Солодкі корпоративні подарунки на Миколая та Новий Рік для компаній — Набори від 130 ₴ | CraftChoco",
  description:
    "Солодкі подарунки на Миколая та Новий Рік для компаній: брендований крафтовий шоколад з логотипом. Набори від 130 ₴, безкоштовний дегустаційний сет для офісу, знижки до -10%, ФОП/ТОВ (IBAN), доставка по Україні.",
});

export default function Page() {
  return <CorporatePage locale="uk" path="/korporatyvni-podary" />;
}
