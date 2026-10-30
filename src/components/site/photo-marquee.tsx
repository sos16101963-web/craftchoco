import Image from "next/image";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const photosUk = [
  { src: "/images/shokoladnye-cvety-ruchnoy-raboty-harkov-master-aleksandr-buket-6-roz.webp", alt: "Святковий букет із 6 шоколадних троянд у подарунковій коробці" },
  { src: "/images/shokoladnyy-podsolnuh-i-rozy-ruchnoy-raboty-makro.webp", alt: "Шоколадний соняшник та троянди Callebaut ручної роботи крупним планом" },
  { src: "/images/shokoladnye-plitki-ruchnoy-raboty-harkov-master-aleksandr-art-bars.webp", alt: "Колекція з чотирьох крафтових шоколадних плиток з горіхами" },
  { src: "/images/shokoladnaya-plitka-ruchnoy-raboty-abstrakciya-makro-chococraft.webp", alt: "Авторська шоколадна плитка з абстрактним мармуровим розписом какао-маслом" },
  { src: "/images/shokoladnye-cvety-ruchnoy-raboty-harkov-master-aleksandr-4-cvetka.webp", alt: "Подарунковий набір з 4 шоколадних квітів різних відтінків" },
  { src: "/images/shokoladnaya-roza-ruchnoy-raboty-vinno-zolotaya-makro.webp", alt: "Винно-золота шоколадна троянда з тонким промальовуванням пелюсток" },
  { src: "/images/shokolad-ruchnoy-raboty-harkov-master-aleksandr-nabor-spasibo.webp", alt: "Крафтовий подарунковий набір цукерок-конверт «Дякую, що ти є»" },
  { src: "/images/shokoladnye-konfety-ruchnoy-raboty-kosmos-makro-chococraft.webp", alt: "Глянцева цукерка ручного розпису з космічним візерунком та фруктовим ганашем" },
  { src: "/images/shokolad-ruchnoy-raboty-harkov-master-aleksandr-nabor-16-konfet.webp", alt: "Велика червона подарункова коробка на 16 авторських цукерок" },
  { src: "/images/shokolad-ruchnoy-raboty-harkov-master-aleksandr-nabor-6-konfet.webp", alt: "Витончена чорна коробка із 6 цукерками з мармуровим розписом" },
  { src: "/images/shokolad-ruchnoy-raboty-harkov-master-aleksandr-rozy.webp", alt: "Букет розкішних шоколадних троянд з бельгійського білого та молочного шоколаду" },
  { src: "/images/shokoladnye-sfery-ruchnoy-raboty-makro-glyanec.webp", alt: "Дзеркальні шоколадні сфери з золотим напиленням" },
];

const photosRu = [
  { src: "/images/shokoladnye-cvety-ruchnoy-raboty-harkov-master-aleksandr-buket-6-roz.webp", alt: "Праздничный букет из 6 шоколадных роз в подарочной коробке" },
  { src: "/images/shokoladnyy-podsolnuh-i-rozy-ruchnoy-raboty-makro.webp", alt: "Шоколадный подсолнух и розы Callebaut ручной работы крупным планом" },
  { src: "/images/shokoladnye-plitki-ruchnoy-raboty-harkov-master-aleksandr-art-bars.webp", alt: "Коллекция из четырёх крафтовых шоколадных плиток с орехами" },
  { src: "/images/shokoladnaya-plitka-ruchnoy-raboty-abstrakciya-makro-chococraft.webp", alt: "Авторская шоколадная плитка с абстрактной мраморной росписью какао-маслом" },
  { src: "/images/shokoladnye-cvety-ruchnoy-raboty-harkov-master-aleksandr-4-cvetka.webp", alt: "Подарочный набор из 4 шоколадных цветов разных оттенков" },
  { src: "/images/shokoladnaya-roza-ruchnoy-raboty-vinno-zolotaya-makro.webp", alt: "Винно-золотая шоколадная роза с тонкой прорисовкой лепестков" },
  { src: "/images/shokolad-ruchnoy-raboty-harkov-master-aleksandr-nabor-spasibo.webp", alt: "Крафтовый подарочный набор конфет-конверт «Спасибо, что ты есть»" },
  { src: "/images/shokoladnye-konfety-ruchnoy-raboty-kosmos-makro-chococraft.webp", alt: "Глянцевая конфета ручной росписи с космическим узором и фруктовым ганашем" },
  { src: "/images/shokolad-ruchnoy-raboty-harkov-master-aleksandr-nabor-16-konfet.webp", alt: "Большая красная подарочная коробка на 16 авторских конфет" },
  { src: "/images/shokolad-ruchnoy-raboty-harkov-master-aleksandr-nabor-6-konfet.webp", alt: "Изящная чёрная коробка с 6 конфетами с мраморной росписью" },
  { src: "/images/shokolad-ruchnoy-raboty-harkov-master-aleksandr-rozy.webp", alt: "Букет роскошных шоколадных роз из бельгийского белого и молочного шоколада" },
  { src: "/images/shokoladnye-sfery-ruchnoy-raboty-makro-glyanec.webp", alt: "Зеркальные шоколадные сферы с золотым напылением" },
];

export function PhotoMarquee({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const photos = locale === "uk" ? photosUk : photosRu;
  const doubled = [...photos, ...photos];
  return (
    <section aria-label={locale === "uk" ? "Живі фото нашої продукції" : "Живые фото нашей продукции"} className="relative border-y border-gold-400/15 bg-choco-950 py-7">
      <p className="mb-5 text-center text-[13px] font-semibold uppercase tracking-[0.28em] text-gold-400/90">
        {locale === "uk" ? "Живі фото майстерні: від процесу до готової коробки" : "Живые фото мастерской: от процесса до готовой коробки"}
      </p>
      <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex w-max gap-4 pr-4 group-hover:[animation-play-state:paused]">
          {doubled.map((p, i) => (
            <div
              key={`marquee-${locale}-${i}`}
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
