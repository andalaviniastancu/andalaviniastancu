import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    imageSizes: [128, 256, 384],
    deviceSizes: [640, 1200, 2048],
  },
};

export default nextConfig;
