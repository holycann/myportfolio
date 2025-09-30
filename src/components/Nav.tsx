"use client";
import React, { 
  useState, 
  useEffect, 
  useCallback, 
  useMemo 
} from "react";
import { useRouter, usePathname } from "next/navigation";
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
  scrollBehavior: {
    height: 100,
    duration: 1.2,
    offset: 100,
    easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t))
  },
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
    link: "/#hero"
  }
};

/**
 * Type definition for navigation items
 */
type NavItem = {
  name: string;
  link: string;
};

/**
 * Navigation component with responsive desktop and mobile views
 */
export const Nav = React.memo(() => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Smooth scrolling utility
  const smoothScrollTo = useCallback((target: string) => {
    if (typeof window !== 'undefined' && (window as any).smoothScrollTo) {
      (window as any).smoothScrollTo(target, {
        duration: NAV_CONFIG.scrollBehavior.duration,
        offset: NAV_CONFIG.scrollBehavior.offset,
        easing: NAV_CONFIG.scrollBehavior.easing,
      });
    }
  }, []);

  // Navigation handler with cross-page scroll management
  const handleNavigation = useCallback(
    (item: NavItem, event?: React.MouseEvent) => {
      event?.preventDefault();
      
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }

      const normalizedLink = item.link.startsWith("/")
        ? item.link
        : pathname + item.link;

      const [path, hash] = normalizedLink.split("#");

      const navigateAndScroll = (targetPath?: string) => {
        if (hash && (!targetPath || pathname === targetPath)) {
          smoothScrollTo(hash || "hero");
        }
      };

      if (path && path !== pathname) {
        router.push(normalizedLink, { scroll: false });
        setTimeout(() => navigateAndScroll(path), 300);
      } else {
        navigateAndScroll(pathname);
      }
    },
    [router, pathname, smoothScrollTo]
  );

  // Memoized navigation items with click handlers
  const navItemsWithHandlers = useMemo(
    () => NAV_CONFIG.items.map((item) => ({
      ...item,
      onClick: (event?: React.MouseEvent<HTMLAnchorElement>) => {
        handleNavigation(item, event);
      },
    })),
    [handleNavigation]
  );

  // Mobile menu toggle handlers
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Logo click handler
  const handleLogoClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    smoothScrollTo("hero");
    closeMobileMenu();
  }, [smoothScrollTo, closeMobileMenu]);

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo 
          {...NAV_CONFIG.logo} 
          onClick={handleLogoClick} 
        />
        <NavItems 
          items={navItemsWithHandlers} 
          onItemClick={() => {}} 
        />
        <div className="flex items-center gap-4 px-4">
          <NavbarButton
            variant="primary"
            onClick={() => router.push("/contact")}
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
            {...NAV_CONFIG.logo} 
            onClick={handleLogoClick} 
          />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          />
        </MobileNavHeader>

        <MobileNavMenu 
          isOpen={isMobileMenuOpen} 
          onClose={closeMobileMenu}
        >
          {NAV_CONFIG.items.map((item, idx) => (
            <NavbarButton
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                handleNavigation(item, e);
                closeMobileMenu();
              }}
              variant="secondary"
              className="w-full text-left"
            >
              {item.name}
            </NavbarButton>
          ))}
          <div className="flex w-full flex-col gap-4">
            <NavbarButton
              onClick={() => {
                router.push("/contact");
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

Nav.displayName = 'Nav';

export default Nav;
