import React from 'react';
import { Document } from '../types/Document';
import ScoreRadarChart from './charts/ScoreRadarChart';
import ScoreBreakdown from './ScoreBreakdown';
import { AlertTriangle } from 'lucide-react';

interface ScoreSidebarProps {
  isOpen: boolean;
  document: Document;
}

const ScoreSidebar: React.FC<ScoreSidebarProps> = ({ isOpen, document }) => {
  if (!isOpen) return null;

  const hasScores = document.scores && Object.keys(document.scores).length > 0;
  const minContentForAnalysis = 20; // Minimum number of words needed for analysis
  const wordCount = document.content 
    ? document.content.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean).length 
    : 0;
  
  const needsMoreContent = wordCount < minContentForAnalysis;

  return (
    <aside className={`w-full sm:w-80 bg-white border-l border-gray-200 fixed right-0 top-14 bottom-0 overflow-y-auto p-3 sm:p-4 shadow-md transition-all duration-300 ease-in-out z-30 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    } lg:relative lg:top-0 lg:translate-x-0 lg:shadow-none lg:z-0`}>
      <h2 className="text-lg font-bold mb-4 text-primary-500">Analysis Dashboard</h2>
      
      {needsMoreContent ? (
        <div className="bg-secondary-50 border border-secondary-200 rounded-md p-4 mb-6">
          <div className="flex items-start mb-2">
            <AlertTriangle className="text-secondary-500 h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
            <h3 className="font-medium text-secondary-700">Waiting for more content</h3>
          </div>
          <p className="text-secondary-600 text-sm">
            Please write at least {minContentForAnalysis} words to receive a complete analysis of your text.
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
            <div 
              className="bg-secondary-500 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min(100, (wordCount / minContentForAnalysis) * 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {wordCount} / {minContentForAnalysis} words
          </p>
        </div>
      ) : !hasScores ? (
        <div className="flex items-center justify-center h-40">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-3"></div>
            <p className="text-gray-500">Analyzing your text...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h3 className="text-md font-medium mb-3 text-gray-700">Overall Score</h3>
            <div className="flex items-center justify-center bg-gray-50 rounded-lg p-4 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl font-bold text-primary-500">
                  {Math.round(document.scores.overall)}
                </div>
              </div>
              <ScoreRadarChart scores={document.scores} />
            </div>
          </div>
          
          <ScoreBreakdown document={document} />
        </>
      )}
      
      <div className="mt-6 border-t border-gray-200 pt-4">
        <h3 className="text-md font-medium mb-3 text-gray-700">About REALSCORE</h3>
        <p className="text-sm text-gray-600 mb-3">
          This tool uses advanced machine learning to analyze your writing in real-time, completely in your browser. Your text never leaves your device.
        </p>
        <p className="text-sm text-gray-600">
          The analysis evaluates grammar, coherence, vocabulary, and overall quality to help you improve your writing.
        </p>
      </div>
    </aside>
  );
};

export default ScoreSidebar;