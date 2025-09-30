"use client";
import React, { 
  useRef, 
  useState, 
  useCallback, 
  useMemo 
} from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  AnimatePresence, 
  motion, 
  useMotionValueEvent, 
  useScroll,
  Transition 
} from "framer-motion";
import { 
  FaBars, 
  FaTimes 
} from "react-icons/fa";
import { cn, createPlaceHolder } from "@/lib/utils";

/**
 * Configuration for Resizable Navbar
 * Centralizes styling, animation, and performance settings
 */
const NAVBAR_CONFIG = {
  scrollThreshold: 50, // Reduced from 100 for more responsive resizing
  animation: {
    resizeTransition: {
      type: "tween" as const, // Explicitly typed as const
      duration: 0.5, // Slightly faster transition
      ease: "easeInOut"
    } as Transition, // Cast to Transition type
    mobileMenu: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    }
  },
  styling: {
    desktopNavbar: "fixed inset-x-0 top-0 z-50 w-full", // Increased z-index
    desktopNavBody: "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex dark:bg-transparent",
    mobileNavbar: "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
    mobileMenu: "fixed inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg max-h-[calc(100vh-4rem)] overflow-y-auto"
  }
};

/**
 * Check if a link is active based on current path
 * @param currentPath Current page path
 * @param linkPath Link path to compare
 * @returns Boolean indicating if link is active
 */
const isLinkActive = (currentPath: string, linkPath: string): boolean => {
  const cleanCurrentPath = currentPath.split("#")[0];
  const cleanLinkPath = linkPath.split("#")[0];

  return cleanCurrentPath === cleanLinkPath || 
    (cleanCurrentPath.startsWith(cleanLinkPath) && 
    (cleanLinkPath !== '/' && cleanLinkPath.length > 1));
};

/**
 * Main Navbar component with resizing and scroll-based animations
 */
export const Navbar = React.memo(({ 
  children, 
  className 
}: { 
  children: React.ReactNode, 
  className?: string 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [isResized, setIsResized] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Trigger resize at a lower threshold for more responsive behavior
    setIsResized(latest > NAVBAR_CONFIG.scrollThreshold);
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 1, y: 0 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isResized ? 0.95 : 1, // Subtle scale effect
      }}
      transition={NAVBAR_CONFIG.animation.resizeTransition}
      className={cn(
        NAVBAR_CONFIG.styling.desktopNavbar, 
        "sticky top-0", // Ensure sticky positioning
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ isResized?: boolean }>,
              { isResized }
            )
          : child
      )}
    </motion.div>
  );
});

Navbar.displayName = 'Navbar';

/**
 * Navbar body component with blur and shadow effects
 */
export const NavBody = React.memo(({
  children, 
  className, 
  visible 
}: { 
  children: React.ReactNode, 
  className?: string, 
  visible?: boolean 
}) => {
  return (
    <motion.div
      animate={{
        backdropFilter: "blur(10px)",
        boxShadow:
          "0 0 24px var(--color-shadow), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px var(--color-border), 0 0 4px var(--color-shadow), 0 16px 68px var(--color-shadow), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        width: "40%",
        y: 20,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "1000px",
      }}
      className={cn(
        NAVBAR_CONFIG.styling.desktopNavBody,
        "bg-[var(--color-bg-primary)]/80 dark:bg-[var(--color-bg-secondary)]/80",
        className
      )}
    >
      {children}
    </motion.div>
  );
});

NavBody.displayName = 'NavBody';

/**
 * Navigation items with hover and active state management
 */
export const NavItems = React.memo(({
  items, 
  className, 
  onItemClick 
}: { 
  items: { 
    name: string; 
    link: string; 
    onClick?: (event?: React.MouseEvent<HTMLAnchorElement>) => void 
  }[], 
  className?: string, 
  onItemClick?: () => void 
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const pathname = usePathname();

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-[var(--color-text-muted)] transition duration-200 hover:text-[var(--color-text-primary)] lg:flex lg:space-x-2",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          onMouseEnter={() => setHovered(idx)}
          onClick={(event) => {
            item.onClick?.(event);
            onItemClick?.();
          }}
          className={cn(
            "relative px-4 py-2 text-[var(--color-text-secondary)] dark:text-[var(--color-text-primary)]",
            isLinkActive(pathname, item.link) &&
              "text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)] font-semibold"
          )}
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-[var(--color-bg-secondary)] dark:bg-[var(--color-bg-primary)]"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </Link>
      ))}
    </motion.div>
  );
});

