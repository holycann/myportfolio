"use client";
import { useState } from "react";
import { SocialFloatingButton } from "@/components/ui/social-floating-button";
import { FaGithub, FaLinkedin, FaStackOverflow } from "react-icons/fa6";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

const socialItems = [
  {
    name: "Github",
    link: "https://github.com/holycann",
    icon: <FaGithub className="text-neutral-500 dark:text-white" size={24} />,
  },
  {
    name: "Linkedin",
    link: "https://www.linkedin.com/in/muhamad-ramadhan-bb6289237/",
    icon: <FaLinkedin className="text-neutral-500 dark:text-white" size={24} />,
  },
  {
    name: "Stack Overflow",
    link: "https://stackoverflow.com/users/21961396/holycan",
    icon: (
      <FaStackOverflow className="text-neutral-500 dark:text-white" size={24} />
    ),
  },
];

const navItems = [
  {
    name: "About",
    link: "#about",
  },
  {
    name: "Tech Stack",
    link: "#tech-stack",
  },
  {
    name: "Experiences",
    link: "#experience",
  },
  {
    name: "Projects",
    link: "#project",
  },
];


export const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleGetInTouch = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo image="/images/logo.png" title="Muhamad Ramadhan" />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4 px-4">
            <NavbarButton variant="primary" onClick={handleGetInTouch} className="rounded-full">Get In Touch</NavbarButton>
          </div>
        </NavBody>
 
        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo image="/images/logo.png" title="Muhamad Ramadhan" />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
 
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Get In Touch
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <SocialFloatingButton socialItems={socialItems} className="hidden md:flex"/>
    </div>
  );
};

export default Nav;
