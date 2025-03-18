import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import ClientThemeLayout from './components/ClientThemeLayout';

export const metadata: Metadata = {
  title: 'UB Reader - Next.js Application',
  description: 'The Urantia Book Reader built with Next.js',
};

// Root layout (Server Component)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientThemeLayout>{children}</ClientThemeLayout>
      </body>
    </html>
  );
}
