'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Section {
  id: string;
  title: string;
}

interface SectionJumpMenuProps {
  sections: Section[];
  onSectionSelect: (sectionId: string) => void;
  activeSection?: string;
}

/**
 * SectionJumpMenu component with improved dropdown behavior
 * - Added longer timeout delay (500ms instead of 300ms)
 * - Added event stopping to prevent accidental closing
 * - Enhanced mouse interaction for better usability
 */
const SectionJumpMenu: React.FC<SectionJumpMenuProps> = ({
  sections,
  onSectionSelect,
  activeSection
}) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle clicking outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        // Add delay before closing dropdown to ensure clicks register
        setTimeout(() => {
          setIsOpen(false);
        }, 200);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Clear any pending timeouts when unmounting
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle mouse leave with improved delay
  const handleMouseLeave = () => {
    // Increased from default 300ms to 500ms for better usability
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  // Handle mouse enter to cancel closing
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Handle section selection
  const handleSectionSelect = (sectionId: string) => {
    onSectionSelect(sectionId);
    setIsOpen(false);
  };

  // Find the active section title
  const activeSectionTitle = activeSection 
    ? sections.find(section => section.id === activeSection)?.title || 'Jump to Section'
    : 'Jump to Section';

  return (
    <div 
      className="section-navigation relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => e.stopPropagation()} // Prevent clicks from bubbling up
    >
      <button
        className={`
          flex items-center justify-between px-4 py-2 w-full
          text-left font-medium rounded-md shadow-sm
          ${theme.colorScheme === 'dark' 
            ? 'bg-gray-800 text-white hover:bg-gray-700' 
            : 'bg-white text-gray-900 hover:bg-gray-100'
          }
          border ${theme.colorScheme === 'dark' ? 'border-gray-700' : 'border-gray-300'}
        `}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="truncate">{activeSectionTitle}</span>
        <svg
          className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      <div
        className={`
          absolute z-10 mt-1 w-full rounded-md shadow-lg 
          ${theme.colorScheme === 'dark' ? 'bg-gray-800' : 'bg-white'}
          max-h-60 overflow-auto
          transition-opacity duration-200 ease-in-out
          ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}
      >
        <ul 
          className={`
            py-1 divide-y
            ${theme.colorScheme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}
          `}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="section-menu"
        >
          {sections.map((section) => (
            <li 
              key={section.id}
              role="menuitem"
              className={`
                py-2 px-4 text-sm cursor-pointer
                ${section.id === activeSection
                  ? (theme.colorScheme === 'dark'
                    ? 'bg-blue-900 text-white'
                    : 'bg-blue-100 text-blue-900')
                  : (theme.colorScheme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100')
                }
              `}
              onClick={() => handleSectionSelect(section.id)}
            >
              {section.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SectionJumpMenu;
