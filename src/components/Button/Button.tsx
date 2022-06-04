import React from 'react';
import {Button} from '@mui/material';

interface ButtonProps {
  /**
   * color of the button
   */
  variant?: 'text' | 'contained' | 'outlined';
  /**
   * What background color to use
   */
  color?: 'success' | 'error' | 'warning' | 'primary';
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label?: string;
  /**
   * Optional click handler
   */
  onClick?: any;
  /**
   * Optional extra styles added to the button
   */
  styles?: object;
  /**
   * Optional button disabed property.
   * False by default
   */
  disabled?: boolean;
}

/**
 * Primary UI component for user interaction
 */
const CustomButton: React.FC<ButtonProps> = ({
  size = 'medium',
  color = 'primary',
  variant = 'contained',
  label,
  onClick,
  disabled = false,
  styles,
  ...props
}: ButtonProps) => {
  return (
    <Button
      variant={variant}
      color={color}
      // disableRipple
      // disableFocusRipple
      sx={{textTransform: 'none', ...styles}}
      onClick={onClick}
      disabled={disabled}
      {...props}
      >
      {label}
    </Button>
  );
};

export default CustomButton
