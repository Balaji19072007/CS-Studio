// frontend/src/contexts/ThemeContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import * as feather from 'feather-icons';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(theme + '-theme');
    localStorage.setItem('theme', theme);

    // Initialize feather icons immediately
    if (typeof feather !== 'undefined' && feather.replace) {
      feather.replace();
    }

    // Also initialize after a short delay to catch any dynamically added icons
    const timer = setTimeout(() => {
      if (typeof feather !== 'undefined' && feather.replace) {
        feather.replace();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};