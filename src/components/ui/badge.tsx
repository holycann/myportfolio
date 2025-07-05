import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import React from 'react';

// Definisi tipe props untuk Badge
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'outline-default' | 'outline-primary' | 'outline-secondary' | 'outline-success' | 'outline-warning' | 'outline-danger' | 'outline-info';
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  asChild?: boolean;
  className?: string;
}

// Komponen Badge
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      rounded = 'md',
      asChild = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'div';

    // Variasi warna untuk badge
    const variantStyles = {
      // Solid variants
      default: 'bg-gray-100 text-gray-800',
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-500 text-white',
      success: 'bg-green-500 text-white',
      warning: 'bg-yellow-500 text-black',
      danger: 'bg-red-500 text-white',
      info: 'bg-cyan-500 text-white',
      
      // Outline variants
      'outline-default': 'border border-gray-300 text-gray-800 bg-transparent',
      'outline-primary': 'border border-blue-500 text-blue-500 bg-transparent',
      'outline-secondary': 'border border-gray-500 text-gray-500 bg-transparent',
      'outline-success': 'border border-green-500 text-green-500 bg-transparent',
      'outline-warning': 'border border-yellow-500 text-yellow-500 bg-transparent',
      'outline-danger': 'border border-red-500 text-red-500 bg-transparent',
      'outline-info': 'border border-cyan-500 text-cyan-500 bg-transparent',
    };

    // Ukuran badge
    const sizeStyles = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-2 text-base',
    };

    // Rounded badge
    const roundedStyles = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    };

    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium',
          variantStyles[variant],
          sizeStyles[size],
          roundedStyles[rounded],
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge; 