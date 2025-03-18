'use client';

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import type { ThemeOption, ColorScheme, FontFamily, FontSize, LineSpacing, MarginWidth } from '../contexts/ThemeContext';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  const { theme, updateTheme } = useTheme();

  const handleOptionClick = (
    category: keyof typeof theme,
    value: ColorScheme | FontFamily | FontSize | LineSpacing | MarginWidth
  ) => {
    updateTheme({
      ...theme,
      [category]: value,
    });
  };

  const renderOptionButton = (
    category: keyof typeof theme,
    value: ColorScheme | FontFamily | FontSize | LineSpacing | MarginWidth,
    label: string
  ) => {
    const isActive = theme[category] === value;
    return (
      <button
        key={`${category}-${value}`}
        className={`px-3 py-1 rounded-md text-sm ${
          isActive
            ? 'bg-blue-500 text-white'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
        onClick={() => handleOptionClick(category, value)}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      className={`fixed top-14 right-0 h-[calc(100vh-3.5rem)] w-72 md:w-80 bg-gray-800 shadow-md transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } overflow-y-auto z-40 border-l border-gray-700`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Settings</h2>
          <button
            className="text-gray-400 hover:text-white"
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

        <div className="border-b border-gray-700 pb-4 mb-4">
          <h3 className="text-lg font-medium text-white mb-3">Display</h3>

          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">
              Color Scheme
            </h4>
            <div className="flex flex-wrap gap-2">
              {renderOptionButton('colorScheme', 'dark', 'Dark')}
              {renderOptionButton('colorScheme', 'light', 'Light')}
              {renderOptionButton('colorScheme', 'sepia', 'Sepia')}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">
              Font Family
            </h4>
            <div className="flex flex-wrap gap-2">
              {renderOptionButton('fontFamily', 'sans', 'Sans-serif')}
              {renderOptionButton('fontFamily', 'serif', 'Serif')}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Font Size</h4>
            <div className="flex flex-wrap gap-2">
              {renderOptionButton('fontSize', 'small', 'Small')}
              {renderOptionButton('fontSize', 'medium', 'Medium')}
              {renderOptionButton('fontSize', 'large', 'Large')}
              {renderOptionButton('fontSize', 'xlarge', 'X-Large')}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-3">Reading</h3>

          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">
              Line Spacing
            </h4>
            <div className="flex flex-wrap gap-2">
              {renderOptionButton('lineSpacing', 'compact', 'Compact')}
              {renderOptionButton('lineSpacing', 'normal', 'Normal')}
              {renderOptionButton('lineSpacing', 'relaxed', 'Relaxed')}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">
              Text Width
            </h4>
            <div className="flex flex-wrap gap-2">
              {renderOptionButton('marginWidth', 'narrow', 'Narrow')}
              {renderOptionButton('marginWidth', 'medium', 'Medium')}
              {renderOptionButton('marginWidth', 'wide', 'Wide')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
