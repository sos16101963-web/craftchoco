import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticlePage } from "@/components/site/pages/blog-article-page";
import { innerMeta } from "@/lib/inner-meta";
import { blogUk } from "@/lib/blog-uk";

const locale = "uk" as const;

export function generateStaticParams() {
  return blogUk.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = blogUk.find((a) => a.slug === slug);
  if (!article) return {};
  const ruArticle = (await import("@/lib/blog-ru")).blogRu.find((a) => a.date === article.date);
  return innerMeta(locale, {
    path: `/blog/${slug}`,
    altPath: ruArticle ? `/ru/blog/${ruArticle.slug}` : "/ru/blog",
    title: article.title,
    description: article.description,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = blogUk.find((a) => a.slug === slug);
  if (!article) notFound();
  const others = blogUk.filter((a) => a.slug !== slug).slice(0, 3);
  return <BlogArticlePage locale={locale} path={`/blog/${slug}`} article={article} others={others} />;
}
