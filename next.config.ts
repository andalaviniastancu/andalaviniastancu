import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    imageSizes: [384],
    deviceSizes: [640, 1200],
  },
};

export default nextConfig;
