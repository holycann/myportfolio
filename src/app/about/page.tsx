"use client";
import ShinyText from "@/components/ui/shiny-text";
import {
  AboutImages,
  AnimatedImageAbout,
} from "./components/animated-about-image";
import dynamic from "next/dynamic";
import { Loading } from "@/components/ui/loading";
import HeroAbout from "./components/HeroAbout";

const images: AboutImages[] = [
  {
    url: "/images/me/about-5.jpg",
    alt: "",
  },
  {
    url: "/images/me/about-4.png",
    alt: "",
  },
  {
    url: "/images/me/about-1.jpg",
    alt: "",
  },
];

const TechStack = dynamic(() => import("./components/TechStackSection"), {
  loading: () => <Loading variant="solid" size="lg" label="Loading..." />,
  ssr: true,
});

const Experience = dynamic(() => import("./components/ExperienceSection"), {
  loading: () => <Loading variant="solid" size="lg" label="Loading..." />,
  ssr: false, // Complex animations, load client-side only
});

export default function About() {
  return (
    <>
      <HeroAbout images={images} />
      <TechStack />
      <Experience />
    </>
  );
}
