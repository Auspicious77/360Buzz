# Quick Start Guide

## Prerequisites Check

Before starting, ensure you have:
- [ ] Node.js 18+ installed
- [ ] npm or yarn installed
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

## Installation (5 minutes)

### Step 1: Clone & Install
```bash
git clone <your-repo-url>
cd remoting-work-assessment
npm install
```

### Step 2: Start Development Server
```bash
npm start
```

This will open Expo DevTools in your browser.

### Step 3: Run the App

#### Option A: Physical Device (Recommended)
1. Install "Expo Go" app on your iOS or Android device
2. Scan the QR code from the terminal/browser
3. App will load on your device

#### Option B: iOS Simulator (Mac only)
```bash
npm run ios
```

#### Option C: Android Emulator
```bash
npm run android
```

#### Option D: Web Browser
```bash
npm run web
```

## First Time Setup

When you first open the app:
1. You'll see a loading screen briefly
2. You'll be redirected to the Login screen
3. Enter any email and password (min 8 chars)
4. Click "Sign In"
5. You'll be logged in and see the Home screen

### Test Credentials
```
Email: demo@example.com
Password: password123
```

## Navigation Guide

### Authentication Screens
- **Login** - Sign in to your account
- **Register** - Create a new account

### Main App (After Login)
- **Home Tab** 🏠 - Dashboard and welcome screen
- **Explore Tab** 🔍 - Browse topics and categories
- **Profile Tab** 👤 - User profile and settings

## Common Commands

```bash
# Start dev server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Type checking
npm run type-check

# Clear cache
npm run clean
```

## Troubleshooting

### Problem: "Unable to resolve module"
**Solution:** Clear cache and reinstall
```bash
rm -rf node_modules
npm install
npm start -- --clear
```

### Problem: Metro bundler issues
**Solution:** Reset Metro bundler
```bash
npm start -- --reset-cache
```

### Problem: Port already in use
**Solution:** Kill the process or use a different port
```bash
lsof -ti:8081 | xargs kill -9
npm start
```

### Problem: TypeScript errors
**Solution:** Check types
```bash
npm run type-check
```

## Development Tips

1. **Hot Reload**: Changes auto-refresh in the app
2. **Debug Menu**: Shake your device or press `Cmd+D` (iOS) / `Cmd+M` (Android)
3. **Logs**: Check terminal for console.log output
4. **Errors**: Red screen shows errors - check terminal for details

## Next Steps

1. ✅ Install and run the app
2. ✅ Explore all screens
3. ✅ Test authentication flow
4. ✅ Check different tabs
5. ✅ Read the README.md for detailed docs

## Need Help?

- **Documentation:** See README.md
- **Architecture:** See DESIGN.md
- **Issues:** Create a GitHub issue
- **Contact:** [Your Email]

## Building for Production

### Android APK
```bash
npm install -g eas-cli
eas build --platform android --profile preview
```

### iOS IPA
```bash
eas build --platform ios --profile preview
```

### Web Build
```bash
npm run web
npx expo export:web
```

## Resources

- [Expo Documentation](https://docs.expo.dev)
- [Expo Router Docs](https://expo.github.io/router/docs)
- [React Native Docs](https://reactnative.dev)
- [Zustand Docs](https://zustand-demo.pmnd.rs)

---

**Ready to go!** 🚀 Run `npm start` and start developing!
