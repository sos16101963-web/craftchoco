import type { Metadata } from "next";
import { FaqPage } from "@/components/site/pages/faq-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/faq",
  altPath: "/ru/faq",
  title: "Питання та відповіді про крафтовий шоколад",
  description:
    "Відповіді на питання: як замовити шоколад у Харкові, терміни зберігання, оплата, доставка в спеку у термобоксі та корпоративні замовлення.",
});

export default function Page() {
  return <FaqPage locale="uk" path="/faq" />;
}
