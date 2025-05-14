import React from 'react';
import { FileText, FilePlus } from 'lucide-react';

interface EmptyStateProps {
  onNewDocument: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onNewDocument }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 bg-primary-50 rounded-full flex items-center justify-center">
            <FileText className="h-10 w-10 text-primary-500" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome to REALSCORE
        </h1>
        
        <p className="text-gray-600 mb-6">
          Create a new document to start receiving real-time analysis of your writing
        </p>
        
        <button
          onClick={onNewDocument}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-md flex items-center justify-center transition-colors"
        >
          <FilePlus className="h-5 w-5 mr-2" />
          Create New Document
        </button>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Key Features</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="font-medium text-primary-500">Real-time Analysis</p>
              <p className="text-gray-600">Get instant feedback as you write</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="font-medium text-primary-500">Complete Privacy</p>
              <p className="text-gray-600">All processing happens in your browser</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="font-medium text-primary-500">Multiple Metrics</p>
              <p className="text-gray-600">Grammar, coherence, vocabulary</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="font-medium text-primary-500">Export Options</p>
              <p className="text-gray-600">Save your work in multiple formats</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;