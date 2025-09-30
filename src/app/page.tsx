import { Metadata } from "next";
import { getSEO } from "@/lib/seo";
import HomePage from "./HomePage";

// Landing page showcasing portfolio highlights, featuring projects, tech stack, and inspirational quotes
export const metadata: Metadata = getSEO({
  title: "Home",
  description: "Welcome to my portfolio showcasing software development projects, automation solutions, and innovative web technologies",
  type: "website",
  openGraph: {
    title: "Itsrama — Backend & Automation Engineer",
    description: "Welcome to my portfolio showcasing software development projects, automation solutions, and innovative web technologies",
    type: "website",
    images: [
      {
        url: "https://itsrama.kawasan.digital/images/hero.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Home Page"
      }
    ]
  }
});

export default function Page() {
  return <HomePage />;
}