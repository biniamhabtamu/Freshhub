import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, AppSettings } from '../types';

interface ThemeContextType {
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;
  themes: Record<Theme, string>;
}

const defaultSettings: AppSettings = {
  theme: 'blue',
  notifications: true,
  soundEnabled: true,
  darkMode: false
};

const themes: Record<Theme, string> = {
  blue: '#3B82F6',
  green: '#10B981',
  purple: '#8B5CF6',
  orange: '#F59E0B',
  pink: '#EC4899'
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const cached = localStorage.getItem('appSettings');
    return cached ? JSON.parse(cached) : defaultSettings;
  });

  const updateSettings = (updates: Partial<AppSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    localStorage.setItem('appSettings', JSON.stringify(newSettings));
  };

  useEffect(() => {
    // Apply theme to CSS variables
    const root = document.documentElement;
    root.style.setProperty('--primary-color', themes[settings.theme]);
    
    // Apply dark mode
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  const value: ThemeContextType = {
    settings,
    updateSettings,
    themes
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};