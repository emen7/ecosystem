'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface Section {
  id: string;
  title: string;
  element: HTMLElement;
}

export interface ActiveSection {
  id: string;
  title: string;
}

/**
 * Enhanced section observer hook with improved visibility thresholds
 * Uses IntersectionObserver to accurately track which section is in view
 * Returns functions to register/unregister sections and the currently active section
 */
export function useSectionObserver() {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState<ActiveSection | null>(null);
  
  // Store observer in a ref so we can update it when sections change
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Map to track intersection ratios for each section
  const intersectionRatios = useRef<Map<string, number>>(new Map());
  
    // Create a new IntersectionObserver
    const createObserver = useCallback(() => {
      // Even more granular threshold values to better detect which section is in view
      // Now includes more thresholds in the lower range for better accuracy
      const threshold: number[] | number = [0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.75, 1];
      
      // Adjust rootMargin based on viewport width for better mobile experience
      // Use different margin for mobile vs desktop
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      const rootMargin: string = isMobile ? "-180px 0px 0px 0px" : "-160px 0px 0px 0px";
    
    // Cleanup previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Update intersection ratios for each entry
        entries.forEach((entry) => {
          const id = entry.target.id;
          intersectionRatios.current.set(id, entry.intersectionRatio);
        });
        
        // Find section with highest intersection ratio
        let highestRatio = 0;
        let mostVisibleSection = null;
        
        for (const section of sections) {
          const ratio = intersectionRatios.current.get(section.id) || 0;
          if (ratio > highestRatio) {
            highestRatio = ratio;
            mostVisibleSection = section;
          }
        }
        
        // Only update active section if a section is visible
        if (mostVisibleSection && highestRatio > 0.25) {
          setActiveSection({
            id: mostVisibleSection.id,
            title: mostVisibleSection.title
          });
        } else if (highestRatio === 0) {
          setActiveSection(null);
        }
      },
      { threshold, rootMargin }
    );
    
    // Observe all current sections
    sections.forEach((section) => {
      observerRef.current?.observe(section.element);
    });
    
    return () => {
      observerRef.current?.disconnect();
    };
  }, [sections]);
  
  // Register a section with the observer
  const registerSection = useCallback((id: string, title: string, element: HTMLElement) => {
    setSections((prev) => {
      const existingIndex = prev.findIndex((section) => section.id === id);
      
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = { id, title, element };
        return updated;
      }
      
      return [...prev, { id, title, element }];
    });
  }, []);
  
  // Unregister a section from the observer
  const unregisterSection = useCallback((id: string) => {
    setSections((prev) => prev.filter((section) => section.id !== id));
    intersectionRatios.current.delete(id);
  }, []);
  
  // Create or update observer when sections change
  useEffect(() => {
    const cleanup = createObserver();
    return cleanup;
  }, [sections, createObserver]);
  
  return {
    activeSection,
    registerSection,
    unregisterSection
  };
}
