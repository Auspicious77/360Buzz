/**
 * Color palette for the application
 * Update these colors based on the Figma design system
 */
export const Colors = {
  // Primary Colors
  primary: '#FF7700',
  primaryDark: '#FA4700',
  primaryLight: '#FF7700',
  
  // Secondary Colors
  secondary: '#5856D6',
  secondaryDark: '#3634A3',
  secondaryLight: '#8E8DFF',
  
  // Neutral Colors
  background: '#FFFFFF',
  surface: '#F5F5F5',
  card: '#FFFFFF',
  
  // Text Colors
  text: '#000000',
  textSecondary: '#6C6C70',
  textTertiary: '#AEAEB2',
  
  // Status Colors
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#007AFF',
  
  // Border Colors
  border: '#E5E5EA',
  divider: '#C6C6C8',
  
  // Other
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  dark: '#212121ff',
  overlay: 'rgba(0, 0, 0, 0.5)',
} as const;

export type ColorKey = keyof typeof Colors;
