import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../src/store';
import { useAppFonts } from '../src/hooks';
import * as SplashScreen from 'expo-splash-screen';
import { Colors } from '@/constants';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const initialize = useAuthStore((state) => state.initialize);
  const isLoading = useAuthStore((state) => state.isLoading);
  const fontsLoaded = useAppFonts();
  const [isInitialized, setIsInitialized] = useState(false);
  const [splashHidden, setSplashHidden] = useState(false);

  useEffect(() => {
    // Initialize Firebase auth state listener
    const unsubscribe = initialize();
    
    // Mark as initialized after a brief moment
    setTimeout(() => {
      setIsInitialized(true);
    }, 100);
    
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    // Only hide splash once when fonts are loaded AND auth is initialized
    if (fontsLoaded && isInitialized && !isLoading && !splashHidden) {
      SplashScreen.hideAsync()
        .then(() => {
          setSplashHidden(true);
        })
        .catch((error) => {
          // Ignore splash screen errors - it might already be hidden
          console.log('Splash screen hide error (safe to ignore):', error.message);
          setSplashHidden(true);
        });
    }
  }, [fontsLoaded, isInitialized, isLoading, splashHidden]);

  // Keep showing splash until everything is ready
  if (!fontsLoaded || !isInitialized) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade', // Use fade for smoother transitions
          animationDuration: 200, // Faster animation
          contentStyle: {
            backgroundColor: Colors.white, // Prevent white flash
          },
        }}
      >
        <Stack.Screen 
          name="index"
          options={{
            animation: 'none', // No animation for index
          }}
        />
        <Stack.Screen 
          name="(auth)"
          options={{
            animation: 'slide_from_right',
            // animationDuration: 250,
          }}
        />
        <Stack.Screen 
          name="(tabs)"
          options={{
            animation: 'fade',
            // animationDuration: 200,
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});