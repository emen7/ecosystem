# Comprehensive UI Implementation Plan

Based on our agreement to pursue a comprehensive approach to UI improvements, this document outlines a detailed implementation plan to transform the HTML demo into React components for the UB Reader application.

## Core Components to Create

### 1. NavigationMenu Component

The navigation menu is the most complex component and needs to be completely restructured to match the HTML demo.

```typescript
// app/components/NavigationMenu.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Part {
  id: string;
  title: string;
  papers: Paper[];
}

interface Paper {
  id: string;
  number: string;
  title: string;
}

const NavigationMenu: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  // State for tracking which part is expanded
  const [activePart, setActivePart] = useState<string>("part1");
  const pathname = usePathname();
  const { theme } = useTheme();

  // Define the parts structure
  const parts: Part[] = [
    {
      id: "part1",
      title: "PART I: THE CENTRAL AND SUPERUNIVERSES",
      papers: [
        { id: "paper1", number: "1", title: "The Universal Father" },
        { id: "paper2", number: "2", title: "The Nature of God" },
        // More papers...
      ],
    },
    {
      id: "part2",
      title: "PART II: THE LOCAL UNIVERSE",
      papers: [
        {
          id: "paper32",
          number: "32",
          title: "The Evolution of Local Universes",
        },
        // More papers...
      ],
    },
    // Part III and IV...
  ];

  // Toggle part expansion
  const togglePart = (partId: string) => {
    setActivePart(partId === activePart ? "" : partId);
  };

  // Check if current page is a specific paper
  const isPaperActive = (paperNumber: string) => {
    return pathname.includes(`/paper/${paperNumber}`);
  };

  return (
    <>
      {/* Overlay that closes navigation when clicked */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Navigation menu */}
      <nav
        className={`fixed top-14 left-0 bottom-0 w-72 bg-gray-800 border-r border-gray-700 z-40 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } overflow-hidden flex flex-col`}
      >
        {/* Active Part (top) */}
        <div className="nav-fixed-top bg-gray-800 border-b border-gray-700">
          {parts.map(
            (part) =>
              part.id === activePart && (
                <div key={`active-${part.id}`}>
                  <button
                    className="part-toggle active expanded w-full text-left py-2 px-3 text-sm font-semibold text-gray-200 bg-gray-800 flex justify-between items-center hover:bg-gray-700"
                    onClick={() => togglePart(part.id)}
                  >
                    {part.title}
                    <i
                      className={`fas fa-chevron-down transform ${
                        activePart === part.id ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </i>
                  </button>

                  <div
                    className={`max-h-96 overflow-y-auto transition-all duration-300 ${
                      activePart === part.id
                        ? "max-h-96"
                        : "max-h-0 overflow-hidden"
                    }`}
                  >
                    <ul className="nav-list pl-3 py-1">
                      {part.papers.map((paper) => (
                        <li key={paper.id}>
                          <Link
                            href={`/paper/${paper.number}`}
                            className={`block px-3 py-1 text-sm rounded ${
                              isPaperActive(paper.number)
                                ? "bg-blue-600 text-white"
                                : "text-gray-300 hover:bg-gray-700"
                            }`}
                          >
                            Paper {paper.number}: {paper.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
          )}
        </div>

        {/* Scrollable middle section */}
        <div className="flex-grow overflow-y-auto">
          {/* Content will be dynamically generated when scrolling */}
        </div>

        {/* Inactive Parts (bottom) */}
        <div className="nav-fixed-bottom bg-gray-800 border-t border-gray-700">
          {parts.map(
            (part) =>
              part.id !== activePart && (
                <div key={`inactive-${part.id}`}>
                  <button
                    className="part-toggle w-full text-left py-2 px-3 text-sm font-semibold text-gray-400 bg-gray-800 flex justify-between items-center hover:bg-gray-700"
                    onClick={() => togglePart(part.id)}
                  >
                    {part.title}
                    <i className="fas fa-chevron-down">▼</i>
                  </button>

                  <div className="max-h-0 overflow-hidden">
                    {/* Content will be shown when expanded */}
                  </div>
                </div>
              )
          )}
        </div>
      </nav>
    </>
  );
};

export default NavigationMenu;
```

### 2. StickyHeaders Component

This component will handle the sticky header functionality, showing the current part, paper, and section titles as the user scrolls.

```typescript
// app/components/StickyHeaders.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

interface StickyHeadersProps {
  activePart: string;
  paperTitle: string;
  sections: { id: string; title: string }[];
  onSectionSelect: (sectionId: string) => void;
}

const StickyHeaders: React.FC<StickyHeadersProps> = ({
  activePart,
  paperTitle,
  sections,
  onSectionSelect,
}) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isSectionDropdownOpen, setIsSectionDropdownOpen] = useState(false);
  const { theme } = useTheme();

  // Initialize observer for sections
  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Get entries that are intersecting (visible)
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          // Sort by their position on the page (top to bottom)
          const sortedVisible = [...visibleEntries].sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );

          // Use the first visible section as the active one
          const topSection = sortedVisible[0];
          setActiveSection(topSection.target.id);
        }
      },
      {
        root: null, // viewport
        rootMargin: "-150px 0px 0px 0px", // Top margin to account for the header
        threshold: [0.25, 0.4, 0.5, 0.75, 1], // When these percentages are visible
      }
    );

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  // Get current section title
  const currentSection =
    sections.find((section) => section.id === activeSection)?.title || "";

  // Handle section selection from dropdown
  const handleSectionSelect = (sectionId: string) => {
    onSectionSelect(sectionId);
    setIsSectionDropdownOpen(false);
  };

  const darkMode = theme?.colorScheme === "dark";

  return (
    <>
      {/* Sticky Part & Paper Title */}
      <div className="sticky top-14 z-10 bg-gray-900 border-b border-gray-700 py-1 px-4 max-w-4xl mx-auto w-full">
        <div className="text-xs text-gray-400 text-center">{activePart}</div>
        <div className="text-sm font-semibold text-white text-center">
          {paperTitle}
        </div>
      </div>

      {/* Sticky Section Title with Dropdown */}
      <div className="sticky top-24 z-9 bg-gray-900 border-b border-gray-700 py-2 px-4 flex items-center max-w-4xl mx-auto w-full">
        <div className="text-sm text-gray-300 flex-1">{currentSection}</div>

        {/* Section Jump Dropdown */}
        <div className="relative">
          <button
            className="flex items-center space-x-1 bg-gray-800 hover:bg-gray-700 text-white px-2 py-1 rounded text-xs"
            onClick={() => setIsSectionDropdownOpen(!isSectionDropdownOpen)}
          >
            <span>Jump to Section</span>
            <span>▼</span>
          </button>

          {/* Dropdown Menu */}
          <div
            className={`absolute right-0 mt-1 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50 ${
              isSectionDropdownOpen ? "block" : "hidden"
            }`}
          >
            <ul className="py-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      section.id === activeSection
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-gray-700"
                    }`}
                    onClick={() => handleSectionSelect(section.id)}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default StickyHeaders;
```

