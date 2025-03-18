'use client';

// @ts-ignore - Ignoring type errors for deployment
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ThemeProvider } from '../../contexts/ThemeContext';
import HeaderWithButtons from '../../components/minimal/HeaderWithButtons';
import SettingsPanel from '../../components/SettingsPanel';
import ReadingArea from '../../components/ReadingArea';

export default function PaperPage() {
  const params = useParams();
  const paperNumber = params.paperNumber as string;
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  useEffect(() => {
    // Convert the paperNumber from the URL to the format expected by ReadingArea
    if (paperNumber) {
      setSelectedPaper(`Paper ${parseInt(paperNumber, 10)}`);
    }
  }, [paperNumber]);

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    // Close settings panel if open
    if (isSettingsOpen) {
      setIsSettingsOpen(false);
    }
  };

  const handleSettingsToggle = () => {
    setIsSettingsOpen(!isSettingsOpen);
    // Close sidebar if open
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <HeaderWithButtons 
          onMenuToggle={handleMenuToggle} 
          onSettingsToggle={handleSettingsToggle} 
        />
        
        {/* Settings Panel */}
        <SettingsPanel 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)} 
        />
        
        {/* Overlay for when sidebar or settings panel is open */}
        {(isSidebarOpen || isSettingsOpen) && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => {
              setIsSidebarOpen(false);
              setIsSettingsOpen(false);
            }}
          />
        )}
        
        {/* Sidebar Panel (simulated) */}
        <div 
          className={`fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-64 bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out z-30 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Paper Navigation</h2>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className="block p-2 hover:bg-gray-700 rounded"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSection("Section 1");
                    setIsSidebarOpen(false);
                  }}
                >
                  Section 1
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="block p-2 hover:bg-gray-700 rounded"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSection("Section 2");
                    setIsSidebarOpen(false);
                  }}
                >
                  Section 2
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="block p-2 hover:bg-gray-700 rounded"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSection("Section 3");
                    setIsSidebarOpen(false);
                  }}
                >
                  Section 3
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-grow pt-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              {/* Reading Area */}
              <ReadingArea 
                selectedPaper={selectedPaper} 
                selectedSection={selectedSection} 
              />
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
