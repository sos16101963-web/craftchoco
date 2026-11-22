import type { NextConfig } from "next";
import { PRODUCT_SLUGS } from "./src/lib/slugs";
import { BLOG_SLUG_PAIRS, INNER_PAGES } from "./src/lib/pages";

const hybridLocaleRedirects = [
  ...Object.keys(PRODUCT_SLUGS.uk).flatMap((id) => {
    const ukSlug = PRODUCT_SLUGS.uk[id];
    const ruSlug = PRODUCT_SLUGS.ru[id];
    if (!ukSlug || !ruSlug || ukSlug === ruSlug) return [];
    return [
      { source: `/ru/podarunky/${ukSlug}`, destination: `/ru/podarunky/${ruSlug}`, permanent: true },
      { source: `/podarunky/${ruSlug}`, destination: `/podarunky/${ukSlug}`, permanent: true },
    ];
  }),
  ...BLOG_SLUG_PAIRS.flatMap((pair) => {
    if (pair.uk === pair.ru) return [];
    return [
      { source: `/ru/blog/${pair.uk}`, destination: `/ru/blog/${pair.ru}`, permanent: true },
      { source: `/blog/${pair.ru}`, destination: `/blog/${pair.uk}`, permanent: true },
    ];
  }),
  ...Object.values(INNER_PAGES).flatMap((pair) => {
    const hybridRu = `/ru${pair.uk}`;
    const hybridUk = pair.ru.startsWith("/ru") ? pair.ru.slice(3) : pair.ru;
    const redirects = [];
    if (hybridRu !== pair.ru) {
      redirects.push({ source: hybridRu, destination: pair.ru, permanent: true });
    }
    if (hybridUk && hybridUk !== pair.uk) {
      redirects.push({ source: hybridUk, destination: pair.uk, permanent: true });
    }
    return redirects;
  }),
];

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
  },
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      ...hybridLocaleRedirects,
      {
        source: "/podarunky/shepit-na-vuho",
        destination: "/podarunky/chotyry-nastroi",
        permanent: true,
      },
      {
        source: "/podarunky/sviato-bez-pryvodu",
        destination: "/podarunky/sviato-bez-povodu",
        permanent: true,
      },
      {
        source: "/ru/podarunky/shepot-na-uho",
        destination: "/ru/podarunky/chetyre-nastroeniya",
        permanent: true,
      },
      {
        source: "/images/shokolad-ruchnoy-raboty-harkov-master-aleksandr-nabor-6-konfet.webp-21",
        destination: "/images/shokolad-ruchnoy-raboty-harkov-master-aleksandr-nabor-6-konfet.webp",
        permanent: true,
      },
      {
        source: "/images/shokoladnye-plitki-ruchnoy-raboty-harkov-master-aleksandr-art-bars.webp-14",
        destination: "/images/shokoladnye-plitki-ruchnoy-raboty-harkov-master-aleksandr-art-bars.webp",
        permanent: true,
      },
      {
        source: "/images/shokoladnaya-plitka-ruchnoy-raboty-abstrakciya-makro-chococraft.webp-3",
        destination: "/images/shokoladnaya-plitka-ruchnoy-raboty-abstrakciya-makro-chococraft.webp",
        permanent: true,
      },
      {
        source: "/images/:slug*.webp-:num(\\d+)",
        destination: "/images/:slug*.webp",
        permanent: true,
      },
    ];
  },
  reactStrictMode: false,
};

export default nextConfig;
