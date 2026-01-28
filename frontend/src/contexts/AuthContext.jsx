import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Firebase Auth Listener
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // Prevent race conditions where this runs multiple times
      if (firebaseUser) {
        console.log('Firebase User Detected:', firebaseUser.email, 'Verified:', firebaseUser.emailVerified);

        // Enforce Email Verification
        if (!firebaseUser.emailVerified) {
          console.warn('User email not verified. Signing out.');
          await signOut(auth);
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem('userData');
          localStorage.removeItem('token');
          setLoading(false);
          return;
        }

        try {
          // Sync with backend to get MongoDB ID and JWT
          const response = await fetch('http://localhost:5000/api/auth/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: firebaseUser.email,
              uid: firebaseUser.uid,
              firstName: firebaseUser.displayName?.split(' ')[0] || 'User',
              lastName: firebaseUser.displayName?.split(' ').slice(1).join(' ') || '',
              photoUrl: firebaseUser.photoURL
            }),
          });

          if (response.ok) {
            const data = await response.json();
            // Consolidate data: Firebase auth + Backend Data
            const userData = {
              ...data, // Contains userId (MongoDB _id), role, etc.
              uid: firebaseUser.uid, // Keep Firebase UID as well
              role: data.role || 'student', // Ensure role exists
            };

            setUser(userData);
            setIsAuthenticated(true);

            // Store Backend JWT for API calls
            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('token', data.token);
            console.log('Backend Sync Success. Token saved.');
          } else {
            console.error('Backend Sync Failed:', response.statusText);
            // Fallback: Use Firebase data only (Dashboard might be empty)
            const userData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              role: 'student', // Default role for fallback
            };
            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem('userData', JSON.stringify(userData));
          }

        } catch (error) {
          console.error('Error syncing with backend:', error);
          const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: 'student', // Default role on error
          };
          setUser(userData);
          setIsAuthenticated(true);
        }

      } else {
        // User is signed out
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
      }
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const login = (token, userData) => {
    // Legacy support or manual state update if needed, 
    // but onAuthStateChanged handles the main logic.
    // This might be called after custom backend auth to set extra user details
    if (userData) {
      setUser(userData);
      localStorage.setItem('userData', JSON.stringify(userData));
    }
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // State updates handled by onAuthStateChanged
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateUser = (userData) => {
    // Update local state for immediate UI feedback
    setUser(prev => ({ ...prev, ...userData }));
  };

  const updateUserProfile = async (userData) => {
    // Placeholder - in a real app you might update Firebase profile here
    updateUser(userData);
    return userData;
  };

  const value = {
    isAuthenticated,
    isLoggedIn: isAuthenticated,
    user,
    loading,
    login,
    logout,
    updateUser,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;