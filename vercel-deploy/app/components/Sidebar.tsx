"use client";

import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPaper: (paper: string) => void;
  onSelectSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onSelectPaper, onSelectSection }) => {
  const { theme } = useTheme();
  const [expandedPaper, setExpandedPaper] = useState<string | null>(null);

  // For demonstration purposes, I'm creating mock papers and sections
  // In a real implementation, these would likely be fetched from an API
  const papers = Array.from({ length: 196 }, (_, i) => `Paper ${i + 1}`);

  // Mock function to get sections for a paper
  const getSectionsForPaper = (paper: string) => {
    const paperNum = parseInt(paper.replace('Paper ', ''));
    return Array.from({ length: 8 }, (_, i) => `Section ${i + 1}`);
  };

  const handlePaperClick = (paper: string) => {
    if (expandedPaper === paper) {
      setExpandedPaper(null);
    } else {
      setExpandedPaper(paper);
    }
    onSelectPaper(paper);
    onSelectSection('');
  };

  const handleSectionClick = (paper: string, section: string) => {
    onSelectPaper(paper);
    onSelectSection(section);
    onClose(); // Close sidebar after selection on mobile
  };

  return (
    <>
      {/* Desktop sidebar - always visible on larger screens */}
      <div className="hidden md:block md:w-64 lg:w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed top-16 bottom-0 left-0 overflow-y-auto z-30">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Papers</h2>
          
          <div className="space-y-1">
            {papers.map((paper) => (
              <div key={paper} className="mb-2">
                <button
                  className={`w-full flex items-center justify-between p-2 text-left rounded-md ${
                    expandedPaper === paper
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => handlePaperClick(paper)}
                >
                  <span>{paper}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transform ${expandedPaper === paper ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                
                {expandedPaper === paper && (
                  <div className="pl-4 mt-1 space-y-1">
                    {getSectionsForPaper(paper).map((section) => (
                      <button
                        key={section}
                        className="w-full p-2 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                        onClick={() => handleSectionClick(paper, section)}
                      >
                        {section}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile sidebar - slides in from the left */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 w-72 bg-white dark:bg-gray-800 shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-40 overflow-y-auto pt-16`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Papers</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-2 overflow-y-auto">
          {papers.map((paper) => (
            <div key={paper} className="mb-2">
              <button
                className={`w-full flex items-center justify-between p-2 text-left rounded-md ${
                  expandedPaper === paper
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => handlePaperClick(paper)}
              >
                <span>{paper}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transform ${expandedPaper === paper ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              {expandedPaper === paper && (
                <div className="pl-4 mt-1 space-y-1">
                  {getSectionsForPaper(paper).map((section) => (
                    <button
                      key={section}
                      className="w-full p-2 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                      onClick={() => handleSectionClick(paper, section)}
                    >
                      {section}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
