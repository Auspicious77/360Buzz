import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBcbZrE__wsBfhqUY4S__5N71QEMV4w8aE",
  authDomain: "remoting-67217.firebaseapp.com",
  projectId: "remoting-67217",
  storageBucket: "remoting-67217.firebasestorage.app",
  messagingSenderId: "731804418402",
  appId: "1:731804418402:web:6fb09dbdbe1e06a7742c3b",
};

// Init app
const app = initializeApp(firebaseConfig);

// 👇 **THIS is the correct way for React Native Firebase Auth**
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firestore
export const db = getFirestore(app);

export default app;