### 3. Enhanced ThemeContext Implementation

Ensuring the theme functionality works correctly across all components.

```typescript
// app/contexts/ThemeContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Define theme option types
export type ColorScheme = "light" | "dark" | "sepia";
export type FontFamily = "sans" | "serif";
export type FontSize = "small" | "medium" | "large" | "xlarge";
export type LineSpacing = "compact" | "normal" | "relaxed";
export type MarginWidth = "narrow" | "medium" | "wide";

export interface ThemeOption {
  colorScheme: ColorScheme;
  fontFamily: FontFamily;
  fontSize: FontSize;
  lineSpacing: LineSpacing;
  marginWidth: MarginWidth;
}

interface ThemeContextType {
  theme: ThemeOption;
  updateTheme: (newTheme: Partial<ThemeOption>) => void;
}

// Define default theme settings
const defaultTheme: ThemeOption = {
  colorScheme: "dark",
  fontFamily: "sans",
  fontSize: "medium",
  lineSpacing: "normal",
  marginWidth: "medium",
};

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeOption>(defaultTheme);

  // Load theme from localStorage on initial mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("reader-theme");
    if (savedTheme) {
      try {
        setTheme(JSON.parse(savedTheme));
      } catch (e) {
        console.error("Failed to parse saved theme:", e);
      }
    }
  }, []);

  // Apply theme to document when it changes
  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem("reader-theme", JSON.stringify(theme));

    // Apply theme classes to document body
    const body = document.body;

    // Clear existing theme classes
    body.classList.remove("light-theme", "dark-theme", "sepia-theme");

    // Add current theme class
    body.classList.add(`${theme.colorScheme}-theme`);

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        theme.colorScheme === "dark"
          ? "#1a202c"
          : theme.colorScheme === "light"
          ? "#ffffff"
          : "#f8f1e3" // sepia
      );
    }
  }, [theme]);

  const updateTheme = (newTheme: Partial<ThemeOption>) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      ...newTheme,
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeContext;
```

### 4. Enhanced ReadingArea Component

