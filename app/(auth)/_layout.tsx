import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuthStore } from '../../src/store';

export default function AuthLayout() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  // Don't redirect here - let index.tsx handle it
  // This prevents double navigation and white flashes

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 250,
        contentStyle: {
          backgroundColor: '#1A0A00', // Match your gradient start color
        },
      }}
    >
      <Stack.Screen 
        name="login"
        options={{
          animation: 'fade',
        }}
      />
      <Stack.Screen 
        name="register"
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack>
  );
}