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
        ],
      },
    ];
  },

  // Ensure proper static file serving
  output: "standalone",
  // Disable telemetry
  telemetry: {
    disabled: true,
  },
};

module.exports = nextConfig;
