import React from 'react';
import { useTheme } from '../../hooks/useTheme';

type ButtonVariant = 'solid' | 'outlined';
type ButtonColor = 'primary' | 'secondary';

interface ThemeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  children: React.ReactNode;
  className?: string;
}

export function ThemeButton({ 
  variant = 'solid', 
  color = 'primary', 
  children, 
  className = '',
  ...props 
}: ThemeButtonProps) {
  const { theme } = useTheme();
  
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-base shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95 cursor-pointer min-h-[44px]';
  
  // Get the appropriate color based on the color prop
  const themeColor = color === 'primary' ? theme.primaryColor : theme.secondaryColor;
  
  // Generate styles based on variant and color
  const getVariantStyles = () => {
    if (variant === 'solid') {
      return {
        background: `linear-gradient(to right, ${themeColor}, ${themeColor}E6)`,
        color: '#ffffff',
        border: `1px solid ${themeColor}33`,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      };
    } else {
      return {
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(8px)',
        color: themeColor,
        border: `2px solid ${themeColor}99`,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      };
    }
  };
  
  const variantStyles = getVariantStyles();
  
  return (
    <button 
      className={`${baseStyles} ${className}`}
      style={variantStyles}
      onMouseEnter={(e) => {
        if (variant === 'outlined') {
          e.currentTarget.style.borderColor = themeColor;
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'outlined') {
          e.currentTarget.style.borderColor = `${themeColor}99`;
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
} 