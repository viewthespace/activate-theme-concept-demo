import React from 'react';

type ButtonVariant = 'solid' | 'outlined';
type ButtonColor = 'primary' | 'secondary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  solid: {
    primary: 'bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color)]/90 text-white border border-[var(--primary-color)]/20 hover:border-[var(--primary-color)]/40 hover:shadow-lg hover:shadow-[var(--primary-color)]/25',
    secondary: 'bg-gradient-to-r from-[var(--secondary-color)] to-[var(--secondary-color)]/90 text-white border border-[var(--secondary-color)]/20 hover:border-[var(--secondary-color)]/40 hover:shadow-lg hover:shadow-[var(--secondary-color)]/25',
  },
  outlined: {
    primary: 'bg-white/5 backdrop-blur-sm text-[var(--primary-color)] border-2 border-[var(--primary-color)]/60 hover:bg-[var(--primary-color)]/10 hover:border-[var(--primary-color)] hover:shadow-md hover:shadow-[var(--primary-color)]/20',
    secondary: 'bg-white/5 backdrop-blur-sm text-[var(--secondary-color)] border-2 border-[var(--secondary-color)]/60 hover:bg-[var(--secondary-color)]/10 hover:border-[var(--secondary-color)] hover:shadow-md hover:shadow-[var(--secondary-color)]/20',
  },
};

export function Button({ 
  variant = 'solid', 
  color = 'primary', 
  children, 
  className = '',
  type = 'button',
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-base shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95 cursor-pointer min-h-[48px]';
  const variantStyle = variantStyles[variant][color];
  
  return (
    <button 
      type={type}
      className={`${baseStyles} ${variantStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
} 