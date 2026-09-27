import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticlePage } from "@/components/site/pages/blog-article-page";
import { innerMeta } from "@/lib/inner-meta";
import { blogRu } from "@/lib/blog-ru";

const locale = "ru" as const;

export function generateStaticParams() {
  return blogRu.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = blogRu.find((a) => a.slug === slug);
  if (!article) return {};
  const ukArticle = (await import("@/lib/blog-uk")).blogUk.find((a) => a.date === article.date);
  return innerMeta(locale, {
    path: `/ru/blog/${slug}`,
    altPath: ukArticle ? `/blog/${ukArticle.slug}` : "/blog",
    title: `${article.title} | CraftChocoKharkiv`,
    description: article.description,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = blogRu.find((a) => a.slug === slug);
  if (!article) notFound();
  const others = blogRu.filter((a) => a.slug !== slug).slice(0, 3);
  return <BlogArticlePage locale={locale} path={`/ru/blog/${slug}`} article={article} others={others} />;
}
