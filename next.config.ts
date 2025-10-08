import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.millionluxury.com",
      },
    ],
  },
};

export default nextConfig;
