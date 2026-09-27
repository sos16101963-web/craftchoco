import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbLd } from "@/lib/inner-meta";
import type { Locale } from "@/lib/i18n";

export interface Crumb {
  name: string;
  path: string;
}

/** Хлебные крошки + микроразметка BreadcrumbList */
export function Breadcrumbs({ items, locale }: { items: Crumb[]; locale: Locale }) {
  const home = locale === "uk" ? "/" : "/ru";
  const all: Crumb[] = [{ name: locale === "uk" ? "Головна" : "Главная", path: home }, ...items];
  return (
    <nav aria-label={locale === "uk" ? "Хлібні крихти" : "Хлебные крошки"} className="py-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(all)).replace(/</g, "\\u003c") }} />
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-choco-500">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-choco-300" aria-hidden="true" />}
              {last ? (
                <span aria-current="page" className="max-w-[60vw] truncate font-medium text-choco-700">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="transition-colors hover:text-gold-700">
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
