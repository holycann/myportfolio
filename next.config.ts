import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

// Enable bundle analyzer when ANALYZE is true
const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
            },
          },
        ],
        as: "*.js",
      },
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24, // Cache images for 24 hours
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: [
      "@/components",
      "@/data",
      "motion/react",
      "react-icons",
      "@svgr/webpack",
    ],
    optimisticClientCache: true,
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  // Support Web Workers
  webpack: (config) => {
    // Support Web Workers
    config.module.rules.push({
      test: /\.worker\.ts$/,
      use: { loader: "worker-loader" },
    });

    // Fix for "Can't resolve 'fs'" error
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
  // Add content security policy
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Allow web workers
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
              "connect-src 'self' https://api.emailjs.com ws://localhost:* ws://127.0.0.1:* http://localhost:*;",
              "worker-src 'self' blob:;",
              "style-src 'self' 'unsafe-inline';",
              "img-src 'self' data: blob:;",
              "font-src 'self' data:;",
            ].join(" "),
          },
        ],
      },
    ];
  },
};

// Export with analyzer wrapper
export default withAnalyzer(nextConfig);
