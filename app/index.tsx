import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { SplashScreen } from '../src/components';
import { useAuthStore } from '../src/store';

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, user, isLoading, skipRedirect } = useAuthStore();
  const [showSplash, setShowSplash] = useState(true);
  const [hasRedirected, setHasRedirected] = useState(false);

  console.log('Index render - isAuthenticated:', isAuthenticated, 'user:', user, 'isLoading:', isLoading, 'skipRedirect:', skipRedirect);

  useEffect(() => {
    // Skip redirect if user just registered (success modal should show first)
  

    // Redirect after splash is finished and auth check is complete
    if (!showSplash && !isLoading && !hasRedirected) {
      const redirect = () => {
        if (isAuthenticated && user) {
          console.log('User authenticated, redirecting to dashboard');
          setHasRedirected(true);
          router.replace('/(tabs)');
        } else {
          console.log('User not authenticated, redirecting to login');
          setHasRedirected(true);
          router.replace('/(auth)/login');
        }
      };

      // Small delay to ensure smooth transition
      const timer = setTimeout(redirect, 100);
      return;
    }
  }, [showSplash, isAuthenticated, user, isLoading, hasRedirected, skipRedirect, router]);

  const handleSplashFinish = () => {
    console.log('Splash screen finished');
    setShowSplash(false);
  };

  // Show splash screen while loading or waiting for auth
  if (showSplash || isLoading || hasRedirected) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return null;
}