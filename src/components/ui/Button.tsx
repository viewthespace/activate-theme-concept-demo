import { ButtonBase, ButtonBaseProps } from './index';

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
  ...props 
}: ButtonBaseProps) {
  const variantStyle = variantStyles[variant][color];
  
  return (
    <ButtonBase 
      variant={variant}
      color={color}
      className={`${variantStyle} ${className}`}
      {...props}
    >
      {children}
    </ButtonBase>
  );
} 