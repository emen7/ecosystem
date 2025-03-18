'use client';

import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'UB-Reader' }) => {
  const { theme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center h-14 px-4">
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
