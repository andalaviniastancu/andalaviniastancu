import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    imageSizes: [256, 384],
    deviceSizes: [640, 828, 1200, 1920],
  },
};

export default nextConfig;
