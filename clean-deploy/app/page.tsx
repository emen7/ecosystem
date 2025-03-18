'use client';

// @ts-ignore - Ignoring type errors for demonstration purposes
import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import HeaderWithButtons from './components/minimal/HeaderWithButtons';
import SettingsPanel from './components/SettingsPanel';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSettingsToggle = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-gray-900 text-white">
        {/* Header with hamburger and settings buttons */}
        <HeaderWithButtons 
          onMenuToggle={handleMenuToggle} 
          onSettingsToggle={handleSettingsToggle} 
        />
        
        {/* Settings Panel */}
        <SettingsPanel isOpen={isSettingsOpen} onClose={handleSettingsToggle} />
        
        {/* Main Content */}
        <main className="pt-20 px-4 pb-8 transition-all duration-300">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">UB-Reader Next.js Application</h1>
            
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <p className="mb-4">
                This is the Next.js version of the UB-Reader application with interactive components:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><b>Hamburger Menu</b>: Click the menu icon in the header to open/close the sidebar navigation</li>
                <li><b>Settings Panel</b>: Click the gear icon in the top right to open/close the settings panel</li>
                <li><b>Theme Options</b>: The settings panel allows customization of the reading experience</li>
              </ul>
              
              <div className="mt-8 text-center text-gray-400">
                <p>Version 0.1.0</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
