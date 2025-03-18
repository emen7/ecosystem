'use client';

import React, { createContext, useContext, useState } from 'react';

// Define theme option types
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
}

interface ThemeContextType {
  theme: ThemeOption;
  updateTheme: (newTheme: ThemeOption) => void;
}

// Define default theme settings
const defaultTheme: ThemeOption = {
  colorScheme: 'dark',
  fontFamily: 'sans',
  fontSize: 'medium',
  lineSpacing: 'normal',
  marginWidth: 'medium',
};

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeOption>(defaultTheme);

  const updateTheme = (newTheme: ThemeOption) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
