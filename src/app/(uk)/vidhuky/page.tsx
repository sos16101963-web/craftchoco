import type { Metadata } from "next";
import { ReviewsPage } from "@/components/site/pages/reviews-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/vidhuky",
  altPath: "/ru/otzyvy",
  title: "Відгуки про шоколадні цукерки CraftChocoKharkiv — кейси та оцінки",
  description:
    "Відгуки клієнтів майстерні CraftChocoKharkiv (Харків): 4,9 з 5 за 2800+ подарунків. Кейси: корпоративні тиражі з логотипом, весільні міні-букети, щомісячні передплати для офісів.",
});

export default function Page() {
  return <ReviewsPage locale="uk" path="/vidhuky" />;
}
