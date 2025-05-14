import React, { useState } from 'react';
import { Document } from '../types/Document';
import { AlertCircle, Book, Lightbulb, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface ScoreBreakdownProps {
  document: Document;
}

interface ScoreCardProps {
  title: string;
  score: number;
  icon: React.ReactNode;
  description: string;
  suggestions: string[];
  colorClass: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ 
  title, 
  score, 
  icon, 
  description, 
  suggestions,
  colorClass 
}) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className={`mb-3 border rounded-lg overflow-hidden ${colorClass}`}>
      <div 
        className="flex items-center justify-between p-3 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          <div className="mr-3 flex-shrink-0">
            {icon}
          </div>
          <div>
            <h4 className="font-medium text-gray-800">{title}</h4>
            <div className="flex items-center">
              <div className="font-bold text-lg mr-2">{score.toFixed(1)}</div>
              <div className="text-xs text-gray-500">/ 10</div>
            </div>
          </div>
        </div>
        <button className="text-gray-500">
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>
      
      {expanded && (
        <div className="p-3 border-t bg-white">
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          
          {suggestions.length > 0 && (
            <div>
              <h5 className="text-sm font-medium mb-2">Suggestions:</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={16} className="text-success-500 mt-0.5 mr-1.5 flex-shrink-0" />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ document }) => {
  if (!document.scores) return null;
  
  const { grammar, coherence, vocabulary, relevance } = document.scores;
  
  // Generate contextual suggestions based on scores
  const grammarSuggestions = [
    grammar < 7 ? "Check for proper punctuation and sentence structure." : "Your grammar usage is solid.",
    grammar < 8 ? "Review subject-verb agreement in complex sentences." : "Continue maintaining strong grammar practices.",
    grammar < 6 ? "Consider varying sentence length for better readability." : "Your sentence structure shows good variety."
  ];
  
  const coherenceSuggestions = [
    coherence < 7 ? "Improve paragraph transitions to connect ideas better." : "Your ideas flow well between paragraphs.",
    coherence < 8 ? "Consider adding clearer topic sentences." : "Good use of topic sentences to guide readers.",
    coherence < 6 ? "Try to maintain a consistent point of view throughout." : "Your writing maintains excellent consistency."
  ];
  
  const vocabularySuggestions = [
    vocabulary < 7 ? "Replace common words with more precise alternatives." : "You use specific and precise vocabulary well.",
    vocabulary < 8 ? "Consider using more domain-specific terminology where appropriate." : "Good use of technical vocabulary.",
    vocabulary < 6 ? "Try to avoid repetitive word choices." : "Your vocabulary shows good variety."
  ];
  
  const relevanceSuggestions = [
    relevance < 7 ? "Make sure your key points directly address the main topic." : "Your content stays well-focused on the topic.",
    relevance < 8 ? "Eliminate tangential content that doesn't support your main argument." : "Good job maintaining topic relevance.",
    relevance < 6 ? "Consider adding more evidence or examples to support your points." : "Excellent use of supporting details."
  ];

  return (
    <div>
      <h3 className="text-md font-medium mb-3 text-gray-700">Detailed Breakdown</h3>
      
      <ScoreCard
        title="Grammar & Style"
        score={grammar}
        icon={<AlertCircle size={20} className="text-error-500" />}
        description="Evaluates your writing for grammar, punctuation, and sentence structure."
        suggestions={grammarSuggestions}
        colorClass={grammar < 5 ? "border-error-500 bg-error-50" : grammar < 7 ? "border-warning-500 bg-warning-50" : "border-success-500 bg-success-50"}
      />
      
      <ScoreCard
        title="Coherence & Organization"
        score={coherence}
        icon={<Book size={20} className="text-primary-500" />}
        description="Assesses how well your ideas flow and connect throughout the text."
        suggestions={coherenceSuggestions}
        colorClass={coherence < 5 ? "border-error-500 bg-error-50" : coherence < 7 ? "border-warning-500 bg-warning-50" : "border-success-500 bg-success-50"}
      />
      
      <ScoreCard
        title="Vocabulary Usage"
        score={vocabulary}
        icon={<Lightbulb size={20} className="text-secondary-500" />}
        description="Examines the variety and appropriateness of your word choices."
        suggestions={vocabularySuggestions}
        colorClass={vocabulary < 5 ? "border-error-500 bg-error-50" : vocabulary < 7 ? "border-warning-500 bg-warning-50" : "border-success-500 bg-success-50"}
      />
      
      <ScoreCard
        title="Topic Relevance"
        score={relevance}
        icon={<Check size={20} className="text-success-500" />}
        description="Measures how well your content stays focused on the main topic."
        suggestions={relevanceSuggestions}
        colorClass={relevance < 5 ? "border-error-500 bg-error-50" : relevance < 7 ? "border-warning-500 bg-warning-50" : "border-success-500 bg-success-50"}
      />
    </div>
  );
};

export default ScoreBreakdown;