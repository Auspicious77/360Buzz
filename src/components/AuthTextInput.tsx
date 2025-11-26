import React, { useState } from 'react';
import { View, TextInput as RNTextInput, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SmallText } from './Typography';

interface CustomTextInputProps extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  isPassword?: boolean;
  backgroundColor?: string;
}

export const AuthTextInput: React.FC<CustomTextInputProps> = ({
  icon,
  error,
  isPassword = false,
  style,
  backgroundColor,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <View style={[
        styles.inputWrapper,

        isFocused && styles.inputWrapperFocused,
        error && styles.inputWrapperError, {
          backgroundColor: backgroundColor || '#F5F5F5'
        }
      ]}>
        {icon && (
          <Ionicons 
            name={icon} 
            size={20} 
            color={isFocused ? '#FF6B00' : '#999999'} 
            style={styles.icon}
          />
        )}
        <RNTextInput
          style={[styles.input, style]}
          placeholderTextColor="#A0A0A0"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons 
              name={showPassword ? 'eye-outline' : 'eye-off-outline'} 
              size={20} 
              color="#999999"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <SmallText color="#FF3B30" style={styles.errorText}>{error}</SmallText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 10,
    height: 52,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputWrapperFocused: {
    borderColor: '#FF6B00',
    backgroundColor: '#FFFFFF',
  },
  inputWrapperError: {
    borderColor: '#FF3B30',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#000000',
    fontFamily: 'DMSans-Regular',
  },
  eyeIcon: {
    padding: 8,
  },
  errorText: {
    marginTop: 4,
    marginLeft: 4,
  },
});
