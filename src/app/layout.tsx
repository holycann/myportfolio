import "./globals.css";
import { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Centralized Configurations
import {
  structuredPersonData,
  performanceConfig,
  getSEO,
  getViewport,
} from "@/lib/seo";
import { Providers } from "@/components/ThemeProvider";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { Loading } from "@/components/ui/loading";

// Font Optimization
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
});

// Dynamic Imports with Prefetching
const Navbar = dynamic(() => import("@/components/Nav"), {
  ssr: true,
  loading: () => (
    <Loading variant="default" size="lg" label="Loading Navigation..." />
  ),
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true,
  loading: () => (
    <div className="h-40 flex items-center justify-center">
      <Loading variant="default" size="lg" label="Loading Footer..." />
    </div>
  ),
});

// Metadata Generation
export const metadata: Metadata = getSEO();

// Viewport Configuration
export const viewport = getViewport();

// Performance Monitoring Setup
const setupPrefetching = () => {
  if (typeof window !== "undefined") {
    const routes: string[] = performanceConfig.prefetchRoutes;

    // Performance logging
    console.log("Prefetching routes:", routes);

    routes.forEach((route: string) => {
      // Prefetch critical routes
      if (window.location.pathname !== route) {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = route;
        document.head.appendChild(link);
      }
    });

    // Basic performance tracking
    const performanceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === "first-contentful-paint") {
          console.log(`First Contentful Paint: ${entry.startTime} ms`);
        }
      }
    });

    performanceObserver.observe({ type: "paint", buffered: true });
  }
};

// Call prefetching setup
setupPrefetching();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.className} dark overflow-x-hidden`}
    >
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredPersonData),
          }}
        />
      </head>
      <body>
        <SpeedInsights />
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <ScrollToTop />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#333",
                color: "#fff",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
