import type { NextConfig } from "next";

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
      {
        source: "/podarunky/shepit-na-vuho",
        destination: "/podarunky/chotyry-nastroi",
        permanent: true,
      },
      {
        source: "/ru/podarunky/shepot-na-uho",
        destination: "/ru/podarunky/chetyre-nastroeniya",
        permanent: true,
      },
    ];
  },
  reactStrictMode: false,
};

export default nextConfig;
