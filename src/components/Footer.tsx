import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import Image from "next/image";
import React from "react";
import { FaGithub, FaLinkedin, FaMailchimp, FaTwitter, FaX } from "react-icons/fa6";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="pt-20">
      <div className="w-full max-w-7xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-light)]/30 to-[var(--color-secondary-light)]/30 blur-2xl rounded-3xl -z-10"></div>
          <div className="relative bg-[var(--color-bg-primary)]/40 backdrop-blur-xl rounded-3xl border border-[var(--color-border)]/20 p-8 shadow-2xl">
            <div className="space-y-4">
              <div className="h-4 bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-secondary-light)] rounded-full w-3/4"></div>
              <div className="h-4 bg-[var(--color-text-secondary)]/20 rounded-full w-1/2"></div>
              <div className="h-4 bg-[var(--color-text-secondary)]/20 rounded-full w-2/3"></div>
              <div className="flex justify-center items-center gap-4 w-1/2">
                <Image
                  src="/images/logo.png"
                  alt="Muhamad Ramadhan Profile"
                  width={84}
                  height={84}
                  priority
                />
                <p className="text-lg font-medium opacity-90">
                  I'm Muhamad Ramadhan - a backend and automation engineer
                  passionate about automating manual tasks.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="h-full bg-gradient-to-br from-[var(--color-primary-light)]/10 to-[var(--color-secondary-light)]/10 rounded-xl flex flex-col items-center justify-center p-6 space-y-4 text-center text-[var(--color-text-primary)] dark:text-[var(--color-text-secondary)] hover:scale-[1.02] transition-transform duration-300 shadow-md hover:shadow-lg">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Connect With Me
                    </h3>
                    <div className="flex items-center justify-center space-x-6 text-3xl">
                      <a
                        href="https://github.com/holyycan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--color-accent)] hover:scale-110 transition-all duration-300 transform"
                      >
                        <FaGithub />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/muhamad-ramadhan-bb6289237/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--color-accent)] hover:scale-110 transition-all duration-300 transform"
                      >
                        <FaLinkedin />
                      </a>
                      <a
                        href="https://x.com/ehhramaa_"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--color-accent)] hover:scale-110 transition-all duration-300 transform"
                      >
                        <FaTwitter />
                      </a>
                      <a
                        href="mailto:muhamad.ramadhan.dev@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--color-accent)] hover:scale-110 transition-all duration-300 transform"
                      >
                        <FaMailchimp />
                      </a>
                    </div>
                  </div>

                  <p className="text-sm opacity-70">
                    Let's collaborate and build something amazing together!
                  </p>
                </div>
                <div className="h-full bg-[var(--color-text-secondary)]/10 rounded-xl p-6">
                  <div className="grid grid-cols-2 gap-6 text-[var(--color-text-primary)] dark:text-[var(--color-text-secondary)]">
                    <div className="space-y-4 flex flex-col justify-start items-center text-center">
                      <h4 className="font-semibold text-lg border-b border-[var(--color-accent)] pb-2">
                        General
                      </h4>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="/"
                            className="opacity-80 hover:opacity-100 hover:text-[var(--color-accent)] transition-all"
                          >
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/about"
                            className="opacity-80 hover:opacity-100 hover:text-[var(--color-accent)] transition-all"
                          >
                            About
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/project"
                            className="opacity-80 hover:opacity-100 hover:text-[var(--color-accent)] transition-all"
                          >
                            Project
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/contact"
                            className="opacity-80 hover:opacity-100 hover:text-[var(--color-accent)] transition-all"
                          >
                            Contact
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4 flex flex-col justify-start items-center text-center">
                      <h4 className="font-semibold text-lg border-b border-[var(--color-accent)] pb-2">
                        Extras
                      </h4>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="/about#tech-stack"
                            className="opacity-80 hover:opacity-100 hover:text-[var(--color-accent)] transition-all"
                          >
                            Tech Stack
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/about#experience"
                            className="opacity-80 hover:opacity-100 hover:text-[var(--color-accent)] transition-all"
                          >
                            Experience
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container w-full mx-auto -mt-40">
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
};

export default Footer;
