import type { Metadata } from "next";
import { ReviewsPage } from "@/components/site/pages/reviews-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/otzyvy",
  altPath: "/vidhuky",
  title: "Отзывы клиентов о шоколадных наборах — кейсы и оценки",
  description:
    "Отзывы клиентов шоколадной мастерской в Харькове: 4,9 из 5 за 2800+ подарков. Реальные отзывы, свадебные и корпоративные заказы.",
});

export default function Page() {
  return <ReviewsPage locale="ru" path="/ru/otzyvy" />;
}
