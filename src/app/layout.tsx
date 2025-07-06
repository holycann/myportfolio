import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { GlowingStarsBackground } from "../components/ui/glowing-stars";
import Navbar from "./components/Nav";
import { getSEO, generateJsonLd, defaultMeta } from "@/lib/seo";
import { Providers, ThemeProvider } from "./providers";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { LenisProvider } from "@/providers/LenisProvider";
import { LoadingProvider } from "@/providers/LoadingProvider";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = getSEO({
  title: "My Portfolio",
  description: "My personal portfolio website",
  keywords: ["portfolio", "developer", "web", "frontend", "backend"],
  url: process.env.NEXT_PUBLIC_URL || "https://myportfolio.com",
  themeColor: "#000000",
});

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhamad Ramadhan",
  url: defaultMeta.url,
  image: defaultMeta.image,
  sameAs: [
    "https://twitter.com/ehhramaa_",
    "https://instagram.com/ehhramaa_",
  ],
  jobTitle: "Fullstack Developer & Automation Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  description: defaultMeta.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="author" content="Muhamad Ramadhan" />
        <meta
          name="keywords"
          content="Fullstack Developer, Portfolio, Golang, Node.js, Crypto, Indonesia, Web Developer, Next.js, React, Tailwind"
        />
        {/* Canonical link */}
        <link rel="canonical" href={defaultMeta.url} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateJsonLd(structuredData)}
        />
      </Head>
      <body className={`${inter.className} dark`}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <LenisProvider>
              <LoadingProvider>
                <Navbar />
                <GlowingStarsBackground />
                {children}
                <ScrollToTop />
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 3000,
                    style: {
                      background: '#333',
                      color: '#fff',
                    },
                  }}
                />
              </LoadingProvider>
            </LenisProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
