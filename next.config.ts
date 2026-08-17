import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "etnomon.cimec.ro"
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org"
      }
    ]
  }
};

export default nextConfig;
