import type { Metadata, Viewport } from "next";

/**
 * Centralized SEO Configuration for Muhamad Ramadhan's Portfolio
 * @module seo
 * @description Provides comprehensive SEO and metadata management
 */

// Default metadata for the site
export const defaultMeta = {
  title: "Itsrama — Backend & Automation Engineer",
  description:
    "Explore the personal portfolio of Itsrama, a Backend & Automation Engineer specializing in backend systems, and automation tools.",
  keywords: [
    "Itsrama",
    "backend developer portfolio",
    "backend developer",
    "web developer",
    "automation engineer",
    "Golang developer",
    "Node.js developer",
    "React developer",
    "Next.js portfolio",
  ],
  url: "https://itsrama.kawasan.digital",
  image: "https://itsrama.kawasan.digital/images/hero.png",
  twitterHandle: "@ehhramaa_",
  author: "Itsrama",
};

// Define OpenGraph type
type OpenGraphType = "website" | "article" | "profile";

// Interface for SEO parameters
interface SeoParams {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: OpenGraphType;
  author?: string;
  openGraph?: Metadata['openGraph'];
}

/**
 * Performance Monitoring Configuration
 * @description Centralized performance settings for the application
 */
export const performanceConfig = {
  maxRenderTime: 500, // ms
  criticalResourceThreshold: 3,
  prefetchRoutes: ["/", "/projects", "/about", "/contact"],
};

/**
 * Structured Person Data for JSON-LD
 * @description Provides structured data about the portfolio owner
 */
export const structuredPersonData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhamad Ramadhan",
  url: defaultMeta.url,
  image: defaultMeta.image,
  sameAs: [
    "https://twitter.com/ehhramaa_",
    "https://instagram.com/ehhramaa_",
    "https://linkedin.com/in/muhamadramadhan",
  ],
  jobTitle: "Backend & Automation Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  description: defaultMeta.description,
  skills: [
    "Backend Development",
    "Golang",
    "Node.js",
    "Automation",
    "React",
    "Next.js",
    "TypeScript",
    "Backend Development",
    "Golang",
    "Node.js",
    "Automation",
    "Web Development",
    "Cloud Computing",
  ],
};

/**
 * Generate metadata for Next.js pages
 * @param params SEO configuration parameters
 * @returns Comprehensive Metadata object
 */
export function getSEO({
  title = defaultMeta.title,
  description = defaultMeta.description,
  keywords = defaultMeta.keywords,
  image = defaultMeta.image,
  url = defaultMeta.url,
  type = "website" as OpenGraphType,
  author = defaultMeta.author,
  openGraph,
}: SeoParams = {}): Metadata {
  // Construct full title
  const fullTitle =
    title === defaultMeta.title ? title : `${title} | ${defaultMeta.title}`;

  // Ensure absolute URL for image
  const absoluteImageUrl = image.startsWith("http") ? image : `${url}${image}`;

  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: author }],
    robots: "index, follow",
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
      ...openGraph, // Allow custom OpenGraph configuration
    },
    twitter: {
      card: "summary_large_image",
      site: defaultMeta.twitterHandle,
      creator: defaultMeta.twitterHandle,
      title: fullTitle,
      description,
      images: [absoluteImageUrl],
    },
    metadataBase: new URL(url),
  };
}

/**
 * Generate viewport configuration
 * @returns Viewport configuration for responsive design
 */
export function getViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: "#4A3F3A",
  };
}

/**
 * Generate SEO meta tags for older Next.js versions or custom head elements
 * @param params SEO configuration parameters
 * @returns Object with title and meta tags
 */
export function generateSeoMeta({
  title = defaultMeta.title,
  description = defaultMeta.description,
  image = defaultMeta.image,
  url = defaultMeta.url,
}: SeoParams = {}) {
  const fullTitle =
    title === defaultMeta.title ? title : `${title} | ${defaultMeta.title}`;
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
 * @param data Structured data object
 * @returns JSON-LD representation
 */
export function generateJsonLd(data: any) {
  return {
    __html: JSON.stringify(data),
  };
}
