"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../contexts/ThemeContext";
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
  const navRef = useRef<HTMLDivElement>(null);

  // Define the parts structure
  const parts: Part[] = [
    {
      id: "part1",
      title: "PART I: THE CENTRAL AND SUPERUNIVERSES",
      papers: [
        { id: "paper0", number: "0", title: "Foreword" },
        { id: "paper1", number: "1", title: "The Universal Father" },
        { id: "paper2", number: "2", title: "The Nature of God" },
        { id: "paper3", number: "3", title: "The Attributes of God" },
        { id: "paper4", number: "4", title: "God's Relation to the Universe" },
        { id: "paper5", number: "5", title: "God's Relation to the Individual" },
        // More papers would be added here
      ],
    },
    {
      id: "part2",
      title: "PART II: THE LOCAL UNIVERSE",
      papers: [
        { id: "paper32", number: "32", title: "The Evolution of Local Universes" },
        { id: "paper33", number: "33", title: "Administration of the Local Universe" },
        { id: "paper34", number: "34", title: "The Local Universe Mother Spirit" },
        { id: "paper35", number: "35", title: "The Local Universe Sons of God" },
        { id: "paper36", number: "36", title: "The Life Carriers" },
        // More papers would be added here
      ],
    },
    {
      id: "part3",
      title: "PART III: THE HISTORY OF URANTIA",
      papers: [
        { id: "paper57", number: "57", title: "The Origin of Urantia" },
        { id: "paper58", number: "58", title: "Life Establishment on Urantia" },
        { id: "paper59", number: "59", title: "The Marine-Life Era on Urantia" },
        { id: "paper60", number: "60", title: "Urantia During the Early Land-Life Era" },
        { id: "paper61", number: "61", title: "The Mammalian Era on Urantia" },
        // More papers would be added here
      ],
    },
    {
      id: "part4",
      title: "PART IV: THE LIFE AND TEACHINGS OF JESUS",
      papers: [
        { id: "paper120", number: "120", title: "The Bestowal of Michael on Urantia" },
        { id: "paper121", number: "121", title: "The Times of Michael's Bestowal" },
        { id: "paper122", number: "122", title: "Birth and Infancy of Jesus" },
        { id: "paper123", number: "123", title: "The Early Childhood of Jesus" },
        { id: "paper124", number: "124", title: "The Later Childhood of Jesus" },
        // More papers would be added here
      ],
    },
  ];

  // Toggle part expansion - when a part is clicked, it becomes active and others collapse
  const togglePart = (partId: string) => {
    setActivePart(prevActivePart => partId === prevActivePart ? "" : partId);
  };
  
  // Check if current page is a specific paper
  const isPaperActive = (paperNumber: string) => {
    return pathname.includes(`/paper/${paperNumber}`);
  };

  // Close menu when clicking outside or pressing escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (isOpen && event.key === "Escape") {
        onClose();
      }
    };

    // Determine which part should be active based on current paper
    const determineActivePart = () => {
      if (!pathname.includes('/paper/')) return;
      
      const match = pathname.match(/\/paper\/(\d+)/);
      if (!match) return;
      
      const paperNumber = parseInt(match[1]);
      
      if (paperNumber <= 31) {
        setActivePart("part1");
      } else if (paperNumber <= 56) {
        setActivePart("part2");
      } else if (paperNumber <= 119) {
        setActivePart("part3");
      } else {
        setActivePart("part4");
      }
    };

    determineActivePart();
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose, pathname]);

  return (
    <>
      {/* Overlay that closes navigation when clicked */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Navigation menu */}
      <nav 
        ref={navRef}
        className={`fixed top-14 left-0 bottom-0 w-72 bg-gray-800 border-r border-gray-700 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } overflow-hidden flex flex-col`}
        aria-label="Main Navigation"
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
                    aria-expanded={true}
                    aria-controls={`${part.id}-content`}
                  >
                    {part.title}
                    <svg
                      className="h-4 w-4 transform rotate-180 transition-transform duration-200"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  
                  <div 
                    className="max-h-96 overflow-y-auto transition-all duration-300"
                    id={`${part.id}-content`}
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
        
        {/* Scrollable middle section (for potential future content) */}
        <div className="flex-grow overflow-y-auto">
          {/* This section will remain empty or could be used for additional content */}
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
                    aria-expanded={false}
                    aria-controls={`${part.id}-content-collapsed`}
                  >
                    {part.title}
                    <svg
                      className="h-4 w-4 transition-transform duration-200"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  
                  <div 
                    className="max-h-0 overflow-hidden transition-all duration-300"
                    id={`${part.id}-content-collapsed`}
                  >
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
