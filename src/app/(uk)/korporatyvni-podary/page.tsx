import type { Metadata } from "next";
import { CorporatePage } from "@/components/site/pages/corporate-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/korporatyvni-podary",
  altPath: "/ru/korporativnye-podary",
  title: "Корпоративні подарунки з шоколаду від 30 шт.",
  description:
    "Корпоративні шоколадні подарунки: тиражі з гравіюванням логотипа від 30 наборів, дегустаційні зразки, безготівковий розрахунок, доставка по Харкову.",
});

export default function Page() {
  return <CorporatePage locale="uk" path="/korporatyvni-podary" />;
}
