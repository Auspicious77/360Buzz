import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Image } from 'react-native';
import { Loader } from './Loader';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto dismiss after 2.5 seconds if onFinish is provided
    if (onFinish) {
      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          onFinish();
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoScale }] }]}>
        {/* 360Buzz Logo */}
        <View style={styles.logo}>
          <Image
            source={require('../../assets/buzzlogo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Loader */}
        <View style={styles.loaderContainer}>
          <Loader size={50} color="#FF6B00" />
        </View>

        {/* Loading Text */}
        <Text style={styles.loadingText}>We are almost there!</Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    marginBottom: 40,
    width: width * 0.7,
    maxWidth: 400,
  },
  logoImage: {
    width: '100%',
    height: 100,
  },
  loaderContainer: {
    marginVertical: 30,
  },
  loadingText: {
    fontSize: 18,
    color: '#6C6C70',
    fontWeight: '500',
    marginTop: 10,
  },
});
