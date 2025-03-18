'use client';

// @ts-ignore - Ignoring type errors for deployment
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
        
        // For the demo, we'll use simulated content
        setContent(`This is simulated content for ${selectedPaper}${selectedSection ? `, ${selectedSection}` : ''}`);
        
        // Create some demo paragraphs
        const demoParagraphs = [];
        for (let i = 1; i <= 10; i++) {
          demoParagraphs.push({
            id: `p-${i}`,
            text: `This is paragraph ${i} of the sample content for ${selectedPaper}${selectedSection ? `, ${selectedSection}` : ''}.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.`
          });
        }
        
        setParagraphs(demoParagraphs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching content:', error);
        setError(`Error loading content: ${error instanceof Error ? error.message : String(error)}`);
        setContent('');
        setParagraphs([]);
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

  // Get font classes based on theme
  const getFontFamilyClass = () => {
    return theme?.fontFamily === 'serif' ? 'font-serif' : 'font-sans';
  };

  const getFontSizeClass = () => {
    switch (theme?.fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      case 'xlarge': return 'text-xl';
      default: return 'text-base'; // medium
    }
  };

  const getLineSpacingClass = () => {
    switch (theme?.lineSpacing) {
      case 'compact': return 'leading-snug';
      case 'relaxed': return 'leading-relaxed';
      default: return 'leading-normal'; // normal
    }
  };

  const getMarginWidthClass = () => {
    switch (theme?.marginWidth) {
      case 'narrow': return 'mx-2 md:mx-4';
      case 'wide': return 'mx-8 md:mx-16';
      default: return 'mx-4 md:mx-8'; // medium
    }
  };

  // Use the dark mode flag to determine font color
  const isDarkMode = theme?.colorScheme === 'dark';

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
    `}>
      <h2 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {selectedPaper}
      </h2>
      {selectedSection && (
        <h3 className={`font-semibold mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {selectedSection}
        </h3>
      )}
      
      {paragraphs.length > 0 ? (
        <div className={`${isDarkMode ? 'text-white' : 'text-gray-900'} modern-paragraph`}>
          {paragraphs.map((paragraph) => (
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
        <div className={`whitespace-pre-line ${isDarkMode ? 'text-white' : 'text-gray-900'} modern-paragraph`}>
          {content || 'Select a paper from the sidebar to begin reading.'}
        </div>
      )}
    </div>
  );
};

export default ReadingArea;
