'use client';

import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';

/**
 * Client component wrapper for ThemeProvider
 * This component is used in the root layout to provide theme context to all pages
 */
export function ClientThemeLayout({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

export default ClientThemeLayout;
