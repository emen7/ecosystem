"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../contexts/ThemeContext";

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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

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

  // Handle clicks outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        // Add a small delay to ensure click events complete before closing
        setTimeout(() => {
          setIsSectionDropdownOpen(false);
        }, 100);
      }
    };

    // Add escape key handler
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSectionDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  // Get current section title
  const currentSection =
    sections.find((section) => section.id === activeSection)?.title || "";

  // Handle section selection from dropdown
  const handleSectionSelect = (sectionId: string) => {
    onSectionSelect(sectionId);
    setIsSectionDropdownOpen(false);
  };

  // Get background color based on theme
  const getBgColor = () => {
    return theme.colorScheme === "dark" 
      ? "bg-gray-900" 
      : theme.colorScheme === "light" 
        ? "bg-white" 
        : "bg-amber-50"; // sepia
  };

  // Get text color based on theme
  const getTextColor = () => {
    return theme.colorScheme === "dark" 
      ? "text-white text-gray-300 text-gray-400" 
      : theme.colorScheme === "light" 
        ? "text-gray-900 text-gray-700 text-gray-500" 
        : "text-amber-900 text-amber-800 text-amber-700"; // sepia
  };

  // Get border color based on theme
  const getBorderColor = () => {
    return theme.colorScheme === "dark" 
      ? "border-gray-700" 
      : theme.colorScheme === "light" 
        ? "border-gray-200" 
        : "border-amber-200"; // sepia
  };

  // Get button background color based on theme
  const getButtonBgColor = () => {
    return theme.colorScheme === "dark" 
      ? "bg-gray-800 hover:bg-gray-700" 
      : theme.colorScheme === "light" 
        ? "bg-gray-100 hover:bg-gray-200" 
        : "bg-amber-100 hover:bg-amber-200"; // sepia
  };

  // Get dropdown background color based on theme
  const getDropdownBgColor = () => {
    return theme.colorScheme === "dark" 
      ? "bg-gray-800 border-gray-700" 
      : theme.colorScheme === "light" 
        ? "bg-white border-gray-200" 
        : "bg-amber-50 border-amber-200"; // sepia
  };

  // Get dropdown item hover color based on theme
  const getDropdownItemHoverColor = () => {
    return theme.colorScheme === "dark" 
      ? "hover:bg-gray-700" 
      : theme.colorScheme === "light" 
        ? "hover:bg-gray-100" 
        : "hover:bg-amber-100"; // sepia
  };

  // Get active dropdown item color based on theme
  const getActiveDropdownItemColor = () => {
    return "bg-blue-600 text-white";
  };

  return (
    <>
      {/* Sticky Part & Paper Title */}
      <div 
        ref={headerRef}
        className={`sticky top-14 z-10 ${getBgColor()} ${getBorderColor()} border-b py-1 px-4 max-w-4xl mx-auto w-full`}
      >
        <div className={`text-xs ${getTextColor().split(' ')[2]} text-center`}>{activePart}</div>
        <div className={`text-sm font-semibold ${getTextColor().split(' ')[0]} text-center`}>{paperTitle}</div>
      </div>
      
      {/* Sticky Section Title with Dropdown */}
      <div className={`sticky top-24 z-9 ${getBgColor()} ${getBorderColor()} border-b py-2 px-4 flex items-center max-w-4xl mx-auto w-full`}>
        {/* Section Jump Dropdown - Now on the left */}
        <div className="relative mr-3" ref={dropdownRef}>
          <button
            className={`flex items-center space-x-1 ${getButtonBgColor()} ${getTextColor().split(' ')[1]} px-2 py-1 rounded text-xs`}
            onClick={() => setIsSectionDropdownOpen(!isSectionDropdownOpen)}
            aria-expanded={isSectionDropdownOpen}
            aria-haspopup="true"
          >
            <span>Jump to Section</span>
            <svg 
              className="ml-1 h-4 w-4" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </button>
          
          {/* Dropdown Menu */}
          <div
            className={`absolute left-0 mt-1 w-64 ${getDropdownBgColor()} rounded-md shadow-lg z-50 transition-opacity duration-200 ease-in-out ${
              isSectionDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
            }`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="section-dropdown-button"
          >
            <div className="max-h-72 overflow-y-auto py-1">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    section.id === activeSection
                      ? getActiveDropdownItemColor()
                      : `${getTextColor().split(' ')[1]} ${getDropdownItemHoverColor()}`
                  }`}
                  onClick={() => handleSectionSelect(section.id)}
                  role="menuitem"
                >
                  {(index + 1) + ". " + (section.title || "")}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Section Title - Now on the right */}
        <div className={`text-sm ${getTextColor().split(' ')[1]} flex-1`}>
          {activeSection && sections.findIndex(s => s.id === activeSection) > -1 ? 
            `${sections.findIndex(s => s.id === activeSection) + 1}. ${currentSection}` : currentSection}
        </div>
      </div>
    </>
  );
};

export default StickyHeaders;
