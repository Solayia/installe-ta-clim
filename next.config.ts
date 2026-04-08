import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/installe-ta-clim",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
