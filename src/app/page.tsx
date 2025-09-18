import { Metadata } from "next";
import { getSEO } from "@/lib/seo";
import HomePage from "./HomePage";

export const metadata: Metadata = getSEO({
  title: "Home",
  description:
    "Welcome to my portfolio showcasing software development projects",
});

export default function Page() {
  return <HomePage />;
}
