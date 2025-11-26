import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography, Heading1, BodyText, SmallText, ButtonText } from './Typography';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '../constants';

interface SuccessScreenProps {
  visible: boolean;
  title?: string;
  message?: string;
  subtitle?: string;
  buttonText?: string;
  onContinue?: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  visible,
  title = 'Congratulations!',
  message = 'You have created your Account',
  subtitle = "Let's start to exploring your experience",
  buttonText = 'Proceed to Dashboard',
  onContinue,
}) => {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={[styles.container, styles.overlay]}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.iconOuter}>
            <View style={styles.iconInner}>
              <View style={styles.checkContainer}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        <Heading1 style={styles.title}>{title}</Heading1>
        <BodyText style={styles.message}>{message}</BodyText>
        <SmallText color="#666666" align="center" style={styles.subtitle}>{subtitle}</SmallText>

        <TouchableOpacity 
          style={styles.button}
          onPress={onContinue || (() => {})}
        >
          <ButtonText color="#FFFFFF">{buttonText}</ButtonText>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  iconContainer: {
    marginBottom: 48,
  },
  iconOuter: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#FFE5D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 50,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  title: {
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 48,
  },
  button: {
    backgroundColor: '#FF6B00',
    borderRadius: 12,
    height: 56,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
});
