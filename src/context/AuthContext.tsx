import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User } from '../types';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, userData: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const register = async (email: string, password: string, userData: Partial<User>) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
    const userDoc: User = {
      id: user.uid,
      email: user.email!,
      name: userData.name!,
      phone: userData.phone!,
      field: userData.field!,
      isPremium: false,
      createdAt: new Date(),
      avatar: userData.avatar
    };

    await setDoc(doc(db, 'users', user.uid), userDoc);
    setUserProfile(userDoc);

    // Store in localStorage for offline access
    localStorage.setItem('userProfile', JSON.stringify(userDoc));
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    setUserProfile(null);
    localStorage.removeItem('userProfile');
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!currentUser || !userProfile) return;

    const updatedProfile = { ...userProfile, ...updates };
    await updateDoc(doc(db, 'users', currentUser.uid), updates);
    setUserProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
  };

  const fetchUserProfile = async (user: FirebaseUser) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const profile = userDoc.data() as User;
        setUserProfile(profile);
        localStorage.setItem('userProfile', JSON.stringify(profile));
      }
    } catch (error) {
      // Try to load from localStorage if offline
      const cached = localStorage.getItem('userProfile');
      if (cached) {
        setUserProfile(JSON.parse(cached));
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserProfile(user);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Load cached profile on mount
  useEffect(() => {
    const cached = localStorage.getItem('userProfile');
    if (cached && !userProfile) {
      setUserProfile(JSON.parse(cached));
    }
  }, []);

  const value: AuthContextType = {
    currentUser,
    userProfile,
    login,
    register,
    logout,
    updateUserProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};