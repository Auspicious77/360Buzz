import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, Link } from 'expo-router';
import { CountryPicker } from 'react-native-country-codes-picker';
import { Ionicons } from '@expo/vector-icons';
import { AuthTextInput, Snackbar, SmallText, SuccessScreen } from '../../src/components';
import { useAuthStore } from '../../src/store';
import { parseFirebaseError } from '../../src/utils';
import { useSnackbar } from '../../src/hooks';

interface FormState {
  // Company Details
  companyName: string;
  jobTitle: string;
  firstName: string;
  lastName: string;
  // Contact Information
  phoneNumber: string;
  countryCode: string;
  countryFlag: string;
  companyEmail: string;
  websiteUrl: string;
  country: string;
  // Security
  password: string;
  confirmPassword: string;
  // Agreements
  agreeEmails: boolean;
  agreeTerms: boolean;
}

const initialFormState: FormState = {
  companyName: '',
  jobTitle: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  countryCode: '+1',
  countryFlag: '🇺🇸',
  companyEmail: '',
  websiteUrl: '',
  country: '',
  password: '',
  confirmPassword: '',
  agreeEmails: false,
  agreeTerms: false,
};

export default function RegisterScreen() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();
  const { snackbar, showError, hideSnackbar } = useSnackbar();
  
  // Consolidated form state
  const [formData, setFormData] = useState<FormState>(initialFormState);
  
  // UI states
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Update form field helper
  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const { companyName, jobTitle, firstName, lastName, companyEmail, password, confirmPassword, agreeTerms } = formData;

    if (!companyName || !jobTitle || !firstName || !lastName || !companyEmail || !password || !confirmPassword) {
      showError('Please fill in all required fields');
      return false;
    }

    if (password !== confirmPassword) {
      showError('Passwords do not match');
      return false;
    }

    if (password.length < 6) {
      showError('Password must be at least 6 characters');
      return false;
    }

    if (!agreeTerms) {
      showError('Please agree to the terms and privacy policy');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    setShowSuccess(true);
    if (!validateForm()) return;

    const { firstName, lastName, companyEmail, companyName, jobTitle, websiteUrl, countryCode, phoneNumber, country, password } = formData;
    const fullName = `${firstName} ${lastName}`.trim();

    try {
      console.log('Starting registration...');
      
      // Register user - but don't wait for auth state to update
      const response = await register({
        fullName,
        email: companyEmail,
        companyName,
        jobTitle,
        websiteUrl,
        phone: `${countryCode}${phoneNumber}`,
        country,
        password,
      });

      console.log('responseeee', response)
      
      console.log('Registration successful, showing success modal');
      
      // Show success modal immediately after registration
      setShowSuccess(true);
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = parseFirebaseError(error);
      showError(errorMessage);
    }
  };

  const handleContinue = () => {
    setShowSuccess(false);
    // Navigate to tabs after user dismisses success modal
    setTimeout(() => {
      router.replace('/(tabs)');
    }, 100);
  };

  return (
    <LinearGradient
      colors={['#1A0A00', '#1A0A00', '#4D2600', '#FF6B00']}
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
        {/* Logo & Back Button */}
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name='arrow-back' size={24} color="white" />
            <SmallText style={{ color: 'white', marginLeft: 8 }}>Back</SmallText>
          </TouchableOpacity>
          <Image
            source={require('../../assets/Buzzlogo2.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Input all your details Below</Text>
        </View>

        {/* Company Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company Details</Text>
          
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Company Name</Text>
              <AuthTextInput
                placeholder="Acme Corp"
                value={formData.companyName}
                onChangeText={(text) => updateField('companyName', text)}
                style={styles.input}
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Job Title</Text>
              <AuthTextInput
                placeholder="Recruiter"
                value={formData.jobTitle}
                onChangeText={(text) => updateField('jobTitle', text)}
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>First Name</Text>
              <AuthTextInput
                placeholder="John"
                value={formData.firstName}
                onChangeText={(text) => updateField('firstName', text)}
                autoCapitalize="words"
                style={styles.input}
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Last Name</Text>
              <AuthTextInput
                placeholder="Doe"
                value={formData.lastName}
                onChangeText={(text) => updateField('lastName', text)}
                autoCapitalize="words"
                style={styles.input}
              />
            </View>
          </View>
        </View>

        {/* Contact Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.phoneContainer}>
            <TouchableOpacity
              style={styles.countryCodeButton}
              onPress={() => setShowCountryPicker(true)}
            >
              <Text style={styles.countryCodeFlag}>{formData.countryFlag}</Text>
              <Text style={styles.countryCodeText}>{formData.countryCode}</Text>
              <Ionicons name="chevron-down" size={16} color="#666" />
            </TouchableOpacity>
            <View style={{ width: '70%' }}>
              <AuthTextInput
                placeholder="e.g., 555-123-4567"
                value={formData.phoneNumber}
                onChangeText={(text) => updateField('phoneNumber', text)}
                keyboardType="phone-pad"
                style={styles.phoneInput}
              />
            </View>
          </View>

          <Text style={styles.label}>Email Address</Text>
          <AuthTextInput
            placeholder="john.doe@example.com"
            value={formData.companyEmail}
            onChangeText={(text) => updateField('companyEmail', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <Text style={styles.label}>Website URL</Text>
          <AuthTextInput
            placeholder="https://example.com/company"
            value={formData.websiteUrl}
            onChangeText={(text) => updateField('websiteUrl', text)}
            autoCapitalize="none"
            style={styles.input}
          />

          <Text style={styles.label}>Country</Text>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setShowCountryPicker(true)}
          >
            <Text style={[styles.dropdownText, !formData.country && styles.placeholder]}>
              {formData.country || 'United States'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Security Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          
          <Text style={styles.label}>Password</Text>
          <AuthTextInput
            isPassword
            placeholder="Enter your password"
            value={formData.password}
            onChangeText={(text) => updateField('password', text)}
            style={styles.input}
          />

          <Text style={styles.label}>Confirm Password</Text>
          <AuthTextInput
            isPassword
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChangeText={(text) => updateField('confirmPassword', text)}
            style={styles.input}
          />
        </View>

        {/* Agreements */}
        <View style={styles.agreementsContainer}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => updateField('agreeEmails', !formData.agreeEmails)}
          >
            <View style={[styles.checkbox, formData.agreeEmails && styles.checkboxChecked]}>
              {formData.agreeEmails && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.agreementText}>
              I would like to receive helpful emails to stay connected with the global workforce.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => updateField('agreeTerms', !formData.agreeTerms)}
          >
            <View style={[styles.checkbox, formData.agreeTerms && styles.checkboxChecked]}>
              {formData.agreeTerms && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.agreementText}>
              Yes. I understand and agree to the remoting.work{' '}
              <Text style={styles.linkText}>Terms of Service</Text>, including the{' '}
              <Text style={styles.linkText}>User Agreement</Text> and{' '}
              <Text style={styles.linkText}>Privacy Policy</Text>.
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={[styles.signupButton, isLoading && styles.signupButtonDisabled]}
          onPress={handleRegister}
          disabled={isLoading}
        >
          <Text style={styles.signupButtonText}>
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <SmallText color="#FFFFFF">Already have an account? </SmallText>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <SmallText weight="bold" color="#FFFFFF" style={styles.createAccountText}>
                Login
              </SmallText>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Country Code Picker */}
      <CountryPicker
        lang='en'
        show={showCountryPicker}
        pickerButtonOnPress={(item) => {
          console.log('Selected country:', item?.name?.en);
          setFormData(prev => ({
            ...prev,
            countryCode: item.dial_code,
            countryFlag: item.flag,
            country: item.name.en,
          }));
          setShowCountryPicker(false);
        }}
        onBackdropPress={() => setShowCountryPicker(false)}
        style={{
          modal: {
            height: 650,
          },
        }}
      />

      <Snackbar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        onDismiss={hideSnackbar}
      />

      <SuccessScreen
        visible={showSuccess}
        title="Congratulations!"
        message="You have created your Account"
        subtitle="Let's start to exploring your experience"
        buttonText="Proceed to Dashboard"
        onContinue={handleContinue}
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
    paddingHorizontal: 16,
  },
  logoContainer: {
    alignItems: 'flex-start',
    marginTop: 50,
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end'
  },
  logo: {
    width: 200,
    height: 60,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    marginBottom: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  phoneContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  countryCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    width: '28%'
  },
  countryCodeFlag: {
    fontSize: 15,
  },
  countryCodeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  phoneInput: {
    flex: 1,
    marginBottom: 0,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 12,
    minHeight: 48,
  },
  dropdownText: {
    fontSize: 14,
    color: '#333333',
  },
  placeholder: {
    color: '#999999',
  },
  agreementsContainer: {
    paddingHorizontal: 4,
    marginBottom: 24,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FFFFFF',
  },
  checkmark: {
    color: '#FF6B00',
    fontSize: 14,
    fontWeight: '700',
  },
  agreementText: {
    flex: 1,
    fontSize: 13,
    color: '#FFFFFF',
    lineHeight: 18,
  },
  linkText: {
    color: '#FFFFFF',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  signupButton: {
    backgroundColor: '#000000',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  signupButtonDisabled: {
    opacity: 0.6,
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  bottomSpacing: {
    height: 40,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  createAccountText: {
    textDecorationLine: 'underline',
  },
});