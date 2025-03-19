"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Define theme option types
export type ColorScheme = "light" | "dark" | "sepia";
export type FontFamily = "sans" | "serif";
export type FontSize = "small" | "medium" | "large" | "xlarge";
export type LineSpacing = "compact" | "normal" | "relaxed";
export type MarginWidth = "narrow" | "medium" | "wide";

export interface ThemeOption {
  colorScheme: ColorScheme;
  fontFamily: FontFamily;
  fontSize: FontSize;
  lineSpacing: LineSpacing;
  marginWidth: MarginWidth;
}

interface ThemeContextType {
  theme: ThemeOption;
  updateTheme: (newTheme: Partial<ThemeOption>) => void;
}

// Define default theme settings
const defaultTheme: ThemeOption = {
  colorScheme: "dark",
  fontFamily: "sans",
  fontSize: "medium",
  lineSpacing: "normal",
  marginWidth: "medium",
};

// Create the context
const EnhancedThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const EnhancedThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeOption>(defaultTheme);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load theme from localStorage on initial mount
  useEffect(() => {
    if (!isClient) return;
    
    try {
      const savedTheme = localStorage.getItem("reader-theme");
      if (savedTheme) {
        setTheme(JSON.parse(savedTheme));
      }
    } catch (e) {
      console.error("Failed to parse saved theme:", e);
    }
  }, [isClient]);

  // Apply theme to document when it changes
  useEffect(() => {
    if (!isClient) return;
    
    // Save theme to localStorage
    localStorage.setItem("reader-theme", JSON.stringify(theme));
    
    // Apply theme classes to document body
    const body = document.body;
    
    // Clear existing theme classes
    body.classList.remove("light-theme", "dark-theme", "sepia-theme");
    
    // Add current theme class
    body.classList.add(`${theme.colorScheme}-theme`);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        theme.colorScheme === "dark"
          ? "#1a202c"
          : theme.colorScheme === "light"
          ? "#ffffff"
          : "#f8f1e3" // sepia
      );
    }

    // Apply CSS variables based on theme
    const colors = getThemeColors(theme.colorScheme);
    for (const [key, value] of Object.entries(colors)) {
      document.documentElement.style.setProperty(`--${key}`, value);
    }
  }, [theme, isClient]);

  const updateTheme = (newTheme: Partial<ThemeOption>) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      ...newTheme,
    }));
  };

  // Function to get theme colors based on colorScheme
  const getThemeColors = (colorScheme: ColorScheme) => {
    switch (colorScheme) {
      case "light":
        return {
          "background-color": "#ffffff",
          "text-color": "#1a202c",
          "secondary-text": "#4a5568",
          "border-color": "#e2e8f0",
          "hover-color": "#edf2f7",
          "active-color": "#3182ce",
          "overlay-color": "rgba(0, 0, 0, 0.1)",
        };
      case "sepia":
        return {
          "background-color": "#f8f1e3",
          "text-color": "#4b3621",
          "secondary-text": "#5f4c32",
          "border-color": "#e6d7bf",
          "hover-color": "#f0e5d1",
          "active-color": "#957746",
          "overlay-color": "rgba(75, 54, 33, 0.1)",
        };
      case "dark":
      default:
        return {
          "background-color": "#1a202c",
          "text-color": "#f7fafc",
          "secondary-text": "#a0aec0",
          "border-color": "#2d3748",
          "hover-color": "#2d3748",
          "active-color": "#3182ce",
          "overlay-color": "rgba(0, 0, 0, 0.5)",
        };
    }
  };

  return (
    <EnhancedThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </EnhancedThemeContext.Provider>
  );
};

export const useEnhancedTheme = (): ThemeContextType => {
  const context = useContext(EnhancedThemeContext);
  if (context === undefined) {
    throw new Error("useEnhancedTheme must be used within an EnhancedThemeProvider");
  }
  return context;
};

export default EnhancedThemeContext;
