'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Link from 'next/link';
import ReadingArea from '../../components/ReadingArea';
import SettingsPanel from '../../components/SettingsPanel';
import Sidebar from '../../components/Sidebar';

export default function PaperPage({ params }: { params: { paperNumber: string } }) {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(`Paper ${params.paperNumber}`);
  const [selectedSection, setSelectedSection] = useState('');

  // Set the paper based on the route parameter on initial load
  useEffect(() => {
    setSelectedPaper(`Paper ${params.paperNumber}`);
  }, [params.paperNumber]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSettingsToggle = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handlePaperSelect = (paper: string) => {
    setSelectedPaper(paper);
  };

  const handleSectionSelect = (section: string) => {
    setSelectedSection(section);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-gray-900 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center h-14 px-4">
          <div className="flex items-center">
            <button
              className="mr-4 p-2 hover:bg-gray-700 rounded-md"
              aria-label="Toggle sidebar"
              onClick={handleSidebarToggle}
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
            <Link href="/" className="text-xl font-semibold">UB-Reader</Link>
          </div>
          <div className="flex items-center">
            <button
              className="p-2 hover:bg-gray-700 rounded-md ml-2"
              aria-label="Toggle settings"
              onClick={handleSettingsToggle}
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
          </div>
        </div>
      </header>

      {/* Sidebar for navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleSidebarToggle}
        onSelectPaper={handlePaperSelect}
        onSelectSection={handleSectionSelect}
      />

      {/* Settings Panel */}
      <SettingsPanel isOpen={isSettingsOpen} onClose={handleSettingsToggle} />

      {/* Main Content */}
      <main className="pt-16 md:ml-0 md:pl-0 lg:ml-0">
        <div className="min-h-screen">
          <ReadingArea
            selectedPaper={selectedPaper}
            selectedSection={selectedSection}
          />
        </div>
      </main>
    </div>
  );
}
