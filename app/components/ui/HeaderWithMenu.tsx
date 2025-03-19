"use client";

import React, { useState } from "react";
import { useEnhancedTheme } from "../../contexts/EnhancedThemeContext";
import NavigationMenu from "./NavigationMenu";
import EnhancedSettingsPanel from "./EnhancedSettingsPanel";

const HeaderWithMenu: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { theme } = useEnhancedTheme();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    if (isSettingsOpen) setIsSettingsOpen(false);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
    if (isNavOpen) setIsNavOpen(false);
  };

  // Get background and text colors based on theme
  const getHeaderColors = () => {
    switch (theme.colorScheme) {
      case "light":
        return "bg-white text-gray-900 border-gray-200";
      case "sepia":
        return "bg-amber-50 text-amber-900 border-amber-200";
      case "dark":
      default:
        return "bg-gray-800 text-white border-gray-700";
    }
  };

  // Get button hover colors based on theme
  const getButtonHoverColor = () => {
    switch (theme.colorScheme) {
      case "light":
        return "hover:bg-gray-100";
      case "sepia":
        return "hover:bg-amber-100";
      case "dark":
      default:
        return "hover:bg-gray-700";
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 h-14 ${getHeaderColors()} border-b shadow-sm z-50 flex items-center justify-between px-4`}
      >
        <button
          className={`p-2 rounded-md ${getButtonHoverColor()} transition-colors duration-200`}
          onClick={toggleNav}
          aria-label="Open navigation menu"
          aria-expanded={isNavOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <h1 className="text-lg font-semibold">UB Reader</h1>

        <button
          className={`p-2 rounded-md ${getButtonHoverColor()} transition-colors duration-200`}
          onClick={toggleSettings}
          aria-label="Open settings"
          aria-expanded={isSettingsOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </header>

      {/* Navigation Menu */}
      <NavigationMenu isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />

      {/* Settings Panel */}
      <EnhancedSettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};

export default HeaderWithMenu;
