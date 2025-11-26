import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet, TextStyle } from 'react-native';

type FontWeight = 'thin' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'black';

type TypographyVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'body' 
  | 'bodySmall' 
  | 'caption' 
  | 'button' 
  | 'link';

interface TypographyProps extends RNTextProps {
  variant?: TypographyVariant;
  weight?: FontWeight;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  children: React.ReactNode;
}

const fontFamilyMap: Record<FontWeight, string> = {
  thin: 'DMSans-Thin',
  light: 'DMSans-Light',
  regular: 'DMSans-Regular',
  medium: 'DMSans-Medium',
  semibold: 'DMSans-SemiBold',
  bold: 'DMSans-Bold',
  black: 'DMSans-Black',
};

const variantStyles: Record<TypographyVariant, TextStyle> = {
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: fontFamilyMap.bold,
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: fontFamilyMap.bold,
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
    fontFamily: fontFamilyMap.semibold,
  },
  h4: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: fontFamilyMap.semibold,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fontFamilyMap.regular,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fontFamilyMap.regular,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fontFamilyMap.regular,
  },
  button: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fontFamilyMap.bold,
  },
  link: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fontFamilyMap.semibold,
    textDecorationLine: 'underline',
  },
};

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  weight,
  color,
  align,
  style,
  children,
  ...props
}) => {
  const variantStyle = variantStyles[variant];
  
  const customStyle: TextStyle = {
    ...(weight && { fontFamily: fontFamilyMap[weight] }),
    ...(color && { color }),
    ...(align && { textAlign: align }),
  };

  return (
    <RNText
      style={[variantStyle, customStyle, style]}
      {...props}
    >
      {children}
    </RNText>
  );
};

// Convenience components for common use cases
export const Heading1: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h1" {...props} />
);

export const Heading2: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h2" {...props} />
);

export const Heading3: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h3" {...props} />
);

export const Heading4: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h4" {...props} />
);

export const BodyText: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="body" {...props} />
);

export const SmallText: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="bodySmall" {...props} />
);

export const Caption: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="caption" {...props} />
);

export const ButtonText: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="button" {...props} />
);

export const LinkText: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="link" {...props} />
);
