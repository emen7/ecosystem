// useSectionObserver.ts - Custom hook for observing sections and managing sticky headers
// This hook uses Intersection Observer API to detect which sections are visible

import { useState, useEffect, useRef } from 'react';

interface UseSectionObserverProps {
  sectionIds: string[];
  rootMargin?: string;
}

interface UseSectionObserverReturn {
  activeSection: string | null;
  observerRef: React.RefObject<HTMLDivElement>;
}

/**
 * Custom hook that observes sections in the document and determines which one is currently active
 * for sticky header and navigation purposes.
 */
const useSectionObserver = ({ 
  sectionIds,
  rootMargin = "-150px 0px 0px 0px" // Increased from -100px to -150px to fix premature header appearance
}: UseSectionObserverProps): UseSectionObserverReturn => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Modified threshold values to prevent sticky header from appearing too soon
    const threshold: number[] | number = [0.25, 0.4, 0.5, 0.75, 1];
    
    const observer = new IntersectionObserver((entries) => {
      // Get entries that are currently intersecting with the viewport
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      
      if (visibleEntries.length > 0) {
        // Sort by visibility ratio (how much of the element is visible)
        const sorted = [...visibleEntries].sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const mostVisible = sorted[0];
        
        // Set the most visible section as active
        setActiveSection(mostVisible.target.id);
      }
    }, {
      root: null, // viewport
      rootMargin, // margin around the viewport
      threshold, // percentage visibility thresholds to trigger the callback
    });

    // Observe each section
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      // Clean up by disconnecting the observer
      observer.disconnect();
    };
  }, [sectionIds, rootMargin]);

  return { activeSection, observerRef };
};

export default useSectionObserver;
