"use client";

import React from "react";
import { EnhancedThemeProvider } from "../contexts/EnhancedThemeContext";
import HeaderWithMenu from "../components/ui/HeaderWithMenu";
import EnhancedReadingArea from "../components/ui/EnhancedReadingArea";

export default function EnhancedDemoPage() {
  // Default to showing Paper 1 in the enhanced UI
  const paperTitle = "Paper 1: The Universal Father";
  
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
