import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter } from "react-icons/fa6";

// Configuration for social links
const SOCIAL_LINKS = [
  {
    href: "https://github.com/holyycan",
    icon: FaGithub,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/muhamad-ramadhan-bb6289237/",
    icon: FaLinkedin,
    label: "LinkedIn",
  },
  {
    href: "https://x.com/ehhramaa_",
    icon: FaTwitter,
    label: "Twitter",
  },
  {
    href: "mailto:muhamad.ramadhan.dev@gmail.com",
    icon: FaEnvelope,
    label: "Email",
  },
];

const NAVIGATION_LINKS = {
  General: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/project", label: "Project" },
    { href: "/contact", label: "Contact" },
  ],
  Extras: [
    { href: "/about#tech-stack", label: "Tech Stack" },
    { href: "/about#experience", label: "Experience" },
  ],
};

/**
 * Social Links Rendering Component
 */
const SocialLinks = React.memo(() => (
  <div className="flex items-center justify-center space-x-6 text-3xl">
    {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="hover:text-[var(--color-accent)] hover:scale-110 transition-all duration-300 transform"
      >
        <Icon />
      </a>
    ))}
  </div>
));

/**
 * Navigation Links Rendering Component
 */
const NavigationLinks = React.memo(() => (
  <div className="grid grid-cols-2 gap-6 text-[var(--color-text-primary)] dark:text-[var(--color-text-secondary)]">
    {Object.entries(NAVIGATION_LINKS).map(([section, links]) => (
      <div
        key={section}
        className="space-y-4 flex flex-col justify-start items-center text-center"
      >
        <h4 className="font-semibold text-lg border-b border-[var(--color-accent)] pb-2">
          {section}
        </h4>
        <ul className="space-y-2">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="opacity-80 hover:opacity-100 hover:text-[var(--color-accent)] transition-all"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
));

/**
 * Footer Component
 * Renders site footer with social links, navigation, and copyright
 */
const Footer: React.FC = React.memo(() => {
  return (
    <footer className="pt-20 px-4 lg:px-0">
      <div className="w-full max-w-7xl mx-auto">
        <div className="relative">
          <div className="relative bg-[var(--color-bg-primary)]/40 backdrop-blur-xl rounded-3xl border border-[var(--color-border)]/20 p-8 shadow-2xl">
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:flex justify-center items-center gap-4 w-full">
                <div className="w-full flex justify-center items-center">
                  <Image
                    src="/images/logo.png"
                    alt="Muhamad Ramadhan Profile"
                    width={84}
                    height={84}
                    priority={false}
                  />
                </div>
                <p className="text-md lg:text-lg text-center lg:text-start font-medium opacity-90">
                  I'm Muhamad Ramadhan - a backend and automation engineer
                  passionate about automating manual tasks.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
                <div className="h-full bg-gradient-to-br from-[var(--color-primary-light)]/10 to-[var(--color-secondary-light)]/10 rounded-xl flex flex-col items-center justify-center p-6 space-y-4 text-center text-[var(--color-text-primary)] dark:text-[var(--color-text-secondary)] hover:scale-[1.02] transition-transform duration-300 shadow-md hover:shadow-lg">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Connect With Me
                    </h3>
                    <SocialLinks />
                  </div>
                  <p className="text-sm opacity-70">
                    Let's collaborate and build something amazing together!
                  </p>
                </div>
                <div className="h-full bg-[var(--color-text-secondary)]/10 rounded-xl p-6">
                  <NavigationLinks />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container w-full mx-auto lg:-mt-20 2xl:-mt-40">
        <div className="flex h-full items-center justify-center">
          <TextHoverEffect text="ITSRAMA" />
        </div>
      </div>
      <div className="bg-transparent backdrop-blur-sm relative">
        <div className="container mx-auto px-4 flex flex-col items-center space-y-4">
          <div className="text-center text-xs lg:text-sm text-gray-400 flex flex-col items-center space-y-2">
            <span className="text-red-500 animate-bounce">❤️</span>
            <p className="text-md opacity-75 pb-4">
              © 2025 Itsrama | Muhamad Ramadhan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
