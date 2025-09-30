"use client";
import React, { useState, useCallback, useMemo } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
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

/**
 * Configuration for Navigation
 * Centralizes navigation settings and performance optimizations
 */
const NAV_CONFIG = {
  items: [
    { name: "Home", link: "/#hero" },
    { name: "About", link: "/about#about" },
    { name: "Tech Stack", link: "/about#tech-stack" },
    { name: "Experiences", link: "/about#experience" },
    { name: "Projects", link: "/projects" },
  ],
  logo: {
    image: "/images/logo.png",
    title: "Muhamad Ramadhan",
    link: "/#hero",
  },
};

/**
 * Navigation component with responsive desktop and mobile views
 */
export const Nav = React.memo(() => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navigateAndScroll } = useSmoothScroll();

  // Mobile menu toggle handlers
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Logo click handler
  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      navigateAndScroll("/#hero");
      closeMobileMenu();
    },
    [navigateAndScroll, closeMobileMenu]
  );

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo {...NAV_CONFIG.logo} onClick={handleLogoClick} />
        <NavItems items={NAV_CONFIG.items} />
        <div className="flex items-center gap-4 px-4">
          <NavbarButton variant="primary" className="rounded-full">
            Let's Connect
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo {...NAV_CONFIG.logo} onClick={handleLogoClick} />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          />
        </MobileNavHeader>

        <MobileNavMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu}>
          {NAV_CONFIG.items.map((item, idx) => (
            <NavbarButton
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => closeMobileMenu()}
              variant="secondary"
              className="w-full text-left"
            >
              {item.name}
            </NavbarButton>
          ))}
          <div className="flex w-full flex-col gap-4">
            <NavbarButton
              onClick={() => {
                closeMobileMenu();
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
  );
});

Nav.displayName = "Nav";

export default Nav;
