"use client";

import { useState } from "react";
import Image from "next/image";
import { Scissors } from "lucide-react";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

/** Фото товара с макро-разрезом начинки: hover на десктопе, тап на мобильных */
export function ImageSwap({
  image,
  cutImage,
  alt,
  cutAlt,
  locale,
  priority = false,
}: {
  image: string;
  cutImage?: string;
  alt: string;
  cutAlt?: string;
  locale: Locale;
  priority?: boolean;
}) {
  const t = getDict(locale);
  const [showCut, setShowCut] = useState(false);
  const hasCut = !!cutImage;

  return (
    <div
      className="group relative aspect-square overflow-hidden rounded-[2rem] ring-1 ring-gold-400/30 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.55)]"
      onMouseEnter={() => hasCut && setShowCut(true)}
      onMouseLeave={() => setShowCut(false)}
    >
      <Image
        src={image}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className={`object-cover transition-opacity duration-500 ${showCut ? "opacity-0" : "opacity-100"}`}
      />
      {hasCut && (
        <Image
          src={cutImage}
          alt={cutAlt ?? t.catalog.cutAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-cover transition-opacity duration-500 ${showCut ? "opacity-100" : "opacity-0"}`}
        />
      )}
      {hasCut && (
        <button
          type="button"
          onClick={() => setShowCut((v) => !v)}
          aria-pressed={showCut}
          className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-choco-950/75 px-4 py-2 text-xs font-semibold text-gold-300 backdrop-blur transition-colors hover:bg-choco-950/90 lg:pointer-events-none lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100"
        >
          <Scissors className="h-3.5 w-3.5" aria-hidden="true" />
          {showCut ? (locale === "uk" ? "Показати набір" : "Показать набор") : t.catalog.cutHover}
        </button>
      )}
    </div>
  );
}
