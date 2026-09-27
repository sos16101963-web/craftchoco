import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * robots.txt за стандартами Google Search Central, RFC 9309 та стандартами пошукових систем 2026 року.
 * 
 * - Забезпечує повний доступ Googlebot та Googlebot-Image до рендерингу (JS, CSS, шрифти, зображення).
 * - Закриває внутрішні бекенд-ендпоінти (/api/) від нецільової витрати краулінгового бюджету.
 * - Явно дозволяє індексацію для Google-Extended (Google Gemini / AI Overviews)
 *   та провідних пошукових AI-асистентів (SearchGPT, Perplexity, Claude, Bingbot, Applebot).
 * - Вказує канонічний XML-індекс карти сайту (sitemap.xml).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}

