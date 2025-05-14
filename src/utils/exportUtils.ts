import { Document } from '../types/Document';

/**
 * Exports a document to various formats
 * 
 * Note: In a browser environment, we're limited in how we can generate
 * files like PDF or DOCX. This implementation creates plain text and 
 * triggers a download by creating a temporary anchor element.
 * 
 * For PDF/DOCX formats in a production environment, you might:
 * 1. Use a library like jsPDF or docx.js
 * 2. Send to a server for processing
 * 3. Use a more sophisticated client-side solution
 */
export const exportDocumentAs = (document: Document, format: 'pdf' | 'docx' | 'txt') => {
  const plainText = document.content.replace(/<[^>]*>/g, '');
  const title = document.title || 'Untitled Document';
  
  // Create filename with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${title.replace(/[^a-z0-9]/gi, '-')}-${timestamp}`;
  
  switch (format) {
    case 'txt':
      downloadTextFile(`${title}\n\n${plainText}`, `${filename}.txt`);
      break;
      
    case 'pdf':
      // In a real implementation, this would use jsPDF or similar
      alert('PDF export would be implemented with a PDF generation library in production.');
      downloadTextFile(`${title}\n\n${plainText}`, `${filename}.txt`);
      break;
      
    case 'docx':
      // In a real implementation, this would use docx.js or similar
      alert('DOCX export would be implemented with a DOCX generation library in production.');
      downloadTextFile(`${title}\n\n${plainText}`, `${filename}.txt`);
      break;
  }
};

/**
 * Helper function to download text as a file
 */
const downloadTextFile = (text: string, filename: string) => {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
};