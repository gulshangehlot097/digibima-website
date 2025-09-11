// next.config.mjs
import bundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: false,

  images: {
    domains: ["stage.digibima.com", "digibima.com", "cdn.digibima.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stage.digibima.com",
        pathname: "/**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://stage.digibima.com/api/:path*",
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
