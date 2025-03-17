"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export type ThemeOption = 'modern' | 'traditional';
export type ColorScheme = 'light' | 'dark';
export type FontFamily = 'sans' | 'serif';
export type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
export type LineSpacing = 'tight' | 'normal' | 'relaxed' | 'loose';
export type MarginWidth = 'sm' | 'md' | 'lg' | 'xl';

interface ThemeContextType {
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
  colorScheme: ColorScheme;
  setColorScheme: (colorScheme: ColorScheme) => void;
  fontFamily: FontFamily;
  setFontFamily: (fontFamily: FontFamily) => void;
  fontSize: FontSize;
  setFontSize: (fontSize: FontSize) => void;
  lineSpacing: LineSpacing;
  setLineSpacing: (lineSpacing: LineSpacing) => void;
  marginWidth: MarginWidth;
  setMarginWidth: (marginWidth: MarginWidth) => void;
  showReferenceNumbers: boolean;
  setShowReferenceNumbers: (showReferenceNumbers: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize state with default values or values from localStorage if available
  const [theme, setTheme] = useState<ThemeOption>('modern');
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark'); // Default to dark mode
  const [fontFamily, setFontFamily] = useState<FontFamily>('sans');
  const [fontSize, setFontSize] = useState<FontSize>('base');
  const [lineSpacing, setLineSpacing] = useState<LineSpacing>('normal');
  const [marginWidth, setMarginWidth] = useState<MarginWidth>('md');
  const [showReferenceNumbers, setShowReferenceNumbers] = useState<boolean>(true);

  // Load preferences from localStorage on initial render
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem('ub-reader-theme');
      const storedColorScheme = localStorage.getItem('ub-reader-color-scheme');
      const storedFontFamily = localStorage.getItem('ub-reader-font-family');
      const storedFontSize = localStorage.getItem('ub-reader-font-size');
      const storedLineSpacing = localStorage.getItem('ub-reader-line-spacing');
      const storedMarginWidth = localStorage.getItem('ub-reader-margin-width');
      const storedShowReferenceNumbers = localStorage.getItem('ub-reader-show-reference-numbers');

      if (storedTheme) setTheme(storedTheme as ThemeOption);
      if (storedColorScheme) setColorScheme(storedColorScheme as ColorScheme);
      if (storedFontFamily) setFontFamily(storedFontFamily as FontFamily);
      if (storedFontSize) setFontSize(storedFontSize as FontSize);
      if (storedLineSpacing) setLineSpacing(storedLineSpacing as LineSpacing);
      if (storedMarginWidth) setMarginWidth(storedMarginWidth as MarginWidth);
      if (storedShowReferenceNumbers) 
        setShowReferenceNumbers(storedShowReferenceNumbers === 'true');
    } catch (error) {
      console.error('Error loading theme preferences from localStorage', error);
    }
  }, []);

  // Update localStorage and document whenever theme preferences change
  useEffect(() => {
    try {
      localStorage.setItem('ub-reader-theme', theme);
      localStorage.setItem('ub-reader-color-scheme', colorScheme);
      localStorage.setItem('ub-reader-font-family', fontFamily);
      localStorage.setItem('ub-reader-font-size', fontSize);
      localStorage.setItem('ub-reader-line-spacing', lineSpacing);
      localStorage.setItem('ub-reader-margin-width', marginWidth);
      localStorage.setItem('ub-reader-show-reference-numbers', showReferenceNumbers.toString());

      // Update document classes/attributes for theme changes
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(colorScheme);

    } catch (error) {
      console.error('Error saving theme preferences to localStorage', error);
    }
  }, [theme, colorScheme, fontFamily, fontSize, lineSpacing, marginWidth, showReferenceNumbers]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        colorScheme,
        setColorScheme,
        fontFamily,
        setFontFamily,
        fontSize,
        setFontSize,
        lineSpacing,
        setLineSpacing,
        marginWidth,
        setMarginWidth,
        showReferenceNumbers,
        setShowReferenceNumbers,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for easy theme access
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
