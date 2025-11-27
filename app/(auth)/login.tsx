import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthTextInput, Snackbar, Typography, SmallText, ButtonText, Caption } from '../../src/components';
import { useAuthStore } from '../../src/store';
import { validateLoginForm, parseFirebaseError } from '../../src/utils';
import { useSnackbar } from '../../src/hooks';
import { Colors } from '../../src/constants';
import { Ionicons } from '@expo/vector-icons';

const REMEMBER_ME_KEY = '@remember_me';
const SAVED_EMAIL_KEY = '@saved_email';
const SAVED_PASSWORD_KEY = '@saved_password';

interface SavedCredentials {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const { snackbar, showError, showSuccess, hideSnackbar } = useSnackbar();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoadingCredentials, setIsLoadingCredentials] = useState(true);

  // Load saved credentials on mount
  useEffect(() => {
    loadSavedCredentials();
  }, []);

  const loadSavedCredentials = async () => {
    try {
      const [savedRememberMe, savedEmail, savedPassword] = await Promise.all([
        AsyncStorage.getItem(REMEMBER_ME_KEY),
        AsyncStorage.getItem(SAVED_EMAIL_KEY),
        AsyncStorage.getItem(SAVED_PASSWORD_KEY),
      ]);

      if (savedRememberMe === 'true' && savedEmail && savedPassword) {
        setEmail(savedEmail);
        setPassword(savedPassword);
        setRememberMe(true);
        console.log('Loaded saved credentials');
      }
    } catch (error) {
      console.error('Error loading saved credentials:', error);
    } finally {
      setIsLoadingCredentials(false);
    }
  };

  const saveCredentials = async (email: string, password: string) => {
    try {
      await Promise.all([
        AsyncStorage.setItem(REMEMBER_ME_KEY, 'true'),
        AsyncStorage.setItem(SAVED_EMAIL_KEY, email),
        AsyncStorage.setItem(SAVED_PASSWORD_KEY, password),
      ]);
      console.log('Credentials saved');
    } catch (error) {
      console.error('Error saving credentials:', error);
    }
  };

  const clearSavedCredentials = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(REMEMBER_ME_KEY),
        AsyncStorage.removeItem(SAVED_EMAIL_KEY),
        AsyncStorage.removeItem(SAVED_PASSWORD_KEY),
      ]);
      console.log('Credentials cleared');
    } catch (error) {
      console.error('Error clearing credentials:', error);
    }
  };

  const handleLogin = async () => {
    const validationError = validateLoginForm(email, password);
    if (validationError) {
      showError(validationError);
      return;
    }

    try {
      await login({ email, password });
      
      // Save or clear credentials based on remember me
      if (rememberMe) {
        await saveCredentials(email, password);
      } else {
        await clearSavedCredentials();
      }
      
      showSuccess('Login successful!');
      router.replace('/(tabs)');
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = parseFirebaseError(error);
      showError(errorMessage);
    }
  };

  // Show loading state while checking for saved credentials
  if (isLoadingCredentials) {
    return (
      <LinearGradient
        colors={['#1A0A00', '#4D2600', '#FF6B00']}
        style={styles.wrapper}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <View style={styles.loadingContainer}>
          <Image
            source={require('../../assets/Buzzlogo2.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </LinearGradient>
    );
  }

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
          <Typography variant="h2" color="#FFFFFF" align="left" style={styles.loginTitle}>
            Login Account
          </Typography>
          <SmallText color="#787878" align="left" style={styles.loginSubtitle}>
            Please login into your account
          </SmallText>
        </View>

        {/* Form Container */}
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

          <View style={styles.optionsRow}>
            {/* Remember Me Checkbox */}
            <TouchableOpacity
              style={styles.rememberMeContainer}
              onPress={() => setRememberMe(!rememberMe)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <SmallText color="#FFFFFF" style={styles.rememberMeText}>
                Remember Me
              </SmallText>
            </TouchableOpacity>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPassword}>
              <SmallText weight="semibold" color={Colors.primary}>
                Forgot Password?
              </SmallText>
            </TouchableOpacity>
          </View>

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
            activeOpacity={0.8}
          >
            <ButtonText color="#FFFFFF">
              {isLoading ? 'Logging in...' : 'Login Account'}
            </ButtonText>
          </TouchableOpacity>

          {/* Terms */}
          <Caption color="#FFFFFF" align="center" style={styles.terms}>
            By "Login Account", you agree to the{' '}
            <Caption weight="semibold" color="#000000">Terms of Use</Caption>
            {' '}and{' '}
            <Caption weight="semibold" color="#000000">Privacy Policy</Caption>
          </Caption>
        </View>

        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <SmallText color="#FFFFFF">Don't have an account? </SmallText>
          <Link href="/(auth)/register" asChild>
            <TouchableOpacity>
              <SmallText weight="bold" color="#FFFFFF" style={styles.createAccountText}>
                Create Account
              </SmallText>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 230,
    height: 70,
  },
  formContainer: {
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
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
  },
  rememberMeText: {
    marginLeft: 4,
  },
  forgotPassword: {
    // No additional styles needed
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
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
    gap: 16,
  },
  socialButton: {
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