"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ReadingArea: React.FC<{ 
  selectedPaper: string, 
  selectedSection: string,
  paragraphNumber?: string 
}> = ({ 
  selectedPaper, 
  selectedSection,
  paragraphNumber 
}) => {
  const {
    theme,
    colorScheme,
    fontFamily,
    fontSize,
    lineSpacing,
    marginWidth,
    showReferenceNumbers
  } = useTheme();
  
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
        
        // Use the path to the original JSON files
        const response = await fetch(`/UB-Reader/json/${paperNumber}.json`);
        
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
            paragraphElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  // Map theme options to Tailwind classes
  const getFontFamilyClass = () => {
    switch (fontFamily) {
      case 'sans': return 'font-sans';
      case 'serif': return 'font-serif';
      default: return 'font-sans';
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'xs': return 'text-sm';
      case 'sm': return 'text-base';
      case 'base': return 'text-lg';
      case 'lg': return 'text-xl';
      case 'xl': return 'text-2xl';
      default: return 'text-base';
    }
  };

  const getLineSpacingClass = () => {
    switch (lineSpacing) {
      case 'tight': return 'leading-snug';
      case 'normal': return 'leading-normal';
      case 'relaxed': return 'leading-relaxed';
      case 'loose': return 'leading-loose';
      default: return 'leading-normal';
    }
  };

  const getMarginWidthClass = () => {
    switch (marginWidth) {
      case 'sm': return 'mx-2 md:mx-4';
      case 'md': return 'mx-4 md:mx-8';
      case 'lg': return 'mx-8 md:mx-16';
      case 'xl': return 'mx-12 md:mx-24';
      default: return 'mx-4 md:mx-8';
    }
  };

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
      ${theme === 'modern' ? 'modern-theme' : 'traditional-theme'}
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
        <div className={`${theme === 'modern' ? 'modern-paragraph' : 'traditional-paragraph'}`}>
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
        <div className={`whitespace-pre-line ${theme === 'modern' ? 'modern-paragraph' : 'traditional-paragraph'}`}>
          {content || 'Select a paper from the sidebar to begin reading.'}
        </div>
      )}
      
      {/* Debug information */}
      <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-md text-sm">
        <p>Debug Info:</p>
        <p>Selected Paper: {selectedPaper || 'None'}</p>
        <p>Selected Section: {selectedSection || 'None'}</p>
        <p>Paragraph Number: {paragraphNumber || 'None'}</p>
        <p>Paragraphs Loaded: {paragraphs.length}</p>
        {error && <p className="text-red-500">Error: {error}</p>}
      </div>
    </div>
  );
};

export default ReadingArea;
