import type { Metadata } from "next";
import { PricesPage } from "@/components/site/pages/prices-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/tsiny",
  altPath: "/ru/tseny",
  title: "Скільки коштують цукерки ручної роботи: прайс та ціни 2026 | CraftChoco",
  description:
    "Скільки коштують шоколадні цукерки ручної роботи: від 25 ₴ за штуку, готові набори від 130 ₴, шоколадні букети з Callebaut. Чесний прайс 2026 року, святкова коробка — безкоштовно.",
});

export default function Page() {
  return <PricesPage locale="uk" path="/tsiny" />;
}
