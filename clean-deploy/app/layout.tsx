import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UB Reader - Next.js Application',
  description: 'The Urantia Book Reader built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
