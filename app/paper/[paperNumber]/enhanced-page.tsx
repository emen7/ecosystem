"use client";

import React from "react";
import { EnhancedThemeProvider } from "../../contexts/EnhancedThemeContext";
import HeaderWithMenu from "../../components/ui/HeaderWithMenu";
import EnhancedReadingArea from "../../components/ui/EnhancedReadingArea";

export default function EnhancedPaperPage({ params }: { params: { paperNumber: string } }) {
  const paperTitle = `Paper ${params.paperNumber}`;
  
  return (
    <EnhancedThemeProvider>
      <div className="min-h-screen">
        {/* Header with Navigation and Settings */}
        <HeaderWithMenu />

        {/* Main Content */}
        <main className="pt-14">
          <EnhancedReadingArea
            selectedPaper={paperTitle}
            selectedSection=""
          />
        </main>
      </div>
    </EnhancedThemeProvider>
  );
}
