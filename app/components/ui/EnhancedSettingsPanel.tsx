"use client";

import React from "react";
import { useEnhancedTheme } from "../../contexts/EnhancedThemeContext";
import type {
  ThemeOption,
  ColorScheme,
  FontFamily,
  FontSize,
  LineSpacing,
  MarginWidth,
} from "../../contexts/EnhancedThemeContext";

interface EnhancedSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnhancedSettingsPanel: React.FC<EnhancedSettingsPanelProps> = ({
  isOpen,
  onClose,
}) => {
  const { theme, updateTheme } = useEnhancedTheme();

  // Handle option selection
  const handleOptionClick = (
    category: keyof ThemeOption,
    value: ColorScheme | FontFamily | FontSize | LineSpacing | MarginWidth
  ) => {
    updateTheme({
      [category]: value,
    });
  };

  // Get background color based on theme
  const getBgColor = () => {
    return theme.colorScheme === "dark"
      ? "bg-gray-800"
      : theme.colorScheme === "light"
      ? "bg-white"
      : "bg-amber-50"; // sepia
  };

  // Get text color based on theme
  const getTextColor = () => {
    return theme.colorScheme === "dark"
      ? "text-white"
      : theme.colorScheme === "light"
      ? "text-gray-900"
      : "text-amber-900"; // sepia
  };

  // Get secondary text color based on theme
  const getSecondaryTextColor = () => {
    return theme.colorScheme === "dark"
      ? "text-gray-400"
      : theme.colorScheme === "light"
      ? "text-gray-500"
      : "text-amber-700"; // sepia
  };

  // Get border color based on theme
  const getBorderColor = () => {
    return theme.colorScheme === "dark"
      ? "border-gray-700"
      : theme.colorScheme === "light"
      ? "border-gray-200"
      : "border-amber-200"; // sepia
  };

  // Get button styles
  const getButtonStyles = (
    category: keyof ThemeOption,
    value: ColorScheme | FontFamily | FontSize | LineSpacing | MarginWidth
  ) => {
    const isActive = theme[category] === value;

    // Active button styles
    if (isActive) {
      return "bg-blue-600 text-white";
    }

    // Inactive button styles based on theme
    return theme.colorScheme === "dark"
      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
      : theme.colorScheme === "light"
      ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
      : "bg-amber-100 text-amber-800 hover:bg-amber-200"; // sepia
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Settings Panel */}
      <div
        className={`fixed top-14 right-0 h-[calc(100vh-3.5rem)] w-72 md:w-80 ${getBgColor()} shadow-md transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } overflow-y-auto z-40 border-l ${getBorderColor()}`}
        aria-label="Settings Panel"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-xl font-semibold ${getTextColor()}`}>
              Settings
            </h2>
            <button
              className={`${getSecondaryTextColor()} hover:${getTextColor()}`}
              onClick={onClose}
              aria-label="Close settings"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Display Settings */}
          <div className={`border-b ${getBorderColor()} pb-4 mb-4`}>
            <h3 className={`text-lg font-medium ${getTextColor()} mb-3`}>
              Display
            </h3>

            {/* Color Scheme */}
            <div className="mb-4">
              <h4 className={`text-sm font-medium ${getSecondaryTextColor()} mb-2`}>
                Color Scheme
              </h4>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-3 py-1 rounded-md text-sm ${getButtonStyles(
                    "colorScheme",
                    "dark"
                  )}`}
                  onClick={() => handleOptionClick("colorScheme", "dark")}
                >
                  Dark
                </button>
                <button
                  className={`px-3 py-1 rounded-md text-sm ${getButtonStyles(
                    "colorScheme",
                    "light"
                  )}`}
                  onClick={() => handleOptionClick("colorScheme", "light")}
                >
                  Light
                </button>
                <button
                  className={`px-3 py-1 rounded-md text-sm ${getButtonStyles(
                    "colorScheme",
                    "sepia"
                  )}`}
                  onClick={() => handleOptionClick("colorScheme", "sepia")}
                >
                  Sepia
                </button>
              </div>
            </div>

            {/* Font Family */}
            <div className="mb-4">
              <h4 className={`text-sm font-medium ${getSecondaryTextColor()} mb-2`}>
                Font Family
              </h4>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-3 py-1 rounded-md text-sm ${getButtonStyles(
                    "fontFamily",
                    "sans"
                  )}`}
                  onClick={() => handleOptionClick("fontFamily", "sans")}
                >
                  Sans-serif
                </button>
                <button
                  className={`px-3 py-1 rounded-md text-sm ${getButtonStyles(
                    "fontFamily",
                    "serif"
                  )}`}
                  onClick={() => handleOptionClick("fontFamily", "serif")}
                >
                  Serif
                </button>
              </div>
            </div>

            {/* Font Size */}
            <div className="mb-4">
              <h4 className={`text-sm font-medium ${getSecondaryTextColor()} mb-2`}>
                Font Size
              </h4>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-3 py-1 rounded-md text-sm ${getButtonStyles(
                    "fontSize",
                    "small"
                  )}`}
                  onClick={() => handleOptionClick("fontSize", "small")}
                >
                  Small
                </button>
                <button
                  className={`px-3 py-1 rounded-md text-sm ${getButtonStyles(
                    "fontSize",
                    "medium"
                  )}`}
                  onClick={() => handleOptionClick("fontSize", "medium")}
                >
                  Medium
                </button>
                <button
                  className={`px-3 py-1 rounded-md text-sm ${getButtonStyles(
                    "fontSize",
                    "large"
                  )}`}
                  onClick={() => handleOptionClick("fontSize", "large")}
                >
                  Large
                </button>
                <button
                  className={`px-3 py-1 rounded-md text-sm ${getButtonStyles(
                    "fontSize",
                    "xlarge"
                  )}`}
                  onClick={() => handleOptionClick("fontSize", "xlarge")}
                >
                  X-Large
                </button>
              </div>
            </div>
          </div>

          {/* Reading Settings */}
          <div>
            <h3 className={`text-lg font-medium ${getTextColor()} mb-3`}>
              Reading
            </h3>

            {/* Line Spacing */}
            <div className="mb-4">
              <h4 className={`text-sm font-medium ${getSecondaryTextColor()} mb-2`}>
                Line Spacing
              </h4>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-3 py-1 rounded-md text-sm ${getButtonStyles(
                    "lineSpacing",
                    "compact"
                  )}`}
                  onClick={() => handleOptionClick("lineSpacing", "compact")}
                >
                  Compact
                </button>
                <button
                  className={`px-3 py-1 rounded-md text-sm ${getButtonStyles(
                    "lineSpacing",
                    "normal"
                  )}`}
                  onClick={() => handleOptionClick("lineSpacing", "normal")}
                >
                  Normal
                </button>
                <button
                  className={`px-3 py-1 rounded-md text-sm ${getButtonStyles(
                    "lineSpacing",
                    "relaxed"
                  )}`}
                  onClick={() => handleOptionClick("lineSpacing", "relaxed")}
                >
                  Relaxed
                </button>
              </div>
            </div>

            {/* Text Width */}
            <div className="mb-4">
              <h4 className={`text-sm font-medium ${getSecondaryTextColor()} mb-2`}>
                Text Width
              </h4>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-3 py-1 rounded-md text-sm ${getButtonStyles(
                    "marginWidth",
                    "narrow"
                  )}`}
                  onClick={() => handleOptionClick("marginWidth", "narrow")}
                >
                  Narrow
                </button>
                <button
                  className={`px-3 py-1 rounded-md text-sm ${getButtonStyles(
                    "marginWidth",
                    "medium"
                  )}`}
                  onClick={() => handleOptionClick("marginWidth", "medium")}
                >
                  Medium
                </button>
                <button
                  className={`px-3 py-1 rounded-md text-sm ${getButtonStyles(
                    "marginWidth",
                    "wide"
                  )}`}
                  onClick={() => handleOptionClick("marginWidth", "wide")}
                >
                  Wide
                </button>
              </div>
            </div>
          </div>

          {/* Version Info */}
          <div className="mt-8 text-center">
            <p className={`text-sm ${getSecondaryTextColor()}`}>
              UB Reader 2.0
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnhancedSettingsPanel;
