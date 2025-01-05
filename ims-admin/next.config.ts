import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  basePath: '/IMS-Admin',
  images: {
    unoptimized: true
  }
};

export default nextConfig;