```typescript
// app/components/ReadingArea.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import StickyHeaders from "./StickyHeaders";

interface ReadingAreaProps {
  selectedPaper: string;
  selectedSection: string;
  paragraphNumber?: string;
}

const ReadingArea: React.FC<ReadingAreaProps> = ({
  selectedPaper,
  selectedSection,
  paragraphNumber,
}) => {
  const { theme } = useTheme();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paragraphs, setParagraphs] = useState<
    Array<{ id: string; text: string }>
  >([]);
  const [sections, setSections] = useState<
    Array<{ id: string; title: string }>
  >([]);
  const [activePart, setActivePart] = useState(
    "Part I: The Central and Superuniverses"
  );

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
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();

        // Extract sections
        const sectionItems = data.filter(
          (item: any) => item.type === "section"
        );

        setSections(
          sectionItems.map((item: any) => ({
            id: `section-${item.paperSectionId.split(".")[1]}`,
            title: item.title,
          }))
        );

        if (selectedSection) {
          const sectionMatch = selectedSection.match(/\d+/);
          const sectionNumber = sectionMatch ? sectionMatch[0] : null;

          if (sectionNumber) {
            const sectionContent = data.find(
              (item: any) =>
                item.paperSectionId === `${paperNumber}.${sectionNumber}`
            );

            if (sectionContent && sectionContent.text) {
              setContent(sectionContent.text);

              // Process paragraphs for the section
              const paragraphItems = data.filter(
                (item: any) =>
                  item.type === "paragraph" &&
                  item.paperSectionId === `${paperNumber}.${sectionNumber}`
              );

              setParagraphs(
                paragraphItems.map((item: any, index: number) => ({
                  id: `p-${paperNumber}-${sectionNumber}-${index + 1}`,
                  text: item.text,
                }))
              );
            } else {
              setContent("Section content not found.");
              setParagraphs([]);
            }
          } else {
            setContent("Invalid section selection.");
            setParagraphs([]);
          }
        } else {
          // If no section is selected, show paper content
          const paragraphItems = data.filter(
            (item: any) => item.type === "paragraph"
          );

          const paperContent = paragraphItems
            .map((item: any) => item.text)
            .join("\n\n");

          setParagraphs(
            paragraphItems.map((item: any, index: number) => {
              const sectionId = item.paperSectionId?.split(".")[1] || "0";
              return {
                id: `p-${paperNumber}-${sectionId}-${index + 1}`,
                text: item.text,
              };
            })
          );

          setContent(paperContent || "No content found for this paper.");
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

  // Scroll to section or paragraph
  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight : 60;
      const stickyPartHeight = 40; // Height of sticky part and paper headers

      // Use larger offset to account for headers
      const offset = headerHeight + stickyPartHeight;

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
            paragraphElement.classList.add(
              "bg-yellow-100",
              "dark:bg-yellow-900"
            );
            setTimeout(() => {
              paragraphElement.classList.remove(
                "bg-yellow-100",
                "dark:bg-yellow-900"
              );
            }, 2000);
          }, 300);
        }
      }
    }
  }, [paragraphNumber, paragraphs]);

  // Theme-related utility functions
  const getFontFamilyClass = () =>
    theme.fontFamily === "serif" ? "font-serif" : "font-sans";
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

  // Determine theme style (modern vs traditional)
  const isModernTheme = theme.fontFamily === "sans";

  if (loading) {
    return (
      <div className="p-4 text-gray-300 text-center">Loading content...</div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-400 text-center">{error}</div>;
  }

  return (
    <div className="relative">
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

          {sections.map((section, sectionIndex) => (
            <div key={section.id} id={section.id} className="mb-8">
              <h2
                className={`font-semibold mb-4 pt-4 border-t border-gray-700 ${
                  getFontSizeClass() === "text-sm"
                    ? "text-lg"
                    : getFontSizeClass() === "text-base"
                    ? "text-xl"
                    : getFontSizeClass() === "text-lg"
                    ? "text-2xl"
                    : "text-3xl"
                }`}
              >
                {section.title}
              </h2>

              {/* Show paragraphs that belong to this section */}
              {paragraphs
                .filter((p) => p.id.includes(`-${sectionIndex + 1}-`))
                .map((paragraph) => (
                  <p
                    key={paragraph.id}
                    id={paragraph.id}
                    className="mb-4 transition-colors duration-300"
                  >
                    {paragraph.text}
                  </p>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadingArea;
```

### 5. Main Layout Updates

```typescript
// app/layout.tsx
import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./globals.css";
import "./ui-fixes.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#1a202c" />
      </head>
      <body className="bg-gray-900 text-white dark-theme">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

## Implementation Steps

### Phase 1: Project Setup (Days 1-2)

1. Create the new components based on the HTML demo
2. Set up the basic structure without full functionality
3. Verify they can be integrated into the existing application

### Phase 2: Core Functionality (Days 3-5)

1. Implement the navigation structure with collapsible Parts
2. Set up the sticky headers with proper positioning
3. Implement the theme switching functionality
4. Connect the components to the data sources

### Phase 3: Integration & Testing (Days 6-7)

1. Finalize styling to match the HTML demo
2. Test across different screen sizes
3. Test with all theme combinations
4. Fix any remaining bugs

### Phase 4: Deployment (Day 8)

1. Push all changes to GitHub
2. Verify automatic deployment to Vercel
3. Test on the live site

## Implementation Approach

Rather than trying to fix the current components, we will:

1. Create the new components in parallel to the existing ones
2. Implement a new top-level page component that uses these new components
3. Once everything is working, replace the old page component with the new one

This approach allows us to develop and test the new components without disrupting the existing functionality, and makes it easier to roll back if needed.

## Next Step

Start by creating the NavigationMenu component, which is the most complex component and forms the foundation of the UI structure.
