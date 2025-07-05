import { LenisProvider } from "@/providers/LenisProvider";
import { defaultMeta, generateJsonLd, generateSeoMeta } from "@/lib/seo";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { GlowingStarsBackground } from "../components/ui/glowing-stars";
import Navbar from "./components/Nav";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: defaultMeta.title,
  description: defaultMeta.description,
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: defaultMeta.title,
    description: defaultMeta.description,
    url: defaultMeta.url,
    images: [
      {
        url: defaultMeta.image,
        width: 1200,
        height: 630,
        alt: defaultMeta.title,
      },
    ],
    siteName: defaultMeta.siteName,
    type: "website",
    locale: defaultMeta.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultMeta.title,
    description: defaultMeta.description,
    site: defaultMeta.twitterHandle,
    creator: defaultMeta.twitterHandle,
    images: [defaultMeta.image],
  },
  robots: defaultMeta.robots,
  metadataBase: new URL(defaultMeta.url),
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhamad Ramadhan",
  url: defaultMeta.url,
  image: defaultMeta.image,
  sameAs: [
    "https://twitter.com/muhamadramadhan",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { meta } = generateSeoMeta({});
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="author" content="Muhamad Ramadhan" />
        <meta
          name="keywords"
          content="Fullstack Developer, Portfolio, Golang, Node.js, Crypto, Indonesia, Web Developer, Next.js, React, Tailwind"
        />
        {meta.map((m, i) => {
          if (m.name) return <meta key={i} name={m.name} content={m.content} />;
          if (m.property)
            return <meta key={i} property={m.property} content={m.content} />;
          return null;
        })}
        {/* Canonical link */}
        <link rel="canonical" href={defaultMeta.url} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateJsonLd(structuredData)}
        />
      </Head>
      <body className={`${inter.className} dark`}>
        <LenisProvider>
          <Navbar />
          <GlowingStarsBackground />
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#333",
                color: "#fff",
              },
            }}
          />
        </LenisProvider>
      </body>
    </html>
  );
}
