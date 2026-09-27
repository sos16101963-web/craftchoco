import type { Metadata } from "next";
import { ReviewsPage } from "@/components/site/pages/reviews-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/otzyvy",
  altPath: "/vidhuky",
  title: "Отзывы о конфетах ручной работы CraftChocoKharkiv — кейсы и оценки",
  description:
    "Отзывы клиентов мастерской CraftChocoKharkiv (Харьков): 4,9 из 5 за 2800+ подарков. Кейсы: корпоративные тиражи с логотипом, свадебные мини-букеты, ежемесячные подписки для офисов.",
});

export default function Page() {
  return <ReviewsPage locale="ru" path="/ru/otzyvy" />;
}
