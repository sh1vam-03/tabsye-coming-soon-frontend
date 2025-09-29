import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
    },
  },
};

export default nextConfig;
