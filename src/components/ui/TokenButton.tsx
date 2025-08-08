import React from 'react';
import clsx from 'clsx';

type ButtonVariant = 'solid' | 'outlined';
type ButtonColor = 'primary' | 'secondary';

interface TokenButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  solid: {
    primary: 'bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color)]/90 text-white border border-[var(--primary-color)]/20 hover:border-[var(--primary-color)]/40 hover:shadow-lg hover:shadow-[var(--primary-color)]/25 font-semibold',
    secondary: 'bg-gradient-to-r from-[var(--secondary-color)] to-[var(--secondary-color)]/90 text-white border border-[var(--secondary-color)]/20 hover:border-[var(--secondary-color)]/40 hover:shadow-lg hover:shadow-[var(--secondary-color)]/25 font-semibold',
  },
  outlined: {
    primary: 'bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl text-[var(--primary-color)] border-2 border-[var(--primary-color)]/60 hover:bg-gradient-to-br hover:from-[var(--primary-color)]/10 hover:to-[var(--primary-color)]/5 hover:border-[var(--primary-color)] hover:shadow-lg hover:shadow-[var(--primary-color)]/20',
    secondary: 'bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl text-[var(--secondary-color)] border-2 border-[var(--secondary-color)]/60 hover:bg-gradient-to-br hover:from-[var(--secondary-color)]/10 hover:to-[var(--secondary-color)]/5 hover:border-[var(--secondary-color)] hover:shadow-lg hover:shadow-[var(--secondary-color)]/20',
  },
};

export function TokenButton({ 
  variant = 'solid', 
  color = 'primary', 
  children, 
  className = '',
  ...props 
}: TokenButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-base shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95 cursor-pointer min-h-[44px]';
  const variantStyle = variantStyles[variant][color];
  
  return (
    <button 
      className={clsx(
        baseStyles,
        variantStyle,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
} 