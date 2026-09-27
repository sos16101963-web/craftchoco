import Image from "next/image";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const photos = [
  { src: "/images/set-sixteen.webp", alt: "Набор 16 конфет с фруктовыми ганашами" },
  { src: "/images/roses-marble.webp", alt: "Шоколадные розы с мраморным узором" },
  { src: "/images/art-bars.webp", alt: "Авторские плитки с рисунком" },
  { src: "/images/spheres-marble.jpg", alt: "Шоколадные сферы ручной работы" },
  { src: "/images/flowers-six.jpg", alt: "Шоколадный букет из шести цветов" },
  { src: "/images/bars-fruit.jpg", alt: "Бруски с фруктами в шоколаде" },
  { src: "/images/mini-tiles.jpg", alt: "Мини-плитки с узорами" },
  { src: "/images/envelope-gift.jpg", alt: "Шоколадный конверт-поздравление" },
  { src: "/images/set-combo.jpg", alt: "Комбинированный подарочный набор" },
  { src: "/images/micro-tiles.jpg", alt: "Микроплитки Callebaut" },
];

export function PhotoMarquee({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const doubled = [...photos, ...photos];
  return (
    <section aria-label="Живые фото нашей продукции" className="relative border-y border-gold-400/15 bg-choco-950 py-7">
      <p className="mb-5 text-center text-[13px] font-semibold uppercase tracking-[0.28em] text-gold-400/90">
        
      </p>
      <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex w-max gap-4 pr-4 group-hover:[animation-play-state:paused]">
          {doubled.map((p, i) => (
            <div
              key={`${p.src}-${i}`}
              aria-hidden={i >= photos.length}
              className="relative h-40 w-60 shrink-0 overflow-hidden rounded-2xl ring-1 ring-gold-400/20 sm:h-44 sm:w-72"
            >
              <Image
                src={p.src}
                alt={i >= photos.length ? "" : p.alt}
                fill
                sizes="288px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-choco-950/35 via-transparent to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
