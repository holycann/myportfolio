import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Nav";
import { getSEO, generateJsonLd, defaultMeta } from "@/lib/seo";
import { Providers, ThemeProvider } from "../providers/ThemeProvider";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { LenisProvider } from "@/providers/LenisProvider";
import { LoadingProvider } from "@/providers/LoadingProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = getSEO({
  title: defaultMeta.title,
  description: defaultMeta.description,
  keywords: defaultMeta.keywords,
  url: defaultMeta.url,
  themeColor: "#000000",
});

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhamad Ramadhan",
  url: defaultMeta.url,
  image: defaultMeta.image,
  sameAs: ["https://twitter.com/ehhramaa_", "https://instagram.com/ehhramaa_"],
  jobTitle: "Full Stack Developer & Automation Engineer",
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="author" content={defaultMeta.author} />
        <meta name="keywords" content={defaultMeta.keywords.join(", ")} />
        <meta name="description" content={defaultMeta.description} />

        {/* Canonical link */}
        <link rel="canonical" href={defaultMeta.url} />

        {/* Favicon */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="icon" href="/favicon.png" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        <link rel="manifest" href="/site.webmanifest" />

        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={defaultMeta.title} />
        <meta property="og:description" content={defaultMeta.description} />
        <meta property="og:image" content={defaultMeta.image} />
        <meta property="og:url" content={defaultMeta.url} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={defaultMeta.twitterHandle} />
        <meta name="twitter:title" content={defaultMeta.title} />
        <meta name="twitter:description" content={defaultMeta.description} />
        <meta name="twitter:image" content={defaultMeta.image} />

        {/* Structured Data */}
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
                {children}
                <ScrollToTop />
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 3000,
                    style: {
                      background: "#333",
                      color: "#fff",
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
