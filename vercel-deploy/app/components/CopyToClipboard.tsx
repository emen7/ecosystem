"use client";

import React, { useState, useEffect } from 'react';

const CopyToClipboard: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    // Add event listener for text selection
    document.addEventListener('mouseup', handleTextSelection);
    document.addEventListener('touchend', handleTextSelection);

    // Clean up event listeners
    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
      document.removeEventListener('touchend', handleTextSelection);
    };
  }, []);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      // Show copy button near the selection
      showCopyButton(selection);
    } else {
      // Hide copy button if no text is selected
      hideCopyButton();
    }
  };

  const showCopyButton = (selection: Selection) => {
    // Remove any existing copy button
    hideCopyButton();

    // Create a new copy button
    const copyButton = document.createElement('button');
    copyButton.id = 'copy-button';
    copyButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
      </svg>
    `;
    copyButton.className = 'fixed bg-blue-500 text-white rounded-full p-2 shadow-lg z-50 transition-opacity duration-300';
    copyButton.style.opacity = '0.9';

    // Position the button near the selection
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    copyButton.style.top = `${rect.top + window.scrollY - 40}px`;
    copyButton.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;

    // Add click event to copy the selected text
    copyButton.addEventListener('click', () => {
      const text = selection.toString();
      navigator.clipboard.writeText(text)
        .then(() => {
          // Show success toast
          setToastMessage('Text copied to clipboard!');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
        })
        .catch(err => {
          // Show error toast
          setToastMessage('Failed to copy text: ' + err);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
        });
      
      // Hide the button after copying
      hideCopyButton();
    });

    // Add the button to the document
    document.body.appendChild(copyButton);

    // Hide the button after 3 seconds of inactivity
    setTimeout(hideCopyButton, 3000);
  };

  const hideCopyButton = () => {
    const existingButton = document.getElementById('copy-button');
    if (existingButton) {
      existingButton.remove();
    }
  };

  return (
    <>
      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-300">
          {toastMessage}
        </div>
      )}
    </>
  );
};

export default CopyToClipboard;
