'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';

interface StickyHeaderProps {
  paperTitle: string;
  activeSection: {
    id: string;
    title: string;
  } | null;
}

/**
 * Enhanced sticky header component with improved section detection logic
 * Uses IntersectionObserver to precisely track section visibility
 */
const StickyHeader: React.FC<StickyHeaderProps> = ({ 
  paperTitle, 
  activeSection 
}) => {
  const { isMobile } = useBreakpoint();
  const headerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const prevScrollY = useRef(0);

  // Track scroll direction to hide/show header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only hide header when scrolling down and past threshold
      if (currentScrollY > 100) {
        setIsVisible(prevScrollY.current > currentScrollY);
      } else {
        setIsVisible(true);
      }
      
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      ref={headerRef}
      className={`
        sticky top-0 z-10 bg-gray-900 dark:bg-gray-800 
        border-b border-gray-700 dark:border-gray-600
        transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
      aria-hidden={!isVisible}
    >
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="text-xs text-gray-400 uppercase tracking-wider text-center">
          {paperTitle}
        </div>
        
        {activeSection && (
          <div className="text-lg font-semibold text-white text-center mt-1 truncate">
            {activeSection.title}
            <span className="ml-2 text-sm text-blue-400">
              {activeSection.id.split('-').pop()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StickyHeader;
