import React from 'react';
import {TextField} from '@mui/material';

interface TextFieldProps {
  /**
   * color of the button
   */
  variant?: 'outlined' | 'filled' | 'standard';
  /**
   * What background color to use
   */
  color?: 'success' | 'error' | 'warning' | 'primary';
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Text input label
   */
  label: string;
  /**
   * Text value
   */
  value?: string;
  /**
   * Optional click handler
   */
  onChange: Function;
  /**
   * is text field multiline
   */
  multiline?: boolean
  /**
   * no of rows for multiline field
   */
  rows?: number | undefined
  /**
   * Optional extra styles added to the button
   */
  styles?: object;
  inputProps?: object;
  inputLabelProps?: object;
  /**
   * Optional button disabed property.
   * False by default
   */
  disabled?: boolean;
}

/**
 * Primary UI component for user interaction
 */
const CustomTextField: React.FC<TextFieldProps> = ({
  size = 'medium',
  color = 'primary',
  variant = 'outlined',
  value = '',
  label,
  multiline = false,
  rows = 3,
  onChange,
  disabled = false,
  styles,
  inputProps,
  inputLabelProps,
  ...props
}: TextFieldProps) => {
  return (
    <TextField
      label={label}
      value={value}
      variant="standard"
      size="small"
      sx={styles}
      multiline={multiline}
      rows={rows}
      disabled={disabled}
      InputProps={inputProps}
      InputLabelProps={inputLabelProps}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
  );
};

export default CustomTextField;
