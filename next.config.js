/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Configure webpack to handle Tone.js
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  // Enable image optimization
  images: {
    domains: ["localhost"],
    unoptimized: true,
  },
  // Enable source maps in development
  productionBrowserSourceMaps: true,
  // Add proper handling for static files
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },

  // Configure for static export
  output: "export",
  // Disable telemetry
  telemetry: {
    disabled: true,
  },
  // Configure proper fetch handling
  experimental: {
    // Enable modern fetch behavior
    modern: true,
    // Optimize for better fetch handling
    optimizeCss: true,
    // Improve service worker compatibility
    swcMinify: true,
  },
};

module.exports = nextConfig;
