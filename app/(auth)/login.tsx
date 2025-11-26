import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, Link } from 'expo-router';
import { AuthTextInput, Snackbar, Typography, SmallText, ButtonText, Caption } from '../../src/components';
import { useAuthStore } from '../../src/store';
import { validateLoginForm, parseFirebaseError } from '../../src/utils';
import { useSnackbar } from '../../src/hooks';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '../../src/constants';

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading, isAuthenticated } = useAuthStore();
  const { snackbar, showError, showSuccess, hideSnackbar } = useSnackbar();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Redirect to tabs when authenticated
  useEffect(() => {
    if (isLoggingIn && !isLoading && isAuthenticated) {
      console.log('Login completed, redirecting to dashboard');
      showSuccess('Login successful!');
      setTimeout(() => {
        router.replace('/(tabs)');
        setIsLoggingIn(false);
      }, 500);
    }
  }, [isLoggingIn, isLoading, isAuthenticated]);

  const handleLogin = async () => {
    // Validate form
    const validationError = validateLoginForm(email, password);
    if (validationError) {
      showError(validationError);
      return;
    }

    try {
      setIsLoggingIn(true);
      await login({ email, password });
    } catch (error: any) {
      console.error('Login error:', error);
      setIsLoggingIn(false);
      const errorMessage = parseFirebaseError(error);
      showError(errorMessage);
    }
  };

  return (
    <LinearGradient
      colors={['#1A0A00', '#4D2600', '#FF6B00']}
      style={styles.wrapper}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/Buzzlogo2.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View>
          <Typography variant="h2" color="#FFFFFF" align="left" style={styles.loginTitle}>Login Account</Typography>
          <SmallText color="#787878" align="left" style={styles.loginSubtitle}>Please login into your account</SmallText>
        </View>

        {/* Form Container with White Background */}
        <View style={styles.formContainer}>
          <AuthTextInput
          backgroundColor='#FFFFFF'
            icon="mail-outline"
            placeholder="steve.young@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <AuthTextInput
            icon="lock-closed-outline"
            isPassword
             backgroundColor='#FFFFFF'
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.forgotPassword}>
            <SmallText weight="semibold" color={Colors.primary}>Forgot Password?</SmallText>
          </TouchableOpacity>

          <View style={styles.row}>
            <TouchableOpacity style={styles.socialButton}>
              <Image style={styles.image} source={require('../../assets/google.png')}/>
            </TouchableOpacity>

             <TouchableOpacity style={styles.socialButton}>
              <Image style={styles.image} source={require('../../assets/facebook.png')}/>
            </TouchableOpacity>

             <TouchableOpacity style={styles.socialButton}>
              <Image style={styles.image} source={require('../../assets/apple.png')}/>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <ButtonText color="#FFFFFF">
              {isLoading ? 'Logging in...' : 'Login Account'}
            </ButtonText>
          </TouchableOpacity>

          {/* Terms */}
          <Caption color="#FFFFFF" align="center"  style={styles.terms}>
            By "Login Account", you agree to the{' '}
            <Caption weight="semibold" color="#000000">Terms of Use</Caption>
            {' '}and{' '}
            <Caption weight="semibold" color="#000000">Privacy Policy</Caption>
          </Caption>
        </View>

        {/* Sign Up Link at Bottom */}
        <View style={styles.signupContainer}>
          <SmallText color="#FFFFFF">Don't have an account? </SmallText>
          <Link href="/(auth)/register" asChild>
            <TouchableOpacity>
              <SmallText weight="bold" color="#FFFFFF" style={styles.createAccountText}>Create Account</SmallText>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>

      <Snackbar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        onDismiss={hideSnackbar}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  logoContainer: {
    // alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 230,
    height: 70,
  },
  formContainer: {
    // backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 0,
    marginBottom: 24,
  },
  loginTitle: {
    marginBottom: 8,
  },
  loginSubtitle: {
    marginBottom: 32,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  terms: {
    lineHeight: 18,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 40,
  },
  createAccountText: {
    textDecorationLine: 'underline',
  },
  row:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
    gap: 16,
  },
  socialButton:{
    // width: 50,
    // height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E7E7E7',
    paddingHorizontal: 40,
    paddingVertical: 14,
  },
  image: {
    width: 24,
    height: 24, 
  }
});