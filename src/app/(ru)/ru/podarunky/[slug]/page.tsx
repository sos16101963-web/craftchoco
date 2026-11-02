import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductLanding } from "@/components/site/product-landing";
import { catalogFor, formatPrice } from "@/lib/products";
import { PRODUCT_SLUGS, productIdBySlug } from "@/lib/slugs";
import { innerMeta } from "@/lib/inner-meta";

const locale = "ru" as const;

/** 14 статических посадочных: /ru/podarunky/<ru-slug> */
export function generateStaticParams() {
  return Object.values(PRODUCT_SLUGS.ru).map((slug) => ({ slug }));
}

function getProductTypeRu(p: { id: string; category: string }): string {
  if (p.id.startsWith("mediants")) return "Детские шоколадные медианты";
  if (p.category === "flowers") return "Шоколадный букет роз";
  if (p.category === "tiles") return "Шоколадная плитка / бруски";
  return "Шоколадный набор конфет";
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const id = productIdBySlug(slug, locale);
  const product = id ? catalogFor(locale).find((p) => p.id === id) : undefined;
  if (!product) return {};
  const ukSlug = (id && PRODUCT_SLUGS.uk[id]) ?? "";
  const typeName = getProductTypeRu(product);
  const title = `${typeName} ${product.name} — купить в Харькове от ${product.price} ₴ | CraftChoco`;
  return innerMeta(locale, {
    path: `/ru/podarunky/${slug}`,
    altPath: `/podarunky/${ukSlug}`,
    title,
    description: `Купить ${typeName.toLowerCase()} ${product.name} (${product.weight}) из бельгийского шоколада Callebaut в Харькове от ${product.price} ₴. Свежая партия ручной работы, быстрая доставка день в день: 096 253 56 10.`,
    image: product.image,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const id = productIdBySlug(slug, locale);
  const all = catalogFor(locale);
  const product = id ? all.find((p) => p.id === id) : undefined;
  if (!product) notFound();

  const related = all.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);
  const relatedFill =
    related.length < 3
      ? [...related, ...all.filter((p) => p.id !== product.id && !related.some((r) => r.id === p.id)).slice(0, 3 - related.length)]
      : related;

  return (
    <ProductLanding
      locale={locale}
      product={product as never}
      related={relatedFill as never[]}
      canonicalPath={`/ru/podarunky/${slug}`}
    />
  );
}
