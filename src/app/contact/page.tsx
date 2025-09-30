import { Metadata } from "next";
import { getSEO } from "@/lib/seo";
import ContactPage from "./ContactPage";

/**
 * Server-side Contact page component
 * Handles SEO metadata and server-side rendering strategy
 */
export const metadata: Metadata = getSEO({
  title: "Contact",
  description:
    "Get in touch with Muhamad Ramadhan - Software Developer. Reach out for collaboration, job opportunities, or just to say hello.",
  keywords: [
    "contact",
    "software developer",
    "web development",
    "collaboration",
    "hire",
  ],
  openGraph: {
    title: "Contact | Itsrama — Backend & Automation Engineer",
    description:
      "Get in touch with Muhamad Ramadhan - Software Developer. Reach out for collaboration, job opportunities, or just to say hello.",
    type: "website",
  },
});

/**
 * Contact page rendering strategy
 * Uses client-side ContactPage component for dynamic content
 */
export default function Page() {
  return <ContactPage />;
}
