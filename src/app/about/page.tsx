import { Metadata } from "next";
import { getSEO } from "@/lib/seo";
import AboutPage from "./AboutPage";

/**
 * Metadata for About Page
 * Provides comprehensive SEO configuration
 */
export const metadata: Metadata = getSEO({
  title: "About Me",
  description: "Explore the journey, skills, and passion of a backend developer and automation engineer",
  keywords: [
    "Backend Developer", 
    "Automation Engineer", 
    "Software Portfolio", 
    "Professional Journey"
  ],
  openGraph: {
    title: "About Me | Itsrama — Backend & Automation Engineer",
    description: "Explore the journey, skills, and passion of a backend developer and automation engineer",
    type: "profile"
  }
});

/**
 * Server-side page component for About section
 * Renders the AboutPage client-side component
 * 
 * @returns {React.ReactElement} About page with server-side metadata
 */
export default function Page() {
  return <AboutPage />;
}
