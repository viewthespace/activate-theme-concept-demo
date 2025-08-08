import clsx from 'clsx';
import { ButtonBase, ButtonBaseProps } from './index';

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
}: ButtonBaseProps) {
  const variantStyle = variantStyles[variant][color];
  
  return (
    <ButtonBase 
      variant={variant}
      color={color}
      className={clsx(variantStyle, className)}
      {...props}
    >
      {children}
    </ButtonBase>
  );
} 