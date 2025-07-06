import type { Metadata } from "next";

// Default metadata for the site
export const defaultMeta = {
  title: "My Portfolio",
  description: "Personal portfolio website showcasing my work and skills",
  keywords: ["portfolio", "developer", "web", "frontend", "backend"],
  url: process.env.NEXT_PUBLIC_URL || "https://myportfolio.com",
  image: "/images/og-image.jpg",
  twitterHandle: "@username",
  author: "Your Name",
};

// Define OpenGraph type locally
type OpenGraphType = "website" | "article" | "profile";

// Interface for SEO parameters
interface SeoParams {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: OpenGraphType; // Restricted to valid OG types
  author?: string;
  themeColor?: string;
}

/**
 * Generate metadata for Next.js pages
 */
export function getSEO({
  title = defaultMeta.title,
  description = defaultMeta.description,
  keywords = defaultMeta.keywords,
  image = defaultMeta.image,
  url = defaultMeta.url,
  type = "website" as OpenGraphType,
  author = defaultMeta.author,
  themeColor = "#000000",
}: SeoParams = {}): Metadata {
  // Construct full title
  const fullTitle = title === defaultMeta.title ? title : `${title} | ${defaultMeta.title}`;
  
  // Ensure absolute URL for image
  const absoluteImageUrl = image.startsWith("http") ? image : `${url}${image}`;

  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: author }],
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
    },
    robots: "index, follow",
    themeColor,
    openGraph: {
      type,
      locale: "en_US",
      url,
      title: fullTitle,
      description,
      siteName: defaultMeta.title,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: defaultMeta.twitterHandle,
      creator: defaultMeta.twitterHandle,
      title: fullTitle,
      description,
      images: [absoluteImageUrl],
    },
  };
}

/**
 * Generate SEO meta tags for older Next.js versions or custom head elements
 */
export function generateSeoMeta({ 
  title = defaultMeta.title,
  description = defaultMeta.description,
  image = defaultMeta.image,
  url = defaultMeta.url,
}: SeoParams = {}) {
  const fullTitle = title === defaultMeta.title ? title : `${title} | ${defaultMeta.title}`;
  const absoluteImageUrl = image.startsWith("http") ? image : `${url}${image}`;
  
  return {
    title: fullTitle,
    meta: [
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:image", content: absoluteImageUrl },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: absoluteImageUrl },
    ],
  };
}

/**
 * Generate JSON-LD structured data
 */
export function generateJsonLd(data: any) {
  return {
    __html: JSON.stringify(data),
  };
} 