"use client";
import { AboutImages, AnimatedImageAbout } from "./components/animated-about-image";
import { Carousel } from "@/components/ui/carousel";
import { TypewriterEffectSmooth, TypewriterWord } from "@/components/ui/typewriter-effect";
import { motion } from 'motion/react';

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

const slideData = [
  {
    title: "Mystic Mountains",
    button: "Explore Component",
    src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Urban Dreams",
    button: "Explore Component",
    src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Neon Nights",
    button: "Explore Component",
    src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Desert Whispers",
    button: "Explore Component",
    src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const typewriterWord: TypewriterWord[] = [
  {
    text: "My",
  },
  {
    text: "Story",
  },
]

export default function About() {
  return (
    <section id="about" className="container relative mx-auto px-4 py-10 md:py-20">
      <div className="flex justify-center">
        <h1 className="relative text-center text-4xl md:text-5xl lg:text-6xl leading-none block drop-shadow-[6px_6px_0px_rgba(0,0,0,0.3)] dark:drop-shadow-[6px_6px_0px_rgba(255,255,255,0.2)] font-['Cascadia_Code']">
          About Me
          <div className="w-full flex items-center justify-start overflow-hidden">
            {[...Array(10)].map((_, index) => (
              <div 
                key={index} 
                className="w-2 md:w-4 h-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mx-1 animate-ping"
                style={{
                  animationDelay: `${index * 6}s`,
                  animationDuration: '3s',
                  transform: `rotate(${index * 5}deg)`
                }}
              />
            ))}
          </div>
        </h1>
      </div>
      <AnimatedImageAbout images={images}>
        <div className="space-y-4 px-6 flex flex-col justify-center">
          <p className="text-lg text-center :text-2xl lg:text-3xl leading-relaxed font-extrabold font-['Cascadia_Code'] md:text-start md:py-2">
            Hi there, I'm{" "}
            <span className="font-bold text-cyan-600 animate-pulse">
              Muhamad Ramadhan
            </span>{" "}
            <motion.span 
              className="text-2xl inline-block"
              animate={{
                rotate: [0, 15, -15, 0],
                transition: {
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "loop"
                }
              }}
            >
              👋
            </motion.span>
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent font-semibold">
              7th semester Information Systems student
            </span>{" "}
            <span className="text-2xl">🎓</span>
          </p>

          <div className="space-y-3">
            {/* Age */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-900/50 to-slate-800/50 p-4 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <svg
                      className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300"
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
                    <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
                  </div>
                  <span className="text-cyan-400 font-semibold text-xs md:text-sm tracking-wide">
                    Age
                  </span>
                </div>
                <span className="text-slate-300 font-medium group-hover:text-white transition-colors duration-300 text-xs lg:text-sm">
                  21 years old
                </span>
              </div>
            </div>

            {/* Nationality */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-900/50 to-slate-800/50 p-4 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <svg
                      className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300"
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
                    <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
                  </div>
                  <span className="text-cyan-400 font-semibold  text-xs md:text-sm tracking-wide">
                    Nationality
                  </span>
                </div>
                <span className="text-slate-300 font-medium group-hover:text-white transition-colors duration-300 text-xs lg:text-sm">
                  Indonesian
                </span>
              </div>
            </div>

            {/* Address */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-900/50 to-slate-800/50 p-4 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <svg
                      className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300"
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
                    <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
                  </div>
                  <span className="text-cyan-400 font-semibold text-xs md:text-sm tracking-wide">
                    Address
                  </span>
                </div>
                <span className="text-slate-300 font-medium group-hover:text-white transition-colors duration-300 text-xs lg:text-sm">
                  Bekasi, Indonesia
                </span>
              </div>
            </div>

            {/* Languages */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-900/50 to-slate-800/50 p-4 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <svg
                      className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300"
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
                    <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
                  </div>
                  <span className="text-cyan-400 font-semibold text-xs md:text-sm tracking-wide">
                    Languages
                  </span>
                </div>
                <span className="text-slate-300 font-medium group-hover:text-white transition-colors duration-300 text-xs lg:text-sm">
                  Indonesian, English
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-900/50 to-slate-800/50 p-4 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <svg
                      className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300"
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
                    <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
                  </div>
                  <span className="text-cyan-400 font-semibold text-xs md:text-sm tracking-wide">
                    Email
                  </span>
                </div>
                <span className="text-slate-300 font-medium group-hover:text-white transition-colors duration-300 text-xs lg:text-sm break-all ml-4 lg:ml-0">
                  muhamad.ramadhan.dev@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* <p className="text-lg leading-relaxed text-justify">
            <span className="text-2xl">🚀</span> My journey started with a deep
            curiosity about how systems work, and that led me into the{" "}
            <span className="text-2xl">💻</span> world of software development
            and automation.
          </p>

          <p className="text-lg leading-relaxed text-justify">
            <span className="text-2xl">🌟</span> I'm always eager to take on new
            challenges, expand my perspective, and move closer to my goal of
            contributing to <span className="text-2xl">🌍</span> global tech
            projects in a remote environment{" "}
            <span className="text-2xl">🏠</span>
          </p> */}
        </div>
      </AnimatedImageAbout>
      {/* <div className="flex flex-col justify-center items-center text-center pb-16">
        <h1 className="text-5xl text-cyan-600 leading-none block drop-shadow-[4px_4px_0px_rgba(6,182,212,0.3)] font-['Cascadia_Code']">&</h1>
        <TypewriterEffectSmooth words={typewriterWord} className="text-6xl drop-shadow-[6px_6px_0px_rgba(0,0,0,0.3)] dark:drop-shadow-[6px_6px_0px_rgba(255,255,255,0.2)] font-['Cascadia_Code']"/>
      </div> */}
      {/* <Carousel slides={slideData}/> */}
    </section>
  );
}
