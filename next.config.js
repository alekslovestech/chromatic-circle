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
};

module.exports = nextConfig;
