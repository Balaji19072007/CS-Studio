import React, { createContext, useState, useEffect, useContext } from 'react'; // Add useContext
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('userData');

      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        setIsAuthenticated(true);
        setUser(parsedUser);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (token, userData = null) => {
    try {
      if (token) {
        localStorage.setItem('token', token);

        if (userData) {
          // Store all user data in one object for consistency
          const userDataToStore = {
            id: userData.userId,
            name: userData.name,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            photoUrl: userData.photoUrl,
            bio: userData.bio,
            username: userData.username,
            updatedAt: userData.updatedAt || Date.now(),
          };
          localStorage.setItem('userData', JSON.stringify(userDataToStore));
          setUser(userDataToStore);
        }

        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      sessionStorage.clear(); // Clear all session data (cache)
      setIsAuthenticated(false);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateUser = (userData) => {
    try {
      const updatedUser = { ...user, ...userData };

      // Ensure all required fields are present
      const completeUserData = {
        id: updatedUser.id || user?.id,
        name: updatedUser.name || updatedUser.firstName + ' ' + updatedUser.lastName,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email || user?.email,
        photoUrl: updatedUser.photoUrl,
        bio: updatedUser.bio,
        username: updatedUser.username || user?.username,
      };

      // Update both state and localStorage
      localStorage.setItem('userData', JSON.stringify(completeUserData));
      setUser(completeUserData);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const updateUserProfile = async (userData) => {
    try {
      const updatedUser = { ...user, ...userData };

      // Ensure all fields are properly updated
      const completeUserData = {
        id: updatedUser.id || user?.id,
        name: updatedUser.name || `${updatedUser.firstName || user?.firstName} ${updatedUser.lastName || user?.lastName}`.trim(),
        firstName: updatedUser.firstName || user?.firstName,
        lastName: updatedUser.lastName || user?.lastName,
        email: updatedUser.email || user?.email,
        photoUrl: updatedUser.photoUrl !== undefined ? updatedUser.photoUrl : user?.photoUrl,
        bio: updatedUser.bio !== undefined ? updatedUser.bio : user?.bio,
        username: updatedUser.username || user?.username,
        updatedAt: updatedUser.updatedAt || Date.now(),
      };

      // Update both state and localStorage
      localStorage.setItem('userData', JSON.stringify(completeUserData));
      setUser(completeUserData);

      return completeUserData;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
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
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context - ADD THIS
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;