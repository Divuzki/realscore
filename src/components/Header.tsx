import React, { useState } from 'react';
import { 
  Menu, 
  PanelRight, 
  FileText, 
  FilePlus, 
  Download, 
  Save,
  ChevronDown
} from 'lucide-react';
import { Document } from '../types/Document';
import { exportDocumentAs } from '../utils/exportUtils';
import LogoIcon from './LogoIcon';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
  onNewDocument: () => void;
  currentDocument: Document | null;
  documentsList: Document[];
  onDocumentSelect: (doc: Document) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  toggleSidebar, 
  sidebarOpen, 
  onNewDocument,
  currentDocument,
  documentsList,
  onDocumentSelect
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);
  
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleExportDropdown = () => setExportDropdownOpen(!exportDropdownOpen);
  
  const handleExport = (format: 'pdf' | 'docx' | 'txt') => {
    if (currentDocument) {
      exportDocumentAs(currentDocument, format);
    }
    setExportDropdownOpen(false);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <header className="bg-white shadow-md px-4 py-2 flex items-center justify-between z-10">
      <div className="flex items-center">
        <LogoIcon className="h-8 w-8 text-primary-500 mr-2" />
        <h1 className="text-xl font-bold text-primary-500">REALSCORE</h1>
      </div>
      
      <div className="flex-1 mx-8">
        {currentDocument && (
          <div className="relative inline-block text-left">
            <button 
              onClick={toggleDropdown}
              className="flex items-center text-gray-700 hover:text-primary-500 transition-colors"
            >
              <FileText className="h-4 w-4 mr-2" />
              <span className="font-medium mr-2 truncate max-w-xs">
                {currentDocument.title || 'Untitled Document'}
              </span>
              <span className="text-xs text-gray-500">
                Last modified: {formatDate(currentDocument.lastModified)}
              </span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg z-20">
                <div className="py-1 max-h-64 overflow-y-auto">
                  {documentsList.map(doc => (
                    <button
                      key={doc.id}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        doc.id === currentDocument.id ? 'bg-primary-50 text-primary-500' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => {
                        onDocumentSelect(doc);
                        setDropdownOpen(false);
                      }}
                    >
                      <div className="font-medium truncate">{doc.title || 'Untitled Document'}</div>
                      <div className="text-xs text-gray-500">{formatDate(doc.lastModified)}</div>
                    </button>
                  ))}
                </div>
                <div className="border-t border-gray-100">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-primary-500 hover:bg-gray-100 flex items-center"
                    onClick={() => {
                      onNewDocument();
                      setDropdownOpen(false);
                    }}
                  >
                    <FilePlus className="h-4 w-4 mr-2" />
                    New Document
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        {currentDocument && (
          <>
            <div className="relative">
              <button
                onClick={toggleExportDropdown}
                className="flex items-center text-gray-700 hover:text-primary-500 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              
              {exportDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-20">
                  <div className="py-1">
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleExport('pdf')}
                    >
                      Export as PDF
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleExport('docx')}
                    >
                      Export as DOCX
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleExport('txt')}
                    >
                      Export as TXT
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <button
              className="flex items-center text-gray-700 hover:text-primary-500 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => {
                // Intentionally left empty, auto-save is implemented
              }}
            >
              <Save className="h-4 w-4 mr-2" />
              Auto-Saved
            </button>
          </>
        )}
        
        <button
          className={`flex items-center text-gray-700 hover:text-primary-500 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors ${
            sidebarOpen ? 'bg-gray-100' : ''
          }`}
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <PanelRight className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;