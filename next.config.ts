import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

// Configurable constants for better maintainability
const BUNDLE_ANALYZE = process.env.ANALYZE === "true";
const IMAGE_CACHE_TTL = 60 * 60 * 24; // 24 hours cache
const SERVER_BODY_SIZE_LIMIT = "2mb";

// Recommended device sizes for responsive images
const RECOMMENDED_DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
const RECOMMENDED_IMAGE_SIZES = [16, 32, 48, 64, 96, 128, 256, 384];

// Enable bundle analyzer when ANALYZE is true
const withAnalyzer = withBundleAnalyzer({
  enabled: BUNDLE_ANALYZE,
});

const nextConfig: NextConfig = {
  // SVG handling configuration
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true, // Optimize SVGs as icons
            },
          },
        ],
        as: "*.js",
      },
    },
  },

  // Comprehensive image optimization
  images: {
    // Security: Allow SVG with caution
    dangerouslyAllowSVG: true,
    // Restrict remote image patterns more specifically if possible
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*", // TODO: Replace with specific hostnames
      },
    ],
    // Modern image formats for better compression
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: IMAGE_CACHE_TTL,
    deviceSizes: RECOMMENDED_DEVICE_SIZES,
    imageSizes: RECOMMENDED_IMAGE_SIZES,
  },

  // Performance and build optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,

  // Experimental performance features
  experimental: {
    // Optimize common package imports
    optimizePackageImports: [
      "@/components",
      "@/data",
      "motion/react",
      "react-icons",
      "@svgr/webpack",
    ],
    optimisticClientCache: true,
    // Limit server action body size for security
    serverActions: {
      bodySizeLimit: SERVER_BODY_SIZE_LIMIT,
    },
  },

  // Development origin allowlist
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],

  // Enhanced security headers
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // Prevent MIME type sniffing
          },
          {
            key: "X-Frame-Options",
            value: "DENY", // Prevent clickjacking
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block", // Enable XSS protection
          },
        ],
      },
    ];
  },
};

// Export configuration with bundle analyzer wrapper
export default withAnalyzer(nextConfig);
