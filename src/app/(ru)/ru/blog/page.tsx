import type { Metadata } from "next";
import { BlogPage } from "@/components/site/pages/blog-page";
import { innerMeta } from "@/lib/inner-meta";
import { blogRu } from "@/lib/blog-ru";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/blog",
  altPath: "/blog",
  title: "Блог о шоколаде ручной работы",
  description:
    "Гид по шоколаду: как хранить конфеты ручной работы, чем Callebaut отличается от глазури, секреты темперирования и выбора подарка.",
});

export default function Page() {
  return <BlogPage locale="ru" path="/ru/blog" articles={blogRu} />;
}
