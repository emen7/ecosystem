"use client";

import React, { useState, useEffect } from "react";
import { useEnhancedTheme } from "../../contexts/EnhancedThemeContext";
import StickyHeaders from "./StickyHeaders";

interface ReadingAreaProps {
  selectedPaper: string;
  selectedSection: string;
  paragraphNumber?: string;
}

const EnhancedReadingArea: React.FC<ReadingAreaProps> = ({
  selectedPaper,
  selectedSection,
  paragraphNumber,
}) => {
  const { theme } = useEnhancedTheme();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paragraphs, setParagraphs] = useState<Array<{ id: string; text: string; sectionIndex: number }>>([]);
  const [sections, setSections] = useState<Array<{ id: string; title: string }>>([]);
  const [activePart, setActivePart] = useState("Part I: The Central and Superuniverses");

  // Determine active part based on paper number
  useEffect(() => {
    if (!selectedPaper) return;

    const paperMatch = selectedPaper.match(/\d+/);
    if (!paperMatch) return;

    const paperNum = parseInt(paperMatch[0], 10);

    if (paperNum <= 31) {
      setActivePart("Part I: The Central and Superuniverses");
    } else if (paperNum <= 56) {
      setActivePart("Part II: The Local Universe");
    } else if (paperNum <= 119) {
      setActivePart("Part III: The History of Urantia");
    } else {
      setActivePart("Part IV: The Life and Teachings of Jesus");
    }
  }, [selectedPaper]);

  // Fetch content
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Handle case where selectedPaper is empty or undefined
        if (!selectedPaper) {
          setContent("Please select a paper.");
          setParagraphs([]);
          setSections([]);
          setLoading(false);
          return;
        }

        // Extract the paper number and pad it with zeros
        const paperMatch = selectedPaper.match(/\d+/);
        const paperNumber = paperMatch ? paperMatch[0].padStart(3, "0") : null;

        if (!paperNumber) {
          setContent("Invalid paper selection.");
          setParagraphs([]);
          setSections([]);
          setLoading(false);
          return;
        }

        // Use the path to the JSON files, relative to the public directory
        const response = await fetch(`/json/${paperNumber}.json`);

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Extract all sections from the paper
        const sectionItems = data.filter((item: any) => item.type === "section");

        setSections(
          sectionItems.map((item: any) => ({
            id: `section-${item.paperSectionId.split(".")[1]}`,
            title: item.title,
          }))
        );

        // Process all paragraphs, organizing them by section
        const allParagraphs = data.filter((item: any) => item.type === "paragraph");
        
        // Group paragraphs by section
        const sectionParagraphs = new Map<string, any[]>();
        
        allParagraphs.forEach((item: any) => {
          const sectionId = item.paperSectionId?.split(".")[1] || "0";
          if (!sectionParagraphs.has(sectionId)) {
            sectionParagraphs.set(sectionId, []);
          }
          sectionParagraphs.get(sectionId)?.push(item);
        });
        
        // Create paragraphs with proper IDs
        const formattedParagraphs: Array<{ id: string; text: string; sectionIndex: number }> = [];
        
        sectionParagraphs.forEach((paragraphs, sectionId) => {
          const sectionIndex = parseInt(sectionId);
          paragraphs.forEach((paragraph, index) => {
            formattedParagraphs.push({
              id: `p-${paperNumber}-${sectionId}-${index + 1}`,
              text: paragraph.text,
              sectionIndex
            });
          });
        });
        
        setParagraphs(formattedParagraphs);
        
        // If a specific section is selected, filter to show only that section
        if (selectedSection) {
          const sectionMatch = selectedSection.match(/\d+/);
          const sectionNumber = sectionMatch ? sectionMatch[0] : null;
          
          if (sectionNumber) {
            // Show only paragraphs from this section
            setContent("");
          } else {
            setContent("Invalid section selection.");
          }
        } else {
          // If no section is selected, we'll show all sections with their paragraphs
          setContent("");
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        setError(
          `Error loading content: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
        setContent("");
        setParagraphs([]);
        setSections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [selectedPaper, selectedSection]);

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight : 60;
      const stickyHeadersHeight = 70; // Height of sticky part and paper headers

      // Use larger offset to account for headers
      const offset = headerHeight + stickyHeadersHeight;

      window.scrollTo({
        top: sectionElement.offsetTop - offset,
        behavior: "smooth",
      });
    }
  };

  // Scroll to paragraph when specified
  useEffect(() => {
    if (paragraphNumber && paragraphs.length > 0) {
      const paragraphIndex = parseInt(paragraphNumber, 10) - 1;
      if (paragraphIndex >= 0 && paragraphIndex < paragraphs.length) {
        const paragraphId = paragraphs[paragraphIndex].id;
        const paragraphElement = document.getElementById(paragraphId);

        if (paragraphElement) {
          // Add a small delay to ensure the DOM is fully rendered
          setTimeout(() => {
            const header = document.querySelector("header");
            const headerHeight = header ? header.offsetHeight : 60;
            const stickyHeadersHeight = 70; // Height of all sticky headers

            // Use larger offset
            const offset = headerHeight + stickyHeadersHeight;

            window.scrollTo({
              top: paragraphElement.offsetTop - offset,
              behavior: "smooth",
            });

            // Highlight the paragraph temporarily
            paragraphElement.classList.add("bg-yellow-100", "dark:bg-yellow-900");
            setTimeout(() => {
              paragraphElement.classList.remove("bg-yellow-100", "dark:bg-yellow-900");
            }, 2000);
          }, 300);
        }
      }
    }
  }, [paragraphNumber, paragraphs]);

  // Theme-related utility functions
  const getFontFamilyClass = () => (theme.fontFamily === "serif" ? "font-serif" : "font-sans");
  
  const getFontSizeClass = () => {
    switch (theme.fontSize) {
      case "small":
        return "text-sm";
      case "large":
        return "text-lg";
      case "xlarge":
        return "text-xl";
      default:
        return "text-base"; // medium
    }
  };
  
  const getLineSpacingClass = () => {
    switch (theme.lineSpacing) {
      case "compact":
        return "leading-snug";
      case "relaxed":
        return "leading-relaxed";
      default:
        return "leading-normal"; // normal
    }
  };
  
  const getMarginWidthClass = () => {
    switch (theme.marginWidth) {
      case "narrow":
        return "mx-2 md:mx-4";
      case "wide":
        return "mx-8 md:mx-16";
      default:
        return "mx-4 md:mx-8"; // medium
    }
  };

  // Get the background and text colors based on theme
  const getThemeColors = () => {
    switch (theme.colorScheme) {
      case "light":
        return "bg-white text-gray-900";
      case "sepia":
        return "bg-amber-50 text-amber-900";
      case "dark":
      default:
        return "bg-gray-900 text-white";
    }
  };

  // Determine theme style (modern vs traditional)
  const isModernTheme = theme.fontFamily === "sans";

  if (loading) {
    return (
      <div className={`p-8 text-center ${getThemeColors()}`}>
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4">Loading content...</p>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-400 text-center">{error}</div>;
  }

  return (
    <div className={`relative ${getThemeColors()}`}>
      {/* Sticky Headers */}
      <StickyHeaders
        activePart={activePart}
        paperTitle={selectedPaper}
        sections={sections}
        onSectionSelect={scrollToSection}
      />

      {/* Content Area */}
      <div className="pt-32">
        {" "}
        {/* Padding top to account for sticky headers */}
        <div
          className={`
            ${getFontFamilyClass()} 
            ${getFontSizeClass()} 
            ${getLineSpacingClass()} 
            ${getMarginWidthClass()} 
            p-4 transition-colors duration-300 max-w-4xl mx-auto
            ${isModernTheme ? "modern-theme" : "traditional-theme"}
          `}
        >
          <h1
            className={`font-bold mb-6 text-center ${
              getFontSizeClass() === "text-sm"
                ? "text-xl"
                : getFontSizeClass() === "text-base"
                ? "text-2xl"
                : getFontSizeClass() === "text-lg"
                ? "text-3xl"
                : "text-4xl"
            }`}
          >
            {selectedPaper}
          </h1>

          {/* Content organized by sections */}
          {sections.map((section) => {
            // Get section index from the ID
            const sectionId = section.id;
            const sectionIndex = parseInt(sectionId.replace('section-', ''));
            
            // Filter paragraphs that belong to this section
            const sectionParagraphs = paragraphs.filter(
              p => p.sectionIndex === sectionIndex
            );
            
            return (
              <div key={section.id} id={section.id} className="mb-8">
                <h2
                  className={`font-semibold mb-4 pt-4 border-t border-opacity-20 border-current ${
                    getFontSizeClass() === "text-sm"
                      ? "text-lg"
                      : getFontSizeClass() === "text-base"
                      ? "text-xl"
                      : getFontSizeClass() === "text-lg"
                      ? "text-2xl"
                      : "text-3xl"
                  }`}
                >
                  {sectionIndex}. {section.title ? section.title.toUpperCase() : ""}
                </h2>

                {/* Show paragraphs that belong to this section */}
                {sectionParagraphs.map((paragraph) => (
                  <p
                    key={paragraph.id}
                    id={paragraph.id}
                    className="mb-4 transition-colors duration-300"
                  >
                    {paragraph.text}
                  </p>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EnhancedReadingArea;
