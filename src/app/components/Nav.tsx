"use client";
import { useState, useEffect } from "react";
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

type NavItem = {
  name: string;
  link: string;
};

const navItems: NavItem[] = [
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
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide navbar when scrolling down more than 100px
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavbarVisible(false);
      } 
      // Show navbar when scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsNavbarVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const handleSmoothScroll = (sectionId: string, event?: React.MouseEvent) => {
    // Remove the '#' if present
    const cleanSectionId = sectionId.replace("#", "");
    
    // Prevent default browser scrolling
    event?.preventDefault();

    // Use global smoothScrollTo method from Lenis provider
    if ((window as any).smoothScrollTo) {
      (window as any).smoothScrollTo(cleanSectionId || 'hero', {
        duration: 1.2,
        offset: 100,
        easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t))
      });
    }
  };

  const handleGetInTouch = () => {
    // Ensure 'contact' section exists
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      handleSmoothScroll("#contact");
    } else {
      console.warn("Contact section not found");
    }
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
      isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo 
            image="/images/logo.png" 
            title="Muhamad Ramadhan" 
            link="#hero"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleSmoothScroll("#hero", e)}
          />
          <NavItems
            items={navItems.map((item) => ({
              ...item,
              onClick: (event?: React.MouseEvent<HTMLAnchorElement>) => {
                // Prevent default anchor behavior
                event?.preventDefault();
                handleSmoothScroll(item.link);
              },
            }))}
            onItemClick={() => {}} 
          />
          <div className="flex items-center gap-4 px-4">
            <NavbarButton
              variant="primary"
              onClick={handleGetInTouch}
              className="rounded-full"
            >
              Let's Connect
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo 
              image="/images/logo.png" 
              title="Muhamad Ramadhan" 
              link="#hero"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                handleSmoothScroll("#hero", e);
                setIsMobileMenuOpen(false);
              }}
            />
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
                onClick={(e) => {
                  handleSmoothScroll(item.link, e);
                  setIsMobileMenuOpen(false);
                }}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => {
                  handleSmoothScroll("#contact");
                  setIsMobileMenuOpen(false);
                }}
                variant="primary"
                className="w-full"
              >
                Let's Connect
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <SocialFloatingButton
        socialItems={socialItems}
        className="block"
      />
    </div>
  );
};

export default Nav;
