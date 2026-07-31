import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      { pathname: "/images/**" },
      { pathname: "/leadership/**" },
      { pathname: "/hospital-logo.*" },
    ],
  },
};

export default nextConfig;
