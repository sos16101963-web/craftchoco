import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import { productsUk } from "@/lib/products-uk";
import { PRODUCT_SLUGS } from "@/lib/slugs";

/**
 * Google Shopping & Merchant Center XML Product Feed (RSS 2.0).
 * Забезпечує автоматичний експорт усіх 14 авторських товарів майстерні
 * до безкоштовної програми Google Free Product Listings та товарної каруселі пошуку.
 */
export async function GET() {
  const itemsXml = productsUk
    .map((p) => {
      const slug = PRODUCT_SLUGS.uk[p.id];
      const link = `${site.url}/podarunky/${slug}`;
      const imageLink = `${site.url}${p.image}`;
      const additionalImage = p.cutImage
        ? `\n      <g:additional_image_link>${site.url}${p.cutImage}</g:additional_image_link>`
        : "";
      const cleanTitle = p.name.replace(/«|»/g, "").trim();
      const fullTitle = `${cleanTitle} — ${p.categoryLabel} CraftChoco`;

      return `    <item>
      <g:id>${p.id}</g:id>
      <g:title><![CDATA[${fullTitle}]]></g:title>
      <g:description><![CDATA[${p.short} 100% бельгійський шоколад Callebaut. Свіжа партія у Харкові, доставка в термобоксах по Україні.]]></g:description>
      <g:link>${link}</g:link>
      <g:image_link>${imageLink}</g:image_link>${additionalImage}
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:price>${p.price.toFixed(2)} UAH</g:price>
      <g:brand>Callebaut</g:brand>
      <g:google_product_category>Food, Beverages &amp; Tobacco &gt; Food Items &gt; Candy &amp; Chocolate</g:google_product_category>
      <g:product_type><![CDATA[Солодощі > Шоколад ручної роботи > ${p.categoryLabel}]]></g:product_type>
      <g:shipping>
        <g:country>UA</g:country>
        <g:service>Кур'єр по Харкову / Нова пошта</g:service>
        <g:price>${site.courierPrice.toFixed(2)} UAH</g:price>
      </g:shipping>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${site.name} — Шоколад ручної роботи</title>
    <link>${site.url}</link>
    <description>${site.slogan}</description>
${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