NavItems.displayName = 'NavItems';

/**
 * Mobile navigation container
 */
export const MobileNav = React.memo(({
  children, 
  className, 
  visible 
}: { 
  children: React.ReactNode, 
  className?: string, 
  visible?: boolean 
}) => {
  return (
    <motion.div
      animate={{
        backdropFilter: "blur(10px)",
        boxShadow:
          "0 0 24px var(--color-shadow), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px var(--color-border), 0 0 4px var(--color-shadow), 0 16px 68px var(--color-shadow), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        width: "90%",
        paddingRight: "12px",
        paddingLeft: "12px",
        borderRadius: "4px",
        y: 20,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        NAVBAR_CONFIG.styling.mobileNavbar,
        "bg-[var(--color-bg-primary)]/80 dark:bg-[var(--color-bg-secondary)]/80",
        className
      )}
    >
      {children}
    </motion.div>
  );
});

MobileNav.displayName = 'MobileNav';

/**
 * Mobile navigation header
 */
export const MobileNavHeader = React.memo(({
  children, 
  className 
}: { 
  children: React.ReactNode, 
  className?: string 
}) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
});

MobileNavHeader.displayName = 'MobileNavHeader';

/**
 * Mobile navigation menu with accessibility features
 */
export const MobileNavMenu = React.memo(({
  children, 
  className, 
  isOpen, 
  onClose 
}: { 
  children: React.ReactNode, 
  className?: string, 
  isOpen: boolean, 
  onClose: () => void 
}) => {
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={NAVBAR_CONFIG.animation.mobileMenu.initial}
          animate={NAVBAR_CONFIG.animation.mobileMenu.animate}
          exit={NAVBAR_CONFIG.animation.mobileMenu.exit}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          className={cn(
            NAVBAR_CONFIG.styling.mobileMenu,
            "bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-secondary)] px-4 py-8 shadow-lg",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

MobileNavMenu.displayName = 'MobileNavMenu';

/**
 * Mobile navigation toggle button
 */
export const MobileNavToggle = React.memo(({
  isOpen, 
  onClick 
}: { 
  isOpen: boolean; 
  onClick: () => void 
}) => {
  return (
    <button
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      onClick={onClick}
      className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
    >
      {isOpen ? (
        <FaTimes className="text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)]" />
      ) : (
        <FaBars className="text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)]" />
      )}
    </button>
  );
});

MobileNavToggle.displayName = 'MobileNavToggle';

/**
 * Navbar logo component with image and title
 */
export const NavbarLogo = React.memo(({
  link = "/",
  image,
  title,
  onClick,
}: {
  link?: string;
  image: string;
  title: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
  }, [onClick]);

  return (
    <Link
      href={link}
      onClick={handleClick}
      className="relative z-20 mr-4 flex items-center space-x-2 py-1 text-sm font-normal text-[var(--color-text-primary)]"
    >
      <Image
        src={image === "" ? createPlaceHolder(title || "Default Image") : image}
        alt={title}
        width={36}
        height={36}
        sizes="(max-width: 768px) 50px, 36px"
        className="object-contain"
      />
      <span className="font-medium text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)]">
        {title}
      </span>
    </Link>
  );
});

NavbarLogo.displayName = 'NavbarLogo';

/**
 * Navbar button with multiple variant styles
 */
export const NavbarButton = React.memo(({
  href,
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & React.ComponentPropsWithoutRef<"a">) => {
  const baseStyles = useMemo(() => 
    "px-4 py-2 rounded-md bg-[var(--color-bg-primary)] button text-[var(--color-text-primary)] text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center"
  , []);

  const variantStyles = useMemo(() => ({
    primary:
      "shadow-[0_0_24px_var(--color-shadow),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_var(--color-border),_0_0_4px_var(--color-shadow),_0_16px_68px_var(--color-shadow),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-[var(--color-text-primary)]",
    dark: "bg-[var(--color-primary)] text-[var(--color-text-primary)] shadow-[0_0_24px_var(--color-shadow),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_var(--color-border),_0_0_4px_var(--color-shadow),_0_16px_68px_var(--color-shadow),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-[var(--color-secondary)] to-[var(--color-primary)] text-[var(--color-text-primary)] shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  }), []);

  return (
    <Link
      href={href || ''}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Link>
  );
});

NavbarButton.displayName = 'NavbarButton';
