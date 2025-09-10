/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: false,

  // 👇 add this
  images: {
    // Either use domains:
    domains: ["stage.digibima.com", "digibima.com", "cdn.digibima.com"],
    // Or (more precise) remotePatterns:
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stage.digibima.com",
        pathname: "/**",
      },
      // add more hosts if needed
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

export default nextConfig;
