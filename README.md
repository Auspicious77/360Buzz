# React Native Developer Assessment

A professional mobile application built with React Native, Expo Router, and TypeScript for the remoting.work developer assessment.

![Expo SDK](https://img.shields.io/badge/Expo-SDK%2054-blue)
![React Native](https://img.shields.io/badge/React%20Native-0.81.5-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Testing](#testing)
- [Build](#build)
- [Deployment](#deployment)
- [Demo](#demo)

## 🎯 Overview

This project demonstrates best practices in React Native development, featuring a clean architecture, professional UI/UX, and robust state management. The application includes authentication flows, navigation with Expo Router, and a modular component structure.

## ✨ Features

- 🔐 **Authentication System** - Complete login and registration flows
- 🧭 **Expo Router Navigation** - File-based routing with nested navigators
- 🎨 **Professional UI/UX** - Pixel-perfect design following Figma specifications
- 📱 **Responsive Design** - Adaptive layouts for different screen sizes
- 🔄 **State Management** - Zustand for efficient and scalable state handling
- 💾 **Data Persistence** - AsyncStorage integration for offline capabilities
- 🎭 **TypeScript** - Fully typed for enhanced developer experience
- 🧩 **Reusable Components** - Modular and maintainable component architecture
- 🎯 **Best Practices** - Following React Native and Expo best practices

## 🏗️ Architecture

The application follows a feature-based architecture with clear separation of concerns:

```
├── app/                    # Expo Router pages
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Main app tabs
│   └── _layout.tsx        # Root layout
├── src/
│   ├── components/        # Reusable UI components
│   ├── constants/         # App constants (colors, spacing, etc.)
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API and external services
│   ├── store/             # Zustand stores
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
└── assets/                # Images, fonts, and other assets
```

### Design Patterns

- **Component Composition** - Building complex UIs from simple components
- **Custom Hooks** - Extracting reusable logic
- **Service Layer** - Abstracting API calls and external dependencies
- **Type Safety** - Comprehensive TypeScript types throughout

## 🛠️ Tech Stack

### Core
- **React Native** 0.81.5 - Mobile framework
- **Expo SDK** 54 - Development platform
- **TypeScript** 5.9.2 - Type safety

### Navigation
- **Expo Router** 6.0.15 - File-based routing
- **React Native Screens** - Native navigation primitives
- **React Native Safe Area Context** - Safe area handling

### State Management
- **Zustand** 5.0.8 - Lightweight state management
- **AsyncStorage** - Local data persistence

### UI & Styling
- **React Native Gesture Handler** - Gesture system
- **React Native Reanimated** - Smooth animations

### Networking
- **Axios** - HTTP client for API calls

### Development Tools
- **TypeScript** - Static type checking
- **Expo CLI** - Development tooling

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Expo CLI installed globally (optional but recommended)
- iOS Simulator (Mac only) or Android Studio for emulators
- Expo Go app on your physical device (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd remoting-work-assessment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your preferred platform**
   ```bash
   # iOS (Mac only)
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

### Quick Start with Expo Go

1. Install Expo Go on your iOS or Android device
2. Run `npm start` in the project directory
3. Scan the QR code with your device's camera (iOS) or Expo Go app (Android)

## 📁 Project Structure

```
remoting-work-assessment/
├── app/
│   ├── (auth)/
│   │   ├── _layout.tsx         # Auth stack layout
│   │   ├── login.tsx           # Login screen
│   │   └── register.tsx        # Registration screen
│   ├── (tabs)/
│   │   ├── _layout.tsx         # Tabs layout
│   │   ├── home.tsx            # Home tab
│   │   ├── explore.tsx         # Explore tab
│   │   └── profile.tsx         # Profile tab
│   ├── _layout.tsx             # Root layout
│   └── index.tsx               # Entry point
├── src/
│   ├── components/
│   │   ├── Button.tsx          # Custom button component
│   │   ├── TextInput.tsx       # Custom input component
│   │   ├── Screen.tsx          # Screen wrapper component
│   │   └── index.ts            # Component exports
│   ├── constants/
│   │   ├── colors.ts           # Color palette
│   │   ├── layout.ts           # Layout constants
│   │   └── index.ts
│   ├── hooks/
│   │   └── [custom hooks]      # Reusable React hooks
│   ├── services/
│   │   ├── api.ts              # API service layer
│   │   └── index.ts
│   ├── store/
│   │   ├── authStore.ts        # Authentication state
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   └── utils/
│       ├── validation.ts       # Form validation
│       ├── format.ts           # Formatting utilities
│       └── index.ts
├── assets/                     # Images, fonts, icons
├── app.json                    # Expo configuration
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## 💻 Development

### Available Scripts

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web browser
npm run web

# Type checking
npx tsc --noEmit

# Clear cache
npx expo start --clear
```

### Environment Variables

Create a `.env` file in the root directory for environment-specific variables:

```env
API_BASE_URL=https://api.example.com
```

### Code Style

This project follows standard React Native and TypeScript conventions:
- Use functional components with hooks
- Prefer TypeScript interfaces over types
- Use async/await for asynchronous operations
- Follow the existing folder structure for new features

## 🧪 Testing

### Demo Credentials

For testing the authentication flow, use any email and password (minimum 8 characters):

```
Email: demo@example.com
Password: password123
```

**Note:** The authentication is currently mocked. Replace with actual API integration in production.

## 📦 Build

### Android APK

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build APK
eas build --platform android --profile preview
```

### iOS Build

```bash
# Build for iOS
eas build --platform ios --profile preview
```

## 🚀 Deployment

### Expo Snack

The easiest way to share your app:

1. Create a new Snack at [snack.expo.dev](https://snack.expo.dev)
2. Import your project files
3. Share the generated link

### Appetize.io

For browser-based testing:

1. Build an APK or IPA file using EAS Build
2. Upload to [appetize.io](https://appetize.io)
3. Share the generated preview link

## 📱 Demo

### Live Demo Links

- **Expo Snack:** [Coming Soon]
- **Appetize.io:** [Coming Soon]
- **APK Download:** [Coming Soon]

### Screenshots

[Add screenshots of your app here]

## 📚 Libraries Used

| Library | Purpose | Version |
|---------|---------|---------|
| expo | Development platform | ~54.0.25 |
| expo-router | File-based navigation | ~6.0.15 |
| zustand | State management | ^5.0.8 |
| axios | HTTP client | ^1.13.2 |
| @react-native-async-storage/async-storage | Local storage | ^2.2.0 |
| react-native-reanimated | Animations | ^4.1.5 |
| react-native-gesture-handler | Gesture handling | ^2.29.1 |
| react-native-safe-area-context | Safe area management | ~5.6.0 |

## 🎨 Design System

The app uses a consistent design system based on the Figma specifications:

- **Colors:** Primary, secondary, and semantic colors defined in `src/constants/colors.ts`
- **Typography:** Font sizes and weights following a type scale
- **Spacing:** 8pt grid system for consistent spacing
- **Components:** Reusable, themeable components

## 🔒 Security Considerations

- Sensitive data stored securely using AsyncStorage
- API tokens managed in the authentication store
- Input validation on all forms
- Secure password handling

## 📈 Performance Optimizations

- Lazy loading of screens with Expo Router
- Memoized components where appropriate
- Optimized list rendering with FlatList
- Efficient state management with Zustand

## 🤝 Contributing

This is an assessment project, but feedback is welcome!

## 📄 License

MIT License - feel free to use this project as a reference.

## 👤 Author

**[Your Name]**
- GitHub: [Your GitHub]
- Email: [Your Email]

## 🙏 Acknowledgments

- Figma design provided by remoting.work
- Built with Expo and React Native
- Icons and assets from [source]

## 📞 Support

For questions or issues, please reach out to [contact email]

---

**Submission Date:** November 25, 2025  
**Assessment for:** remoting.work - React Native Developer Position
