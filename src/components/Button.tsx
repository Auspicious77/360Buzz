import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights, Shadows } from '../constants';
import { ButtonProps } from '../types';
import { Loader } from './Loader';
import { Heading4, SmallText } from './Typography';

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
}) => {
  const buttonStyle = [
    styles.button,
    styles[`button_${variant}` as keyof typeof styles],
    styles[`button_${size}` as keyof typeof styles],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
  ].filter(Boolean) as ViewStyle[];

  const textStyle = [
    styles.text,
    styles[`text_${variant}` as keyof typeof styles],
    styles[`text_${size}` as keyof typeof styles],
    disabled && styles.textDisabled,
  ].filter(Boolean) as TextStyle[];

  const getLoaderColor = () => {
    if (variant === 'primary' || variant === 'secondary') {
      return Colors.white;
    }
    return Colors.primary;
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <View style={styles.loaderContainer}>
          <Loader size={24} color={getLoaderColor()} />
        </View>
      ) : (
        <Heading4 style={textStyle}>{title}</Heading4>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  
  // Variants
  button_primary: {
    backgroundColor: Colors.primary,
    // ...Shadows.small,
  },
  button_secondary: {
    backgroundColor: '#F3F4F6',
    // ...Shadows.small,
  },
  button_outline: {
    backgroundColor: Colors.transparent,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  button_ghost: {
    backgroundColor: Colors.transparent,
  },
  
  // Sizes
  button_small: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    minHeight: 32,
  },
  button_medium: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    minHeight: 48,
  },
  button_large: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    minHeight: 56,
  },
  
  // States
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },
  
  // Text
  text: {
    fontWeight: FontWeights.semibold,
  },
  text_primary: {
    color: Colors.white,
  },
  text_secondary: {
    color: Colors.black,
  },
  text_outline: {
    color: Colors.primary,
  },
  text_ghost: {
    color: Colors.primary,
  },
  text_small: {
    fontSize: FontSizes.sm,
  },
  text_medium: {
    fontSize: FontSizes.md,
  },
  text_large: {
    fontSize: FontSizes.lg,
  },
  textDisabled: {
    opacity: 0.7,
  },
  loaderContainer: {
    minHeight: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
