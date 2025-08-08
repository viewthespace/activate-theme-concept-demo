import React from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'solid' | 'outlined';
export type ButtonColor = 'primary' | 'secondary';

export interface ButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  children: React.ReactNode;
  className?: string;
}

export const buttonBaseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-base shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95 cursor-pointer min-h-[44px]';

export function ButtonBase({ 
  variant = 'solid', 
  color = 'primary', 
  children, 
  className = '',
  type = 'button',
  ...props 
}: ButtonBaseProps) {
  return (
    <button 
      type={type}
      className={clsx(buttonBaseStyles, className)}
      {...props}
    >
      {children}
    </button>
  );
} 