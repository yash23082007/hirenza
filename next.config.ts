import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/preparation/system-design-sheet',
        destination: '/preparation/system-design',
        permanent: true,
      },
      {
        source: '/preparation/dsa-sheets',
        has: [{ type: 'query', key: 'sheet', value: '(?<sheet>.*)' }],
        destination: '/preparation/dsa-sheets/:sheet',
        permanent: false,
      },
      {
        source: '/preparation/company-wise-dsa',
        has: [{ type: 'query', key: 'company', value: '(?<company>.*)' }],
        destination: '/preparation/company-wise-dsa/:company',
        permanent: false,
      },
      {
        source: '/preparation/20-patterns',
        has: [{ type: 'query', key: 'pattern', value: '(?<pattern>.*)' }],
        destination: '/preparation/20-patterns/:pattern',
        permanent: false,
      },
      {
        source: '/preparation/most-asked-questions',
        has: [{ type: 'query', key: 'tech', value: '(?<tech>.*)' }],
        destination: '/preparation/most-asked-questions/:tech',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

