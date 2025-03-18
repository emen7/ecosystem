'use client';

import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';

export default function Home() {
  return (
    <ThemeProvider>
      <main className="min-h-screen p-4 pt-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">UB-Reader Next.js Application</h1>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="mb-4">
              This is the Next.js version of the UB-Reader application. This minimal page serves as a starting point for deployment.
            </p>
            
            <p className="mb-4">
              The full application is under development and will soon include:
            </p>
            
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Full reading interface for The Urantia Book</li>
              <li>Navigation with part, paper, and section menus</li>
              <li>Customizable reading settings (font, colors, spacing)</li>
              <li>Mobile-responsive design</li>
            </ul>
            
            <div className="mt-8 text-center text-gray-400">
              <p>Version 0.1.0</p>
            </div>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}
