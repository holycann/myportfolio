import { cn } from '@/lib/utils';
import React from 'react';

// Definisi tipe props untuk Badge
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'outline-default' | 'outline-primary' | 'outline-secondary' | 'outline-success' | 'outline-warning' | 'outline-danger' | 'outline-info';
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  blur?: boolean;
}

// Komponen Badge
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
    // Variasi warna untuk badge dengan background dan text yang berbeda
    const variantStyles = {
      // Solid variants dengan background dan text yang berbeda
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
    };

    // Ukuran badge
    const sizeStyles = {
      sm: 'px-2 py-0.5 text-xs gap-1',
      md: 'px-3 py-1 text-sm gap-2',
      lg: 'px-4 py-2 text-base gap-2',
    };

    // Rounded badge
    const roundedStyles = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    };

    // Dapatkan gaya untuk variant yang dipilih
    const selectedVariant = variantStyles[variant];

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium',
          selectedVariant.bg,
          selectedVariant.text,
          selectedVariant.border,
          sizeStyles[size],
          roundedStyles[rounded],
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