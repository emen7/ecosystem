'use client';

import React from 'react';
import { ThemeProvider } from '../../contexts/ThemeContext';
import ReadingArea from '../../components/ReadingArea';

export default function PaperPage({ params }: { params: { paperNumber: string } }) {
  return (
    <ThemeProvider>
      <main className="min-h-screen p-4 pt-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Paper {params.paperNumber}</h1>
          <ReadingArea 
            selectedPaper={`Paper ${params.paperNumber}`} 
            selectedSection=""
          />
        </div>
      </main>
    </ThemeProvider>
  );
}
