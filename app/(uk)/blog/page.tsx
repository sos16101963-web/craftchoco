import type { Metadata } from "next";
import { BlogPage } from "@/components/site/pages/blog-page";
import { innerMeta } from "@/lib/inner-meta";
import { blogUk } from "@/lib/blog-uk";

export const metadata: Metadata = innerMeta("uk", {
  path: "/blog",
  altPath: "/ru/blog",
  title: "Блог про шоколад ручної роботи — зберігання, Callebaut, темперування | CraftChocoKharkiv",
  description:
    "База знань харківської майстерні CraftChocoKharkiv: як зберігати шоколад ручної роботи, чим Callebaut відрізняється від глазурі, що таке темперування, як обрати шоколадний подарунок.",
});

export default function Page() {
  return <BlogPage locale="uk" path="/blog" articles={blogUk} />;
}
