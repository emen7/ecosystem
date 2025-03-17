"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReadingArea from '../../components/ReadingArea';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import SettingsPanel from '../../components/SettingsPanel';
import BottomNavBar from '../../components/BottomNavBar';
import CopyToClipboard from '../../components/CopyToClipboard';

export default function PaperPage() {
  const params = useParams();
  const paperNumber = params.paperNumber as string;
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  useEffect(() => {
    // Convert the paperNumber from the URL to the format expected by ReadingArea
    // e.g., "1" -> "Paper 1"
    if (paperNumber) {
      setSelectedPaper(`Paper ${parseInt(paperNumber, 10)}`);
    }
  }, [paperNumber]);

  // Function to handle hamburger menu click
  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    // Close settings panel if open
    if (isSettingsPanelOpen) {
      setIsSettingsPanelOpen(false);
    }
  };

  // Function to handle settings icon click
  const handleSettingsToggle = () => {
    setIsSettingsPanelOpen(!isSettingsPanelOpen);
    // Close sidebar if open
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-full pt-16 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header onMenuToggle={handleMenuToggle} onSettingsToggle={handleSettingsToggle} />
      
      {/* Overlay for when sidebar or settings panel is open on mobile */}
      {(isSidebarOpen || isSettingsPanelOpen) && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => {
            setIsSidebarOpen(false);
            setIsSettingsPanelOpen(false);
          }}
        />
      )}

      {/* Sidebar for navigation */}
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSelectPaper={setSelectedPaper}
        onSelectSection={setSelectedSection}
      />

      {/* Settings Panel */}
      <SettingsPanel 
        isOpen={isSettingsPanelOpen}
        onClose={() => setIsSettingsPanelOpen(false)}
      />

      {/* Main Reading Area */}
      <div className="container mx-auto px-4 py-8">
        {/* Reading Area */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <ReadingArea selectedPaper={selectedPaper} selectedSection={selectedSection} />
        </div>
      </div>
      
      {/* Bottom Navigation Bar (mobile only) */}
      <BottomNavBar 
        onMenuToggle={handleMenuToggle}
        onSettingsToggle={handleSettingsToggle}
      />
      
      {/* Copy to Clipboard Functionality */}
      <CopyToClipboard />
    </div>
  );
}
