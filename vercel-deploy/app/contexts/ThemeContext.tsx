'use client';

// @ts-ignore - Ignoring type errors for deployment
import React, { createContext, useContext, useState, useEffect } from 'react';

// Theme types
export type ColorScheme = 'light' | 'dark' | 'sepia';
export type FontFamily = 'sans' | 'serif';
export type FontSize = 'small' | 'medium' | 'large' | 'xlarge';
export type LineSpacing = 'compact' | 'normal' | 'relaxed';
export type MarginWidth = 'narrow' | 'medium' | 'wide';

export interface ThemeOption {
  colorScheme: ColorScheme;
  fontFamily: FontFamily;
  fontSize: FontSize;
  lineSpacing: LineSpacing;
  marginWidth: MarginWidth;
  showReferenceNumbers: boolean;
}

// Default theme
const defaultTheme: ThemeOption = {
  colorScheme: 'dark',
  fontFamily: 'sans',
  fontSize: 'medium',
  lineSpacing: 'normal',
  marginWidth: 'medium',
  showReferenceNumbers: true,
};

// Context type
interface ThemeContextType {
  theme: ThemeOption;
  updateTheme: (newTheme: ThemeOption) => void;
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeOption>(defaultTheme);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('ub-reader-theme');
    if (savedTheme) {
      try {
        setTheme(JSON.parse(savedTheme));
      } catch (e) {
        console.error('Failed to parse saved theme', e);
      }
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('ub-reader-theme', JSON.stringify(theme));
  }, [theme]);

  // Update theme
  const updateTheme = (newTheme: ThemeOption) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook for using theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
