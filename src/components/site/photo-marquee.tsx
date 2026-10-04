import Image from "next/image";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const photos = [
  { src: "/images/shokoladnye-cvety-ruchnoy-raboty-harkov-master-aleksandr-4-cvetka.webp", alt: "Шоколадные цветы ручной работы — мастер Александр с набором цветов ChocoCraft" },
  { src: "/images/shokoladnaya-roza-ruchnoy-raboty-vinno-zolotaya-makro.webp", alt: "Винно-золотая шоколадная роза ручной работы Callebaut макро" },
  { src: "/images/shokolad-ruchnoy-raboty-harkov-master-aleksandr-nabor-spasibo.webp", alt: "Мастер Александр с набором шоколадных конфет «Спасибо, что ты есть» ChocoCraft" },
  { src: "/images/shokoladnye-konfety-ruchnoy-raboty-kosmos-makro-chococraft.webp", alt: "Шоколадная конфета ручной работы «Космос» с сусальным золотом макро" },
  { src: "/images/shokolad-ruchnoy-raboty-harkov-master-aleksandr-nabor-16-konfet.webp", alt: "Шоколад ручной работы Харьков — мастер Александр с набором из 16 конфет ChocoCraft" },
  { src: "/images/shokolad-ruchnoy-raboty-harkov-master-aleksandr-nabor-6-konfet.webp", alt: "Шоколатье Александр с набором конфет ручной работы в чёрной коробке" },
  { src: "/images/shokoladnye-konfety-ruchnoy-raboty-makro-glyanec-callebaut.webp", alt: "Шоколадная конфета ручной работы с мраморным глянцем какао-маслом макро" },
  { src: "/images/shokolad-ruchnoy-raboty-harkov-master-aleksandr-rozy.webp", alt: "Шоколад ручной работы Харьков — мастер Александр с розами ChocoCraft" },
  { src: "/images/shokoladnye-sfery-ruchnoy-raboty-makro-glyanec.webp", alt: "Шоколадные сферы ручной работы макро глянец Callebaut — «Галактика желаний» ChocoCraft" },
  { src: "/images/shokolad-ruchnoy-raboty-harkov-master-aleksandr-sfery.webp", alt: "Шоколатье Александр с шоколадными сферами ручной работы ChocoCraft Харьков" },
  { src: "/images/shokoladnye-rozy-ruchnoy-raboty-nabor-5-roz.webp", alt: "Подарочный набор шоколадных роз ручной работы в коробке с лентой" },
  { src: "/images/set-combo.jpg", alt: "Комбинированный подарочный набор" },
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
