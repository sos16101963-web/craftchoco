"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import type { Locale } from "@/lib/i18n";

export function LiteYouTubeShort({
  videoId,
  title,
  views,
  locale,
}: {
  videoId: string;
  title: string;
  views?: string;
  locale: Locale;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-gold-500/30 bg-choco-950 shadow-xl">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      aria-label={`${locale === "uk" ? "Відтворити відео" : "Воспроизвести видео"}: ${title}`}
      className="group relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-gold-500/30 bg-choco-950 text-left shadow-lg transition-all hover:border-gold-400/60 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-choco-950/90 via-choco-950/20 to-choco-950/40"
        aria-hidden="true"
      />
      {views && (
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-choco-950/80 px-2.5 py-1 text-[11px] font-semibold text-gold-300 backdrop-blur-sm">
          ▶ {views}
        </span>
      )}
      <span
        className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600/95 text-white shadow-xl transition-transform duration-300 group-hover:scale-110 group-hover:bg-red-500"
        aria-hidden="true"
      >
        <Play className="ml-0.5 h-6 w-6 fill-current" />
      </span>
      <span className="absolute inset-x-3 bottom-3 line-clamp-2 text-xs font-semibold leading-snug text-cream drop-shadow">
        {title}
      </span>
    </button>
  );
}
