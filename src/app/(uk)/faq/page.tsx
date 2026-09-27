import type { Metadata } from "next";
import { FaqPage } from "@/components/site/pages/faq-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/faq",
  altPath: "/ru/faq",
  title: "Питання та відповіді про шоколад ручної роботи в Харкові",
  description:
    "Відповіді майстра на часті питання: скільки зберігаються цукерки, як замовити, як оплатити, чи доїдуть у спеку, корпоративні тиражі з логотипом. Харків, CraftChocoKharkiv.",
});

export default function Page() {
  return <FaqPage locale="uk" path="/faq" />;
}
