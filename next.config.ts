import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: '/preparation/system-design-sheet',
        destination: '/preparation/system-design',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

