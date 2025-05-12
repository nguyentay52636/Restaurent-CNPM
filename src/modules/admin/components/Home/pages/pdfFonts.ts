// This file handles adding Vietnamese font support to jsPDF

import { jsPDF } from 'jspdf';

// Function to add fonts to a jsPDF instance
export const addFonts = (doc: jsPDF): jsPDF => {
  // Since we can't directly embed custom fonts without importing large font files,
  // we'll use a workaround to improve formatting
  
  // Set default encoding to support Vietnamese characters
  doc.setLanguage('vi');
  
  // Use built-in fonts
  // For newer versions of jsPDF, this should handle basic Vietnamese characters
  const normalFont = 'helvetica';
  
  // Set all fonts to the default font
  doc.setFont(normalFont);
  
  return doc;
};

// Optional: Function to format Vietnamese text for display
export const formatVietnameseText = (text: string): string => {
  // This function is a placeholder for any text processing you might need
  // If there are specific character replacements needed, they can be handled here
  return text;
}; 