import { useTheme } from '../../hooks/useTheme';
import { ButtonBase, ButtonBaseProps } from './index';

export function ThemeButton({ 
  variant = 'solid', 
  color = 'primary', 
  children, 
  className = '',
  ...props 
}: ButtonBaseProps) {
  const { theme } = useTheme();
  
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
    <ButtonBase 
      variant={variant}
      color={color}
      className={className}
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
    </ButtonBase>
  );
} 