"use client";
import { cn, createPlaceHolder } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

import React, { useRef, useState, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
    onClick?: (event?: React.MouseEvent<HTMLAnchorElement>) => void;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

// Helper function to check if a link is active
const isActive = (currentPath: string, linkPath: string) => {
  // Remove hash from current path
  const cleanCurrentPath = currentPath.split("#")[0];

  // Remove hash from link path
  const cleanLinkPath = linkPath.split("#")[0];

  // Check if paths match exactly or if current path starts with link path
  return cleanCurrentPath === cleanLinkPath || 
    (cleanCurrentPath.startsWith(cleanLinkPath) && 
    (cleanLinkPath !== '/' && cleanLinkPath.length > 1));
};

export const Navbar = memo(({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [isResized, setIsResized] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Logika untuk resize hanya jika sudah di-scroll
    setIsResized(latest > 100);
  });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 1,
        y: 0,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isResized ? 0.95 : 1,
      }}
      transition={{
        type: "tween",
        duration: 1,
        ease: "easeInOut",
      }}
      className={cn("fixed inset-x-0 top-0 z-40 w-full", className)}
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

export const NavBody = memo(
  ({ children, className, visible }: NavBodyProps) => {
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
          "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex dark:bg-transparent",
          "bg-[var(--color-bg-primary)]/80 dark:bg-[var(--color-bg-secondary)]/80",
          className
        )}
      >
        {children}
      </motion.div>
    );
  }
);

export const NavItems = memo(
  ({ items, className, onItemClick }: NavItemsProps) => {
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
              isActive(pathname, item.link) &&
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
  }
);

export const MobileNav = memo(
  ({ children, className, visible }: MobileNavProps) => {
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
          "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
          "bg-[var(--color-bg-primary)]/80 dark:bg-[var(--color-bg-secondary)]/80",
          className
        )}
      >
        {children}
      </motion.div>
    );
  }
);

export const MobileNavHeader = memo(
  ({ children, className }: MobileNavHeaderProps) => {
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
  }
);

export const MobileNavMenu = memo(
  ({ children, className, isOpen, onClose }: MobileNavMenuProps) => {
    // Add keyboard accessibility for closing the menu
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            onKeyDown={handleKeyDown}
            tabIndex={-1}
            className={cn(
              "fixed inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-[var(--color-bg-primary)] px-4 py-8 shadow-lg dark:bg-[var(--color-bg-secondary)] max-h-[calc(100vh-4rem)] overflow-y-auto",
              className
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

export const MobileNavToggle = memo(
  ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
    return (
      <button
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        onClick={onClick}
        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
      >
        {isOpen ? (
          <IconX className="text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)]" />
        ) : (
          <IconMenu2 className="text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)]" />
        )}
      </button>
    );
  }
);

export const NavbarLogo = memo(
  ({
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
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <Link
        href={link}
        onClick={handleClick}
        className="relative z-20 mr-4 flex items-center space-x-2 py-1 text-sm font-normal text-[var(--color-text-primary)]"
      >
        <img
          src={
            image === "" ? createPlaceHolder(title || "Default Image") : image
          }
          alt="logo"
          width={36}
          height={36}
        />
        <span className="font-medium text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)]">{title}</span>
      </Link>
    );
  }
);

export const NavbarButton = memo(
  ({
    href,
    as: Tag = "a",
    children,
    className,
    variant = "primary",
    ...props
  }: {
    href?: string;
    as?: React.ElementType;
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "secondary" | "dark" | "gradient";
  } & (
    | React.ComponentPropsWithoutRef<"a">
    | React.ComponentPropsWithoutRef<"button">
  )) => {
    const baseStyles =
      "px-4 py-2 rounded-md bg-[var(--color-bg-primary)] button text-[var(--color-text-primary)] text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

    const variantStyles = {
      primary:
        "shadow-[0_0_24px_var(--color-shadow),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_var(--color-border),_0_0_4px_var(--color-shadow),_0_16px_68px_var(--color-shadow),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
      secondary: "bg-transparent shadow-none dark:text-[var(--color-text-primary)]",
      dark: "bg-[var(--color-primary)] text-[var(--color-text-primary)] shadow-[0_0_24px_var(--color-shadow),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_var(--color-border),_0_0_4px_var(--color-shadow),_0_16px_68px_var(--color-shadow),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
      gradient:
        "bg-gradient-to-b from-[var(--color-secondary)] to-[var(--color-primary)] text-[var(--color-text-primary)] shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
    };

    return (
      <Tag
        href={href}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);
