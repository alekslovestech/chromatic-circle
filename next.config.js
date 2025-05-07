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
  // Configure CSS modules
  cssModules: true,
  // Enable image optimization
  images: {
    domains: ["localhost"],
  },
  // Enable source maps in development
  productionBrowserSourceMaps: true,
  // Configure experimental features
  experimental: {
    // Enable server components
    serverComponents: true,
    // Enable concurrent features
    concurrentFeatures: true,
  },
};

module.exports = nextConfig;
