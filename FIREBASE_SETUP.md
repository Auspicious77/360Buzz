# Firebase Authentication Setup Guide

## Project Details
- Project ID: `remoting-67217`
- Project Number: `731804418402`
- Service Account: `firebase-adminsdk-fbsvc@remoting-67217.iam.gserviceaccount.com`

## Setup Steps

### 1. Get Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project `remoting-67217`
3. Go to Project Settings > General
4. Scroll to "Your apps" section
5. Click "Add app" and select Web (</>) if not already created
6. Copy the Firebase configuration values

### 2. Update Firebase Config
Update `/src/config/firebase.ts` with your actual values:
```typescript
const firebaseConfig = {
  apiKey: "AIzaSyBcbZrE__wsBfhqUY4S__5N71QEMV4w8aE",
  authDomain: "remoting-67217.firebaseapp.com",
  projectId: "remoting-67217",
  storageBucket: "remoting-67217.firebasestorage.app",
  messagingSenderId: "731804418402",
  appId: "1:731804418402:web:6fb09dbdbe1e06a7742c3b "
};
```

### 3. Enable Authentication Methods
1. In Firebase Console, go to Authentication > Sign-in method
2. Enable:
   - Email/Password
   - Google
   - Apple (for iOS)

### 4. Configure Google Sign-In
1. In Firebase Console > Authentication > Sign-in method > Google
2. Enable Google sign-in
3. Copy the Web Client ID
4. Update `/src/services/authService.ts`:
```typescript
GoogleSignin.configure({
  webClientId: '731804418402-aj2p602m27bij0qiv097ocg3k9ivcqqm.apps.googleusercontent.com',
});
```

### 5. Configure Apple Sign-In (iOS only)
1. In Firebase Console > Authentication > Sign-in method > Apple
2. Enable Apple sign-in
3. Follow Apple Developer setup instructions
4. Add capability in Xcode: Signing & Capabilities > + Capability > Sign in with Apple

### 6. Update app.json for Social Auth
Add to `app.json`:
```json
{
  "expo": {
    "ios": {
      "googleServicesFile": "./GoogleService-Info.plist",
      "bundleIdentifier": "com.remotingwork.assessment",
      "config": {
        "googleSignIn": {
          "reservedClientId": "1:731804418402:ios:83ed3e6c1279885b742c3b"
        }
      }
    },
    "android": {
      "googleServicesFile": "./google-services.json",
      "package": "com.remotingwork.assessment"
    }
  }
}
```

### 7. Download Configuration Files
- iOS: Download `GoogleService-Info.plist` from Firebase Console
- Android: Download `google-services.json` from Firebase Console
- Place both files in your project root

## Features Implemented

✅ Firebase Authentication integration
✅ Email/Password sign-up and sign-in
✅ Google Sign-In
✅ Apple Sign-In (iOS)
✅ Persistent authentication state (Zustand + AsyncStorage)
✅ Professional UI matching design mockups
✅ Success screen after registration
✅ Snackbar notifications for errors/success
✅ Password visibility toggle
✅ Form validation

## Package Installation

All packages have been installed using yarn:
```bash
yarn add firebase @react-native-google-signin/google-signin expo-apple-authentication
yarn add expo-build-properties react-native-worklets
```

## Important: Development Build Required

**Google Sign-In and Apple Sign-In require a development build and will NOT work in Expo Go.**

To test social authentication:

1. **Create a development build:**
   ```bash
   npx expo prebuild
   npx expo run:ios    # For iOS
   npx expo run:android  # For Android
   ```

2. **Or use EAS Build:**
   ```bash
   eas build --profile development --platform ios
   eas build --profile development --platform android
   ```

## Testing

### In Expo Go (Limited):
1. Run: `yarn expo start` or `npx expo start`
2. ✅ Test email/password authentication
3. ❌ Google/Apple sign-in will show error message (requires dev build)

### In Development Build (Full Features):
1. Build and run the development build (see above)
2. ✅ Test email/password authentication
3. ✅ Test Google sign-in
4. ✅ Test Apple sign-in (on iOS device/simulator)
5. ✅ Verify persistence by closing and reopening the app

## Troubleshooting

If you encounter issues:
- Ensure all Firebase configuration values are correct
- Check that authentication methods are enabled in Firebase Console
- Verify Google/Apple credentials are properly configured
- Check Expo logs for specific error messages
