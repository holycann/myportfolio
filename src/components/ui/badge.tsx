import { cn } from '@/lib/utils';
import React from 'react';

/**
 * Badge component configuration and style definitions
 * Provides a flexible and extensible badge styling system
 */
const BADGE_CONFIG = {
  /**
   * Variant styles for different badge types
   * Includes solid and outline variants with consistent color schemes
   */
  variants: {
    // Solid variants with background and text colors
    default: { 
      bg: 'bg-gray-100/60', 
      text: 'text-gray-800',
      border: 'border-gray-200/50'
    },
    primary: { 
      bg: 'bg-blue-500/60', 
      text: 'text-white',
      border: 'border-blue-600/50'
    },
    secondary: { 
      bg: 'bg-gray-500/60', 
      text: 'text-white',
      border: 'border-gray-600/50'
    },
    success: { 
      bg: 'bg-green-500/60', 
      text: 'text-white',
      border: 'border-green-600/50'
    },
    warning: { 
      bg: 'bg-yellow-500/60', 
      text: 'text-black',
      border: 'border-yellow-600/50'
    },
    danger: { 
      bg: 'bg-red-500/60', 
      text: 'text-white',
      border: 'border-red-600/50'
    },
    info: { 
      bg: 'bg-cyan-500/60', 
      text: 'text-white',
      border: 'border-cyan-600/50'
    },
    
    // Outline variants
    'outline-default': { 
      bg: 'bg-transparent', 
      text: 'text-gray-800',
      border: 'border border-gray-300'
    },
    'outline-primary': { 
      bg: 'bg-transparent', 
      text: 'text-blue-500',
      border: 'border border-blue-500'
    },
    'outline-secondary': { 
      bg: 'bg-transparent', 
      text: 'text-gray-500',
      border: 'border border-gray-500'
    },
    'outline-success': { 
      bg: 'bg-transparent', 
      text: 'text-green-500',
      border: 'border border-green-500'
    },
    'outline-warning': { 
      bg: 'bg-transparent', 
      text: 'text-yellow-500',
      border: 'border border-yellow-500'
    },
    'outline-danger': { 
      bg: 'bg-transparent', 
      text: 'text-red-500',
      border: 'border border-red-500'
    },
    'outline-info': { 
      bg: 'bg-transparent', 
      text: 'text-cyan-500',
      border: 'border border-cyan-500'
    },
  },

  /**
   * Size configurations for badge dimensions and typography
   */
  sizes: {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-2',
    lg: 'px-4 py-2 text-base gap-2',
  },

  /**
   * Rounded corner styles for badge
   */
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  }
};

/**
 * Badge component properties
 * Defines the shape and behavior of the badge
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof BADGE_CONFIG.variants;
  size?: keyof typeof BADGE_CONFIG.sizes;
  rounded?: keyof typeof BADGE_CONFIG.rounded;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  blur?: boolean;
}

/**
 * Flexible and customizable Badge component
 * Supports multiple variants, sizes, and styling options
 * 
 * @component
 * @param {BadgeProps} props - Badge configuration properties
 */
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      rounded = 'md',
      className,
      icon,
      iconPosition = 'left',
      blur = false,
      children,
      ...props
    },
    ref
  ) => {
    // Safely get variant styles with fallback
    const selectedVariant = BADGE_CONFIG.variants[variant] || BADGE_CONFIG.variants.default;

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium',
          selectedVariant.bg,
          selectedVariant.text,
          selectedVariant.border,
          BADGE_CONFIG.sizes[size],
          BADGE_CONFIG.rounded[rounded],
          blur && 'backdrop-blur-md',
          className
        )}
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <span className="mr-1">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="ml-1">{icon}</span>
        )}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge; 