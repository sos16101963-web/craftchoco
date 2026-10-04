"use client";

import { useState } from "react";
import Image from "next/image";
import { Scissors } from "lucide-react";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import type { ProductGalleryItem } from "@/lib/products";

/** Фото товара с интерактивной галереей ракурсов и макро-разрезом начинки */
export function ImageSwap({
  image,
  cutImage,
  alt,
  cutAlt,
  locale,
  priority = false,
  gallery = [],
}: {
  image: string;
  cutImage?: string;
  alt: string;
  cutAlt?: string;
  locale: Locale;
  priority?: boolean;
  gallery?: ProductGalleryItem[];
}) {
  const t = getDict(locale);
  const [activeImage, setActiveImage] = useState<string>(image);
  const [activeAlt, setActiveAlt] = useState<string>(alt);
  const [showCutHover, setShowCutHover] = useState(false);
  const hasCut = !!cutImage;

  const allThumbnails = [
    { src: image, alt, label: locale === "uk" ? "Головне" : "Главное" },
    ...(hasCut ? [{ src: cutImage!, alt: cutAlt ?? t.catalog.cutAlt, label: locale === "uk" ? "Розріз" : "Разрез" }] : []),
    ...gallery.map((g, idx) => ({
      src: g.src,
      alt: g.alt,
      label: locale === "uk" ? `Ракурс ${idx + 1}` : `Ракурс ${idx + 1}`,
    })),
  ];

  const isCutActive = activeImage === cutImage || (showCutHover && activeImage === image && hasCut);
  const displayedSrc = isCutActive && cutImage ? cutImage : activeImage;
  const displayedAlt = isCutActive ? (cutAlt ?? t.catalog.cutAlt) : activeAlt;

  return (
    <div className="flex flex-col gap-3.5">
      <div
        className="group relative aspect-square overflow-hidden rounded-[2rem] bg-choco-950/5 ring-1 ring-gold-400/30 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.55)]"
        onMouseEnter={() => hasCut && activeImage === image && setShowCutHover(true)}
        onMouseLeave={() => setShowCutHover(false)}
      >
        <Image
          key={displayedSrc}
          src={displayedSrc}
          alt={displayedAlt}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-all duration-300"
        />

        {hasCut && (
          <button
            type="button"
            onClick={() => {
              if (activeImage === cutImage) {
                setActiveImage(image);
                setActiveAlt(alt);
              } else {
                setActiveImage(cutImage);
                setActiveAlt(cutAlt ?? t.catalog.cutAlt);
              }
            }}
            aria-pressed={activeImage === cutImage}
            className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-choco-950/80 px-4 py-2 text-xs font-semibold text-gold-300 backdrop-blur transition-all hover:bg-choco-950 hover:text-gold-200 shadow-md"
          >
            <Scissors className="h-3.5 w-3.5" aria-hidden="true" />
            {activeImage === cutImage
              ? locale === "uk"
                ? "Показати набір"
                : "Показать набор"
              : t.catalog.cutHover}
          </button>
        )}
      </div>

      {/* Интерактивные миниатюры ракурсов */}
      {allThumbnails.length > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-0.5 scrollbar-thin">
          {allThumbnails.map((thumb) => {
            const isSelected = activeImage === thumb.src;
            return (
              <button
                key={thumb.src}
                type="button"
                onClick={() => {
                  setActiveImage(thumb.src);
                  setActiveAlt(thumb.alt);
                  setShowCutHover(false);
                }}
                className={`group relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                  isSelected
                    ? "border-gold-500 shadow-md ring-2 ring-gold-400/50 scale-105"
                    : "border-gold-200/40 opacity-70 hover:opacity-100 hover:border-gold-400/70"
                }`}
                title={thumb.alt}
              >
                <Image
                  src={thumb.src}
                  alt={thumb.alt}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
