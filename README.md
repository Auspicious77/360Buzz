# React Native Developer Assessment

A professional mobile application built with React Native, Expo Router, and Firebase for the remoting.work developer assessment.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- iOS Simulator (Mac) or Android Studio
- Expo Go app (optional)

### Installation & Setup

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd remoting-work-assessment
   npm install
   ```

2. **Firebase Configuration**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password) and Firestore Database
   - Create a `firebase.ts` file in `src/config/`:
   ```typescript
   import { initializeApp } from 'firebase/app';
   import { getAuth } from 'firebase/auth';
   import { getFirestore } from 'firebase/firestore';

   const firebaseConfig = {
   apiKey: "AIzaSyBcbZrE__wsBfhqUY4S__5N71QEMV4w8aE",
   authDomain: "remoting-67217.firebaseapp.com",
   projectId: "remoting-67217",
   storageBucket: "remoting-67217.firebasestorage.app",
   messagingSenderId: "731804418402",
   appId: "1:731804418402:web:6fb09dbdbe1e06a7742c3b",
   };

   export const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   export const db = getFirestore(app);
   ```

3. **Start the app**
   ```bash
   npm start
   ```
   
   Then press:
   - `i` for iOS simulator
   - `a` for Android emulator  
   - Scan QR code with Expo Go for physical device

### Demo Credentials
```
Email: demo@example.com
Password: demo12345
```

## 🏗️ Architecture

### Tech Stack
- **Frontend:** React Native 0.81.5 + Expo SDK 54
- **Backend:** Firebase (Auth + Firestore)
- **Navigation:** Expo Router (File-based)
- **State Management:** Zustand
- **Language:** TypeScript

### Key Libraries
- `firebase/auth` - User authentication
- `firebase/firestore` - Real-time database
- `expo-router` - Navigation
- `zustand` - State management
- `async-storage` - Local persistence

### Project Structure
```
app/
├── (auth)/           # Login/Register screens
├── (tabs)/           # Main app tabs
└── _layout.tsx       # Root layout
src/
├── components/       # Reusable UI components
├── services/         # Firebase API calls
├── store/           # Zustand state
├── types/           # TypeScript definitions
└── config/          # Firebase configuration
```

## 🔥 Firebase Integration

### Authentication
- Email/password authentication
- Automatic session persistence
- Protected routes based on auth state

### Database (Firestore)
- Real-time data synchronization
- Structured collections for:
  - Users
  

### Services Layer
```typescript
// Example service
export const authService = {
  login: (email: string, password: string) => 
    signInWithEmailAndPassword(auth, email, password),
  
  register: (email: string, password: string) => 
    createUserWithEmailAndPassword(auth, email, password),
};
```

## 📱 Features

- **Authentication** - Secure login/register with Firebase Auth
- **Dashboard** - Overview of jobs and interviews
- **Job Management** - Post and manage job listings
- **Interview Scheduling** - Schedule and track interviews
- **Team Management** - Manage team members
- **Real-time Updates** - Live data with Firestore

## ⚠️ Assumptions & Limitations

### Assumptions
- Firebase project is properly configured
- Users have stable internet connection for real-time features
- App targets modern iOS/Android devices

### Current Limitations
- Offline functionality is limited
- Image upload uses base64 (consider Firebase Storage for production)
- Basic error handling (enhance for production)

## 🛠️ Build & Deployment

### Development Build
```bash
npm run android    # Android emulator
npm run ios        # iOS simulator (Mac only)
```

### Production Build
```bash
# Install EAS
npm install -g eas-cli

# Build APK/IPA
eas build --platform android --profile preview
eas build --platform ios --profile preview
```

## 📞 Support

For assessment review or questions, please contact the developer.

---

**Built for:** remoting.work React Native Developer Assessment  
**Technologies:** React Native, Expo, Firebase, TypeScript


### Here are the screenshots
### Authentication Screens
<p float="left">
  <img src="./assets/screenshots/1.png" width="250" />
  <img src="./assets/screenshots/2.png" width="250" />
  <img src="./assets/screenshots/3.png" width="250" />
  <img src="./assets/screenshots/6.png" width="250" />
  <img src="./assets/screenshots/10.png" width="250" />
</p>

### Main Application Screens
<p float="left">
  <img src="./assets/screenshots/4.png" width="250" />
  <img src="./assets/screenshots/5.png" width="250" />
  <img src="./assets/screenshots/8.png" width="250" />
  <img src="./assets/screenshots/9.png" width="250" />
</p>

## 🎥 Demo Video

### App Walkthrough
https://www.loom.com/share/fab18098ec8c4a5d8c0e2b3d01d7271e