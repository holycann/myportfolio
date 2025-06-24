import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["assets.aceternity.com", "placehold.co"],
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 60, // Cache images for 1 minute
    },
    compress: true,
    poweredByHeader: false,
    reactStrictMode: true,
    productionBrowserSourceMaps: false,
    experimental: {
        optimizePackageImports: ['@/components', '@/data'],
        optimisticClientCache: true,
    }
};

export default nextConfig;
