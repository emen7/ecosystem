'use client';

import React, { useRef, useEffect } from 'react';
import { Section as SectionType } from '../hooks/useSectionObserver';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  registerSection: (id: string, title: string, element: HTMLElement) => void;
  unregisterSection: (id: string) => void;
}

/**
 * Section component that automatically registers itself with the section observer
 * This enables accurate tracking of which section is currently in view
 */
const Section: React.FC<SectionProps> = ({
  id,
  title,
  children,
  registerSection,
  unregisterSection
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Register this section with the observer when the component mounts
  useEffect(() => {
    if (sectionRef.current) {
      registerSection(id, title, sectionRef.current);
    }

    // Unregister when component unmounts
    return () => {
      unregisterSection(id);
    };
  }, [id, title, registerSection, unregisterSection]);

  // Check if this section is active to apply highlight effect
  const applyHighlight = () => {
    if (sectionRef.current) {
      // Add highlight class temporarily then remove it after animation
      sectionRef.current.classList.add('section-highlight');
      setTimeout(() => {
        if (sectionRef.current) {
          sectionRef.current.classList.remove('section-highlight');
        }
      }, 2000);
    }
  };

  // Add highlight when URL fragment matches this section
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1);
      if (hash === id) {
        // Delay highlight to ensure it happens after scroll
        setTimeout(applyHighlight, 500);
      }
    }
  }, [id]);

  return (
    <section 
      ref={sectionRef} 
      id={id}
      className="mb-12"
    >
      <h2 
        className="text-xl font-semibold mb-4 pb-2 border-b border-gray-700 dark:border-gray-600" 
        id={`title-${id}`}
      >
        {title}
      </h2>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {children}
      </div>
    </section>
  );
};

export default Section;
