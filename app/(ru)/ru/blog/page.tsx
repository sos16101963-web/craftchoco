import type { Metadata } from "next";
import { BlogPage } from "@/components/site/pages/blog-page";
import { innerMeta } from "@/lib/inner-meta";
import { blogRu } from "@/lib/blog-ru";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/blog",
  altPath: "/blog",
  title: "Блог о шоколаде ручной работы — хранение, Callebaut, темперирование | CraftChocoKharkiv",
  description:
    "База знаний харьковской мастерской CraftChocoKharkiv: как хранить шоколад ручной работы, чем Callebaut отличается от глазури, что такое темперирование, как выбрать шоколадный подарок.",
});

export default function Page() {
  return <BlogPage locale="ru" path="/ru/blog" articles={blogRu} />;
}
