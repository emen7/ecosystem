'use client';

// This is a simplified version with minimal dependencies
import React from 'react';
import { ThemeProvider } from '../../contexts/ThemeContext';

// Static version that doesn't require params
export default function PaperPage({ params }: { params: { paperNumber: string } }) {
  const paperNumber = params.paperNumber;
  
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <header className="fixed top-0 left-0 right-0 z-40 bg-gray-900 text-white shadow-md">
          <div className="container mx-auto flex justify-between items-center h-14 px-4">
            <div className="flex items-center">
              <button
                className="mr-4 p-2 hover:bg-gray-700 rounded-md"
                aria-label="Toggle menu"
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
              <h1 className="text-xl font-semibold">UB-Reader</h1>
            </div>
            <div className="flex items-center">
              <button
                className="p-2 hover:bg-gray-700 rounded-md ml-2"
                aria-label="Toggle settings"
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
        
        <main className="pt-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h1 className="text-2xl font-bold mb-4">Paper {paperNumber}</h1>
              
              <div className="space-y-4">
                <p>
                  This is sample content for Paper {paperNumber}. This is a simplified version 
                  of the paper page that doesn't rely on complex component dependencies.
                </p>
                
                <p>
                  In the full implementation, this page would load the actual content from the 
                  JSON files and display it with proper formatting based on the theme settings.
                </p>
                
                <div className="border-t border-gray-700 pt-4 mt-6">
                  <h2 className="text-xl font-semibold mb-3">Sample Content</h2>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget
                    ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.
                    Donec euismod, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget
                    aliquam nisl nisl eget nisl.
                  </p>
                  <p>
                    Donec euismod, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget
                    aliquam nisl nisl eget nisl. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget
                    aliquam nisl nisl eget nisl.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
