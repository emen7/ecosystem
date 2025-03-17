"use client";

import React, { useState } from 'react';

const papers = Array.from({ length: 197 }, (_, i) => ({
  paper: `Paper ${i}`,
  sections: Array.from({ length: Math.floor(Math.random() * 10) + 1 }, (_, j) => `Section ${j + 1}`),
}));

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    // Simulate search functionality based on urantia.org's book search
    const searchResults = papers.filter(paper =>
      paper.paper.toLowerCase().includes(query.toLowerCase()) ||
      paper.sections.some(section => section.toLowerCase().includes(query.toLowerCase()))
    );
    setResults(searchResults);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="border p-2 w-full mb-4"
      />
      <button onClick={handleSearch} className="bg-blue-600 text-white p-2 rounded">Search</button>
      <div className="mt-4">
        {results.map((result, index) => (
          <div key={index} className="border-b py-2">
            <h3 className="font-bold">{result.paper}</h3>
            <ul className="pl-4">
              {result.sections.map((section: string, secIndex: number) => (
                <li key={secIndex} className="px-4 py-2 hover:bg-gray-100">
                  {section}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
