import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { SplashScreen } from '../src/components';
import { useAuthStore } from '../src/store';

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuthStore();
  const [showSplash, setShowSplash] = useState(true);
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    // Wait for auth to be loaded before making navigation decision
    if (!showSplash && !isLoading && !hasNavigated) {
      console.log('Ready to navigate - Auth loaded:', isAuthenticated);
      
      setHasNavigated(true);
      
      // Use requestAnimationFrame for smoother transition
      requestAnimationFrame(() => {
        if (isAuthenticated && user) {
          console.log('Navigating to tabs');
          router.replace('/(tabs)');
        } else {
          console.log('Navigating to login');
          router.replace('/(auth)/login');
        }
      });
    }
  }, [showSplash, isLoading, hasNavigated, isAuthenticated, user]);

  const handleSplashFinish = () => {
    console.log('Splash finished');
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setShowSplash(false);
    }, 100);
  };

  // Show splash or loading indicator
  if (showSplash || isLoading || hasNavigated) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  // Fallback loading state
  return <SplashScreen onFinish={handleSplashFinish} />;
}