import type { Metadata } from "next";
import { BlogPage } from "@/components/site/pages/blog-page";
import { innerMeta } from "@/lib/inner-meta";
import { blogUk } from "@/lib/blog-uk";

export const metadata: Metadata = innerMeta("uk", {
  path: "/blog",
  altPath: "/ru/blog",
  title: "Блог про шоколад ручної роботи",
  description:
    "Гід по шоколаду: як зберігати цукерки ручної роботи, чим Callebaut відрізняється від глазурі, секрети темперування та вибору подарунка.",
});

export default function Page() {
  return <BlogPage locale="uk" path="/blog" articles={blogUk} />;
}
