import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, User, LoginCredentials, RegisterCredentials } from '../types';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

interface AuthStore extends AuthState {
  initialize: () => () => void;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<User>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,

      // Actions
      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },

      setToken: (token) => {
        set({ token });
      },

      setLoading: (isLoading) => {
        set({ isLoading });
      },

      initialize: () => {
        console.log('Initializing auth listener...');
        
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: any) => {
          console.log('Auth state changed:', firebaseUser ? 'User logged in' : 'User logged out');
          
          if (firebaseUser) {
            try {
              const userDocRef = doc(db, 'users', firebaseUser.uid);
              const userDoc = await getDoc(userDocRef);
              
              if (userDoc && userDoc.exists()) {
                const userData = userDoc.data();
                const token = await firebaseUser.getIdToken();
                
                const user: User = {
                  id: firebaseUser.uid,
                  email: userData.email,
                  fullName: userData.fullName,
                  companyName: userData.companyName,
                  websiteUrl: userData.websiteUrl || '',
                  phone: userData.phone,
                  country: userData.country,
                  avatar: userData.avatar,
                  createdAt: userData.createdAt,
                };
                
                console.log('User data loaded:', user.email);
                
                set({
                  user,
                  token,
                  isAuthenticated: true,
                  isLoading: false,
                });
              } else {
                console.log('User document not found');
                set({
                  user: null,
                  token: null,
                  isAuthenticated: false,
                  isLoading: false,
                });
              }
            } catch (error: any) {
              console.log('Error fetching user data:', error);
              
              if (error?.code === 'unavailable' || error?.message?.includes('offline')) {
                const token = await firebaseUser.getIdToken();
                set({
                  user: get().user || {
                    id: firebaseUser.uid,
                    email: firebaseUser.email || '',
                    fullName: firebaseUser.displayName || 'User',
                    companyName: '',
                    websiteUrl: '',
                    phone: '',
                    country: '',
                    createdAt: new Date().toISOString(),
                  },
                  token,
                  isAuthenticated: true,
                  isLoading: false,
                });
              } else {
                set({
                  user: null,
                  token: null,
                  isAuthenticated: false,
                  isLoading: false,
                });
              }
            }
          } else {
            console.log('No authenticated user');
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }
        });
        
        return unsubscribe;
      },

      login: async (credentials: LoginCredentials) => {
        try {
          set({ isLoading: true });
          
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );
          
          console.log('Sign in successful, user UID:', userCredential.user.uid);
          
          const userDocRef = doc(db, 'users', userCredential.user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (!userDoc.exists()) {
            console.error('User document not found in Firestore');
            throw new Error('User data not found in database. Please contact support.');
          }
          
          const userData = userDoc.data();
          const token = await userCredential.user.getIdToken();
          
          const user: User = {
            id: userCredential.user.uid,
            email: userData.email || userCredential.user.email || '',
            fullName: userData.fullName || '',
            companyName: userData.companyName || '',
            websiteUrl: userData.websiteUrl || '',
            phone: userData.phone || '',
            country: userData.country || '',
            avatar: userData.avatar,
            createdAt: userData.createdAt || new Date().toISOString(),
          };
          
          console.log('Login successful, setting user state:', user);
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          console.error('Login error:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (credentials: RegisterCredentials) => {
        try {
          set({ isLoading: true });
          
          console.log('Creating Firebase auth user...');
          
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );
          
          console.log('Firebase user created with UID:', userCredential.user.uid);
          
          const userData: Omit<User, 'id'> = {
            email: credentials.email,
            fullName: credentials.fullName,
            companyName: credentials.companyName,
            websiteUrl: credentials.websiteUrl || '',
            phone: credentials.phone,
            country: credentials.country,
            createdAt: new Date().toISOString(),
          };
          
          console.log('Saving user data to Firestore:', userData);
          
          const userDocRef = doc(db, 'users', userCredential.user.uid);
          await setDoc(userDocRef, userData, { merge: true });
          
          console.log('User data saved to Firestore successfully');
          
          const token = await userCredential.user.getIdToken();
          
          const user: User = {
            id: userCredential.user.uid,
            ...userData,
          };
          
          console.log('Registration complete - returning user without updating store');
          
          // DON'T update the store yet - just return the user data
          // The store will remain unauthenticated until we manually set it
          set({ isLoading: false });
          
          // Return the user data so the registration screen can show success modal
          return user;
        } catch (error: any) {
          console.error('Registration error:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });
          
          await signOut(auth);
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        } catch (error) {
          console.error('Logout error:', error);
          set({ isLoading: false });
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);