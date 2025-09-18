import React from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import ShinyText from "@/components/ui/shiny-text";
import { AboutImages } from "./animated-about-image";

const AnimatedImageAbout = dynamic(
  () => import("./animated-about-image").then((mod) => mod.AnimatedImageAbout),
  {
    ssr: false,
  }
);

const LiquidEther = dynamic(
  () => import("@/components/ui/liquid-ether-background"),
  {
    ssr: false,
  }
);

const HeroAbout = ({ images }: { images: AboutImages[] }) => {
  return (
    <section
      id="about"
      className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full">
        <LiquidEther
          colors={["var(--color-secondary-light)", "var(--color-primary-light)", "var(--color-accent-light)"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="flex justify-center mb-8">
          <ShinyText
            text="About Me"
            disabled={false}
            speed={3}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-[var(--color-text-primary)]"
          />
        </div>
        <AnimatedImageAbout images={images}>
          <div className="space-y-4 px-6 flex flex-col justify-center">
            <p className="text-lg text-center text-[var(--color-text-primary)] :text-2xl lg:text-3xl leading-relaxed font-extrabold font-['Cascadia_Code'] md:text-start md:py-2">
              Hi there, I'm{" "}
              <span className="font-bold text-[var(--color-secondary)] animate-pulse">
                Muhamad Ramadhan
              </span>{" "}
              <motion.span
                className="text-2xl inline-block"
                animate={{
                  rotate: [0, 15, -15, 0],
                  transition: {
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  },
                }}
              >
                👋
              </motion.span>
              <br />
              <span className="bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-secondary-light)] bg-clip-text text-transparent font-semibold">
                7th semester Information Systems student
              </span>{" "}
              <span className="text-2xl">🎓</span>
            </p>

            <div className="space-y-3">
              {/* Age */}
              <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[var(--color-bg-secondary)]/50 to-[var(--color-primary)]/50 p-4 backdrop-blur-sm border border-[var(--color-border)]/50 hover:border-[var(--color-secondary)]/50 transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary-light)]/10 to-[var(--color-primary-light)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <svg
                        className="w-6 h-6 text-[var(--color-secondary)] group-hover:scale-110 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div className="absolute inset-0 bg-[var(--color-secondary)]/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
                    </div>
                    <span className="text-[var(--color-secondary)] font-semibold text-xs md:text-sm tracking-wide">
                      Age
                    </span>
                  </div>
                  <span className="text-[var(--color-text-secondary)] font-medium group-hover:text-[var(--color-text-primary)] transition-colors duration-300 text-xs lg:text-sm">
                    21 years old
                  </span>
                </div>
              </div>

              {/* Nationality */}
              <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[var(--color-bg-secondary)]/50 to-[var(--color-primary)]/50 p-4 backdrop-blur-sm border border-[var(--color-border)]/50 hover:border-[var(--color-secondary)]/50 transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary-light)]/10 to-[var(--color-primary-light)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <svg
                        className="w-6 h-6 text-[var(--color-secondary)] group-hover:scale-110 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div className="absolute inset-0 bg-[var(--color-secondary)]/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
                    </div>
                    <span className="text-[var(--color-secondary)] font-semibold  text-xs md:text-sm tracking-wide">
                      Nationality
                    </span>
                  </div>
                  <span className="text-[var(--color-text-secondary)] font-medium group-hover:text-[var(--color-text-primary)] transition-colors duration-300 text-xs lg:text-sm">
                    Indonesian
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[var(--color-bg-secondary)]/50 to-[var(--color-primary)]/50 p-4 backdrop-blur-sm border border-[var(--color-border)]/50 hover:border-[var(--color-secondary)]/50 transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary-light)]/10 to-[var(--color-primary-light)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <svg
                        className="w-6 h-6 text-[var(--color-secondary)] group-hover:scale-110 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div className="absolute inset-0 bg-[var(--color-secondary)]/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
                    </div>
                    <span className="text-[var(--color-secondary)] font-semibold text-xs md:text-sm tracking-wide">
                      Address
                    </span>
                  </div>
                  <span className="text-[var(--color-text-secondary)] font-medium group-hover:text-[var(--color-text-primary)] transition-colors duration-300 text-xs lg:text-sm">
                    Bekasi, Indonesia
                  </span>
                </div>
              </div>

              {/* Languages */}
              <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[var(--color-bg-secondary)]/50 to-[var(--color-primary)]/50 p-4 backdrop-blur-sm border border-[var(--color-border)]/50 hover:border-[var(--color-secondary)]/50 transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary-light)]/10 to-[var(--color-primary-light)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <svg
                        className="w-6 h-6 text-[var(--color-secondary)] group-hover:scale-110 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                        />
                      </svg>
                      <div className="absolute inset-0 bg-[var(--color-secondary)]/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
                    </div>
                    <span className="text-[var(--color-secondary)] font-semibold text-xs md:text-sm tracking-wide">
                      Languages
                    </span>
                  </div>
                  <span className="text-[var(--color-text-secondary)] font-medium group-hover:text-[var(--color-text-primary)] transition-colors duration-300 text-xs lg:text-sm">
                    Indonesian, English
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[var(--color-bg-secondary)]/50 to-[var(--color-primary)]/50 p-4 backdrop-blur-sm border border-[var(--color-border)]/50 hover:border-[var(--color-secondary)]/50 transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary-light)]/10 to-[var(--color-primary-light)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <svg
                        className="w-6 h-6 text-[var(--color-secondary)] group-hover:scale-110 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <div className="absolute inset-0 bg-[var(--color-secondary)]/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
                    </div>
                    <span className="text-[var(--color-secondary)] font-semibold text-xs md:text-sm tracking-wide">
                      Email
                    </span>
                  </div>
                  <span className="text-[var(--color-text-secondary)] font-medium group-hover:text-[var(--color-text-primary)] transition-colors duration-300 text-xs lg:text-sm break-all ml-4 lg:ml-0">
                    muhamad.ramadhan.dev@gmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedImageAbout>
      </div>
    </section>
  );
};

export default HeroAbout;
