import type { Metadata } from "next";
import { ReviewsPage } from "@/components/site/pages/reviews-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/vidhuky",
  altPath: "/ru/otzyvy",
  title: "Відгуки про шоколадні набори в Харкові",
  description:
    "Відгуки клієнтів майстерні шоколаду CraftChoco в Харкові: 4,9 з 5 за 2800+ подарунків. Реальні кейси, весільні та корпоративні замовлення.",
});

export default function Page() {
  return <ReviewsPage locale="uk" path="/vidhuky" />;
}
