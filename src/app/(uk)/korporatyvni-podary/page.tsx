import type { Metadata } from "next";
import { CorporatePage } from "@/components/site/pages/corporate-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/korporatyvni-podary",
  altPath: "/ru/korporativnye-podary",
  title: "Їстівні корпоративні подарунки з логотипом у Харкові — Солодкі набори від 130 ₴ | CraftChoco",
  description:
    "Крафтовий корпоративний шоколад та їстівні подарунки з логотипом компанії до Нового року та Миколая. Набори від 130 ₴, безкоштовний дегустаційний сет для офісу, знижки до -10%, ФОП/ТОВ (IBAN).",
});

export default function Page() {
  return <CorporatePage locale="uk" path="/korporatyvni-podary" />;
}
