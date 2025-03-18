"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface ReadingAreaProps {
  selectedPaper: string;
  selectedSection: string;
  paragraphNumber?: string;
}

const ReadingArea: React.FC<ReadingAreaProps> = ({ 
  selectedPaper, 
  selectedSection,
  paragraphNumber 
}) => {
  const { theme } = useTheme();
  
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [paragraphs, setParagraphs] = useState<Array<{id: string, text: string}>>([]);
  
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Handle case where selectedPaper is empty or undefined
        if (!selectedPaper) {
          setContent('Please select a paper.');
          setParagraphs([]);
          setLoading(false);
          return;
        }
        
        // Extract the paper number and pad it with zeros
        const paperMatch = selectedPaper.match(/\d+/);
        const paperNumber = paperMatch ? paperMatch[0].padStart(3, '0') : null;
        
        if (!paperNumber) {
          setContent('Invalid paper selection.');
          setParagraphs([]);
          setLoading(false);
          return;
        }
        
        console.log(`Fetching paper: ${paperNumber}`);
        
        // Use the path to the JSON files, relative to the public directory
        const response = await fetch(`/json/${paperNumber}.json`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Data fetched successfully:', data[0]);
        
        if (selectedSection) {
          const sectionMatch = selectedSection.match(/\d+/);
          const sectionNumber = sectionMatch ? sectionMatch[0] : null;
          
          if (sectionNumber) {
            const sectionContent = data.find((item: any) => 
              item.paperSectionId === `${paperNumber}.${sectionNumber}`);
            
            if (sectionContent && sectionContent.text) {
              setContent(sectionContent.text);
              
              // Process paragraphs for the section
              const paragraphItems = data.filter((item: any) => 
                item.type === "paragraph" && 
                item.paperSectionId === `${paperNumber}.${sectionNumber}`
              );
              
              setParagraphs(paragraphItems.map((item: any, index: number) => ({
                id: `p-${paperNumber}-${sectionNumber}-${index + 1}`,
                text: item.text
              })));
            } else {
              setContent('Section content not found.');
              setParagraphs([]);
            }
          } else {
            setContent('Invalid section selection.');
            setParagraphs([]);
          }
        } else {
          // If no section is selected, show paper content
          const paragraphItems = data.filter((item: any) => item.type === "paragraph");
          
          const paperContent = paragraphItems
            .map((item: any) => item.text)
            .join('\n\n');
          
          setParagraphs(paragraphItems.map((item: any, index: number) => {
            const sectionId = item.paperSectionId?.split('.')[1] || '0';
            return {
              id: `p-${paperNumber}-${sectionId}-${index + 1}`,
              text: item.text
            };
          }));
          
          setContent(paperContent || 'No content found for this paper.');
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        setError(`Error loading content: ${error instanceof Error ? error.message : String(error)}`);
        setContent('');
        setParagraphs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [selectedPaper, selectedSection]);
  
  // Effect to scroll to the specified paragraph when it's available
  useEffect(() => {
    if (paragraphNumber && paragraphs.length > 0) {
      const paragraphIndex = parseInt(paragraphNumber, 10) - 1;
      if (paragraphIndex >= 0 && paragraphIndex < paragraphs.length) {
        const paragraphId = paragraphs[paragraphIndex].id;
        const paragraphElement = document.getElementById(paragraphId);
        
        if (paragraphElement) {
          // Add a small delay to ensure the DOM is fully rendered
          setTimeout(() => {
            // Get header height to calculate proper offset
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 60; // Default if header not found
            
            // Calculate scroll position with increased offset (from 16px to 40px)
            const offset = headerHeight + 40; // Increased padding from default 16px
            
            // Use scrollTo instead of scrollIntoView for more control
            window.scrollTo({
              top: paragraphElement.offsetTop - offset,
              behavior: 'smooth'
            });
            
            // Highlight the paragraph temporarily
            paragraphElement.classList.add('bg-yellow-100', 'dark:bg-yellow-900');
            setTimeout(() => {
              paragraphElement.classList.remove('bg-yellow-100', 'dark:bg-yellow-900');
            }, 2000);
          }, 300);
        }
      }
    }
  }, [paragraphNumber, paragraphs]);

  // Get font classes based on theme
  const getFontFamilyClass = () => {
    return theme.fontFamily === 'serif' ? 'font-serif' : 'font-sans';
  };

  const getFontSizeClass = () => {
    switch (theme.fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      case 'xlarge': return 'text-xl';
      default: return 'text-base'; // medium
    }
  };

  const getLineSpacingClass = () => {
    switch (theme.lineSpacing) {
      case 'compact': return 'leading-snug';
      case 'relaxed': return 'leading-relaxed';
      default: return 'leading-normal'; // normal
    }
  };

  const getMarginWidthClass = () => {
    switch (theme.marginWidth) {
      case 'narrow': return 'mx-2 md:mx-4';
      case 'wide': return 'mx-8 md:mx-16';
      default: return 'mx-4 md:mx-8'; // medium
    }
  };

  // Determine if we're using modern or traditional theme
  // Since we don't have this in ThemeContext, default to modern for sans-serif
  const isModernTheme = theme.fontFamily === 'sans';

  if (loading) {
    return <div className="p-4 text-gray-700 dark:text-gray-300">Loading content...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600 dark:text-red-400">{error}</div>;
  }

  return (
    <div className={`
      ${getFontFamilyClass()} 
      ${getFontSizeClass()} 
      ${getLineSpacingClass()} 
      ${getMarginWidthClass()} 
      p-4 transition-colors duration-300
      ${isModernTheme ? 'modern-theme' : 'traditional-theme'}
    `}>
      <h2 className={`font-bold mb-2 ${getFontSizeClass() === 'text-sm' ? 'text-lg' : getFontSizeClass() === 'text-base' ? 'text-xl' : getFontSizeClass() === 'text-lg' ? 'text-2xl' : getFontSizeClass() === 'text-xl' ? 'text-3xl' : 'text-4xl'}`}>
        {selectedPaper}
      </h2>
      {selectedSection && (
        <h3 className={`font-semibold mb-4 ${getFontSizeClass() === 'text-sm' ? 'text-base' : getFontSizeClass() === 'text-base' ? 'text-lg' : getFontSizeClass() === 'text-lg' ? 'text-xl' : getFontSizeClass() === 'text-xl' ? 'text-2xl' : 'text-3xl'}`}>
          {selectedSection}
        </h3>
      )}
      
      {paragraphs.length > 0 ? (
        <div className={`${isModernTheme ? 'modern-paragraph' : 'traditional-paragraph'}`}>
          {paragraphs.map((paragraph, index) => (
            <p 
              key={paragraph.id} 
              id={paragraph.id}
              className="mb-4 transition-colors duration-300"
            >
              {paragraph.text}
            </p>
          ))}
        </div>
      ) : (
        <div className={`whitespace-pre-line ${isModernTheme ? 'modern-paragraph' : 'traditional-paragraph'}`}>
          {content || 'Select a paper from the sidebar to begin reading.'}
        </div>
      )}
      
      {/* Debug information removed for production */}
    </div>
  );
};

export default ReadingArea;
