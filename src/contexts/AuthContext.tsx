"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string, name?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Listen for login state changes automatically
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Create or update user document in Firestore
  const createUserDocument = async (user: User, additionalData?: any) => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // Create new user document
      const { email, displayName, photoURL } = user;

      try {
        const userName = additionalData?.name || displayName || email?.split('@')[0] || 'User';

        await setDoc(userRef, {
          userId: user.uid,
          email: email || '',
          name: userName,
          phone: additionalData?.phone || '',
          photoURL: photoURL || '',
          role: 'customer',
          status: 'active',
          walletBalance: 0,
          loyaltyPoints: 0,
          totalOrders: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        console.log('✅ User document created in Firestore');
      } catch (error) {
        console.error('Error creating user document:', error);
      }
    } else {
      // User exists, optionally update lastLogin
      try {
        await setDoc(userRef, {
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (error) {
        console.error('Error updating user document:', error);
      }
    }
  };

  // Login Function
  const login = async (email: string, pass: string) => {
    const result = await signInWithEmailAndPassword(auth, email, pass);
    await createUserDocument(result.user);
    router.push("/"); // Redirect to Home
  };

  // Signup Function
  const signup = async (email: string, pass: string, name?: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    // Create Firestore user document
    await createUserDocument(result.user, name ? { name } : undefined);
    router.push("/"); // Redirect to Home
  };

  // Google Sign-In Function
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // Create or update Firestore user document
    await createUserDocument(result.user);
    router.push("/"); // Redirect to Home
  };

  // Logout Function
  const logout = async () => {
    await firebaseSignOut(auth);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, signInWithGoogle, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
