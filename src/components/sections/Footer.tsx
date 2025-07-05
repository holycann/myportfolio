import React from "react";
import {
  SiChakraui,
  SiFramer,
  SiNextdotjs,
  SiRadixui,
  SiTailwindcss,
  SiVercel,
} from "react-icons/si";

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent backdrop-blur-sm pt-20 z-50 relative">
      <div className="container mx-auto px-4 flex flex-col items-center space-y-4">
        <div className="text-center text-xs lg:text-sm text-gray-400 flex flex-col items-center space-y-2">
          <p className="flex items-center space-x-2">
            <span>Designed and Developed by Muhamad Ramadhan</span>
          </p>
          <p className="hidden md:flex items-center space-x-2">
            <span>Built with: </span>
            <SiTailwindcss className="inline-block mx-1" title="Tailwind CSS" />
            <span>Tailwind CSS</span>
            <span>•</span>
            <SiRadixui className="inline-block mx-1" title="Radix UI" />
            <span>Radix UI</span>
            <span>•</span>
            <SiFramer className="inline-block mx-1" title="Framer Motion" />
            <span>Framer Motion</span>
            <span>•</span>
            <SiNextdotjs className="inline-block mx-1" title="Next.js" />
            <span>Next.js</span>
            <SiChakraui className="inline-block mx-1" title="Aceternity UI" />
            <span>Aceternity UI</span>
            <span>•</span>
            <SiVercel className="inline-block mx-1" title="Hosted on Vercel" />
            <span>Hosted on Vercel</span>
          </p>
          <div className="flex items-center space-x-1">
            <span>Made with</span>
            <span className="text-red-500 animate-bounce">❤️</span>
          </div>
        </div>
        <div className="text-center text-sm text-gray-400 flex flex-col items-center space-y-2">
          <div className="w-screen h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30 absolute left-0"></div>
          <p className="text-xs opacity-75 py-4">
            © {new Date().getFullYear()} All Rights Reserved by Muhamad
            Ramadhan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
