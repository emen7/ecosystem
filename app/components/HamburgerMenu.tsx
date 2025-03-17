"use client";

import React, { useState } from 'react';

const papers = [
  { paper: 'Foreword', sections: Array.from({ length: 10 }, (_, j) => `Section ${j + 1}`) },
  ...Array.from({ length: 196 }, (_, i) => ({
    paper: `Paper ${i + 1}`,
    sections: Array.from({ length: Math.floor(Math.random() * 10) + 1 }, (_, j) => `Section ${j + 1}`),
  })),
];

const HamburgerMenu: React.FC<{ onSelectPaper: (paper: string, section: string) => void }> = ({ onSelectPaper }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openPaper, setOpenPaper] = useState<number | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const togglePaper = (index: number) => {
    if (openPaper === index) {
      onSelectPaper(papers[index].paper, '');
      setOpenPaper(null);
    } else {
      setOpenPaper(index);
    }
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="focus:outline-none">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-gray-800 text-white border rounded shadow-lg max-h-96 overflow-y-auto">
          <ul>
            {papers.map((paper, index) => (
              <li key={index} className="border-b border-gray-700">
                <button onClick={() => togglePaper(index)} className="w-full text-left px-4 py-2 hover:bg-gray-700">
                  {paper.paper}
                </button>
                {openPaper === index && (
                  <ul className="pl-4">
                    {paper.sections.map((section, secIndex) => (
                      <li key={secIndex} className="px-4 py-2 hover:bg-gray-600" onClick={() => onSelectPaper(paper.paper, section)}>
                        {section}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
