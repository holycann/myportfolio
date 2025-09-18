"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { SocialFloatingButton } from "@/components/ui/social-floating-button";
import { FaGithub, FaLinkedin, FaStackOverflow } from "react-icons/fa6";
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

type NavItem = {
  name: string;
  link: string;
};

const navItems: NavItem[] = [
  {
    name: "Home",
    link: "/#hero",
  },
  {
    name: "About",
    link: "/about#about",
  },
  {
    name: "Tech Stack",
    link: "/about#tech-stack",
  },
  {
    name: "Experiences",
    link: "/about#experience",
  },
  {
    name: "Projects",
    link: "/projects",
  },
];

const NAVBAR_HEIGHT = 100;
const SCROLL_DURATION = 1.2;
const SCROLL_OFFSET = 100;

export const Nav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const smoothScrollTo = useCallback((target: string) => {
    if ((window as any).smoothScrollTo) {
      (window as any).smoothScrollTo(target, {
        duration: SCROLL_DURATION,
        offset: SCROLL_OFFSET,
        easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t)),
      });
    }
  }, []);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsNavbarVisible(
      currentScrollY <= NAVBAR_HEIGHT || // Always visible at top
        currentScrollY < lastScrollY // Scrolling up
    );
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleNavigation = useCallback(
    (item: NavItem, event?: React.MouseEvent) => {
      event?.preventDefault();
      window.scrollTo(0, 0);

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

  const navItemsWithHandlers = useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        onClick: (event?: React.MouseEvent<HTMLAnchorElement>) => {
          handleNavigation(item, event);
        },
      })),
    [handleNavigation]
  );

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const logoProps = {
    image: "/images/logo.png",
    title: "Muhamad Ramadhan",
    link: "/#hero",
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    smoothScrollTo("hero");
    closeMobileMenu();
  };

  return (
    <>
      <div
        className={`sticky top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isNavbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Navbar>
          {/* Desktop Navigation */}
          <NavBody>
            <NavbarLogo {...logoProps} onClick={handleLogoClick} />
            <NavItems items={navItemsWithHandlers} onItemClick={() => {}} />
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
              <NavbarLogo {...logoProps} onClick={handleLogoClick} />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={toggleMobileMenu}
              />
            </MobileNavHeader>

            <MobileNavMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu}>
              {navItems.map((item, idx) => (
                <NavbarButton
                  key={`mobile-link-${idx}`}
                  as="a"
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
      </div>
    </>
  );
};

export default Nav;
