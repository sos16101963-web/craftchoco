import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductLanding } from "@/components/site/product-landing";
import { catalogFor } from "@/lib/products";
import { PRODUCT_SLUGS, productIdBySlug } from "@/lib/slugs";
import { innerMeta } from "@/lib/inner-meta";
import { formatPrice } from "@/lib/products";

const locale = "uk" as const;

/** 14 статических посадочных: /podarunky/<uk-slug> */
export function generateStaticParams() {
  return Object.values(PRODUCT_SLUGS.uk).map((slug) => ({ slug }));
}

function getProductTypeUk(p: { id: string; category: string }): string {
  if (p.id.startsWith("mediants")) return "Дитячі шоколадні медіанти";
  if (p.category === "flowers") return "Шоколадний букет троянд";
  if (p.category === "tiles") return "Шоколадна плитка / бруски";
  return "Шоколадний набір цукерок";
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const id = productIdBySlug(slug, locale);
  const product = id ? catalogFor(locale).find((p) => p.id === id) : undefined;
  if (!product) return {};
  const ruSlug = (id && PRODUCT_SLUGS.ru[id]) ?? "";
  const typeName = getProductTypeUk(product);
  const title = `${typeName} ${product.name} — купити у Харкові від ${product.price} ₴ | CraftChoco`;
  return innerMeta(locale, {
    path: `/podarunky/${slug}`,
    altPath: `/ru/podarunky/${ruSlug}`,
    title,
    description: `Купити ${typeName.toLowerCase()} ${product.name} (${product.weight}) з бельгійського шоколаду Callebaut у Харкові від ${product.price} ₴. Свіжа партія ручної роботи, швидка доставка день у день: 096 253 56 10.`,
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
      canonicalPath={`/podarunky/${slug}`}
    />
  );
}
