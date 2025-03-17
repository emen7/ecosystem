"use client";

import React from 'react';
import { useTheme, ThemeOption, ColorScheme, FontFamily, FontSize, LineSpacing, MarginWidth } from '../contexts/ThemeContext';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  const {
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
  } = useTheme();

  return (
    <div 
      className={`fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-900 shadow-lg transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out z-50 overflow-y-auto`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Settings</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Theme Selection */}
        <div>
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Theme Style</h3>
          <div className="flex space-x-4">
            <ThemeOption 
              value="modern" 
              current={theme} 
              onChange={setTheme}
              title="Modern"
              description="Optimized for digital reading"
            />
            <ThemeOption 
              value="traditional" 
              current={theme} 
              onChange={setTheme}
              title="Traditional"
              description="Classic book formatting"
            />
          </div>
        </div>

        {/* Color Scheme */}
        <div>
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Color Scheme</h3>
          <div className="flex space-x-4">
            <ColorSchemeOption 
              value="light" 
              current={colorScheme} 
              onChange={setColorScheme}
              icon="☀️"
              label="Light"
            />
            <ColorSchemeOption 
              value="dark" 
              current={colorScheme} 
              onChange={setColorScheme}
              icon="🌙"
              label="Dark"
            />
          </div>
        </div>

        {/* Font Family */}
        <div>
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Font</h3>
          <div className="grid grid-cols-2 gap-2">
            <FontFamilyOption 
              value="sans" 
              current={fontFamily} 
              onChange={setFontFamily}
              label="Sans"
            />
            <FontFamilyOption 
              value="serif" 
              current={fontFamily} 
              onChange={setFontFamily}
              label="Serif"
            />
          </div>
        </div>

        {/* Font Size */}
        <div>
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Font Size</h3>
          <input 
            type="range" 
            min="0" 
            max="4" 
            value={fontSizeToValue(fontSize)} 
            onChange={(e) => setFontSize(valueToFontSize(parseInt(e.target.value)))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>A</span>
            <span>A</span>
            <span>A</span>
            <span>A</span>
            <span>A</span>
          </div>
        </div>

        {/* Line Spacing */}
        <div>
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Line Spacing</h3>
          <div className="grid grid-cols-4 gap-2">
            <LineSpacingOption 
              value="tight" 
              current={lineSpacing} 
              onChange={setLineSpacing}
              label="Tight"
            />
            <LineSpacingOption 
              value="normal" 
              current={lineSpacing} 
              onChange={setLineSpacing}
              label="Normal"
            />
            <LineSpacingOption 
              value="relaxed" 
              current={lineSpacing} 
              onChange={setLineSpacing}
              label="Relaxed"
            />
            <LineSpacingOption 
              value="loose" 
              current={lineSpacing} 
              onChange={setLineSpacing}
              label="Loose"
            />
          </div>
        </div>

        {/* Margin Width */}
        <div>
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Margin Width</h3>
          <div className="grid grid-cols-4 gap-2">
            <MarginWidthOption 
              value="sm" 
              current={marginWidth} 
              onChange={setMarginWidth}
              label="Small"
            />
            <MarginWidthOption 
              value="md" 
              current={marginWidth} 
              onChange={setMarginWidth}
              label="Medium"
            />
            <MarginWidthOption 
              value="lg" 
              current={marginWidth} 
              onChange={setMarginWidth}
              label="Large"
            />
            <MarginWidthOption 
              value="xl" 
              current={marginWidth} 
              onChange={setMarginWidth}
              label="Extra"
            />
          </div>
        </div>

        {/* Reference Numbers Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-md font-medium text-gray-900 dark:text-white">Show Reference Numbers</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={showReferenceNumbers}
              onChange={(e) => setShowReferenceNumbers(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

// Helper components for the settings options
const ThemeOption = ({ 
  value, 
  current, 
  onChange, 
  title,
  description 
}: { 
  value: ThemeOption; 
  current: ThemeOption; 
  onChange: (value: ThemeOption) => void;
  title: string;
  description: string;
}) => (
  <div 
    className={`p-3 border rounded-lg cursor-pointer flex-1 text-center ${
      current === value 
        ? 'bg-blue-100 border-blue-500 dark:bg-blue-900 dark:border-blue-500' 
        : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
    }`}
    onClick={() => onChange(value)}
  >
    <div className="font-medium text-gray-900 dark:text-white">{title}</div>
    <div className="text-xs text-gray-500 dark:text-gray-400">{description}</div>
  </div>
);

const ColorSchemeOption = ({ 
  value, 
  current, 
  onChange,
  icon,
  label 
}: { 
  value: ColorScheme; 
  current: ColorScheme; 
  onChange: (value: ColorScheme) => void;
  icon: string;
  label: string;
}) => (
  <div 
    className={`p-3 border rounded-lg cursor-pointer flex-1 text-center ${
      current === value 
        ? 'bg-blue-100 border-blue-500 dark:bg-blue-900 dark:border-blue-500' 
        : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
    }`}
    onClick={() => onChange(value)}
  >
    <div className="text-xl">{icon}</div>
    <div className="text-sm text-gray-900 dark:text-white">{label}</div>
  </div>
);

const FontFamilyOption = ({ 
  value, 
  current, 
  onChange,
  label 
}: { 
  value: FontFamily; 
  current: FontFamily; 
  onChange: (value: FontFamily) => void;
  label: string;
}) => (
  <div 
    className={`p-2 border rounded-lg cursor-pointer text-center ${
      current === value 
        ? 'bg-blue-100 border-blue-500 dark:bg-blue-900 dark:border-blue-500' 
        : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
    }`}
    onClick={() => onChange(value)}
  >
    <div className={`text-sm text-gray-900 dark:text-white ${
      value === 'sans' ? 'font-sans' : value === 'serif' ? 'font-serif' : 'font-sans'
    }`}>
      {label}
    </div>
  </div>
);

const LineSpacingOption = ({ 
  value, 
  current, 
  onChange,
  label 
}: { 
  value: LineSpacing; 
  current: LineSpacing; 
  onChange: (value: LineSpacing) => void;
  label: string;
}) => (
  <div 
    className={`p-2 border rounded-lg cursor-pointer text-center ${
      current === value 
        ? 'bg-blue-100 border-blue-500 dark:bg-blue-900 dark:border-blue-500' 
        : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
    }`}
    onClick={() => onChange(value)}
  >
    <div className="text-sm text-gray-900 dark:text-white">{label}</div>
  </div>
);

const MarginWidthOption = ({ 
  value, 
  current, 
  onChange,
  label 
}: { 
  value: MarginWidth; 
  current: MarginWidth; 
  onChange: (value: MarginWidth) => void;
  label: string;
}) => (
  <div 
    className={`p-2 border rounded-lg cursor-pointer text-center ${
      current === value 
        ? 'bg-blue-100 border-blue-500 dark:bg-blue-900 dark:border-blue-500' 
        : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
    }`}
    onClick={() => onChange(value)}
  >
    <div className="text-sm text-gray-900 dark:text-white">{label}</div>
  </div>
);

// Helper functions to convert between font size values and indices
const fontSizeToValue = (size: FontSize): number => {
  const sizes: FontSize[] = ['xs', 'sm', 'base', 'lg', 'xl'];
  return sizes.indexOf(size);
};

const valueToFontSize = (value: number): FontSize => {
  const sizes: FontSize[] = ['xs', 'sm', 'base', 'lg', 'xl'];
  return sizes[value] || 'base';
};

export default SettingsPanel;
