/**
 * This file contains utility functions for text analysis.
 * 
 * NOTE: These are simplified implementations that approximate what would
 * normally be done with more complex NLP models. In a production environment,
 * these would be replaced with true ML models.
 */

// Analyzes grammar and syntax - returns a score from 0-10
export const analyzeSyntax = (text: string): number => {
  // A simplified implementation that checks for common issues
  
  // Check for sentence capitalization
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const properlyCapitalized = sentences.filter(s => {
    const trimmed = s.trim();
    return trimmed.length > 0 && 
           trimmed[0] === trimmed[0].toUpperCase();
  }).length;
  
  let capitalizationScore = sentences.length > 0 
    ? (properlyCapitalized / sentences.length) * 10
    : 5;
  
  // Check for punctuation issues
  const punctuationMistakes = (text.match(/\s[,.!?;:]/g) || []).length;
  const punctuationScore = Math.max(0, 10 - punctuationMistakes);
  
  // Check for run-on sentences
  const longSentences = sentences.filter(s => s.split(' ').length > 30).length;
  const sentenceLengthScore = Math.max(0, 10 - longSentences * 2);
  
  // Calculate final score
  const finalScore = (capitalizationScore + punctuationScore + sentenceLengthScore) / 3;
  
  // Add a bit of randomness to simulate model variability
  const variability = (Math.random() * 2 - 1) * 0.5;
  
  return Math.min(10, Math.max(1, finalScore + variability));
};

// Analyzes coherence and organization - returns a score from 0-10
export const analyzeCoherence = (text: string): number => {
  // A simplified implementation that checks for text flow
  
  // Split into paragraphs
  const paragraphs = text.split(/\n\s*\n/).filter(Boolean);
  
  if (paragraphs.length <= 1) {
    return 5.5; // Not enough paragraphs to analyze structure
  }
  
  // Check paragraph length distribution
  const paragraphLengths = paragraphs.map(p => p.length);
  const avgLength = paragraphLengths.reduce((a, b) => a + b, 0) / paragraphLengths.length;
  const stdDev = Math.sqrt(
    paragraphLengths.map(x => Math.pow(x - avgLength, 2))
      .reduce((a, b) => a + b, 0) / paragraphLengths.length
  );
  
  // More consistent paragraph lengths can indicate better structure
  const structureScore = Math.max(0, 10 - (stdDev / avgLength) * 5);
  
  // Check for transition words between paragraphs
  const transitionWords = ['however', 'therefore', 'consequently', 'furthermore', 
                          'additionally', 'moreover', 'in addition', 'on the other hand'];
  
  let transitionCount = 0;
  for (let i = 1; i < paragraphs.length; i++) {
    const firstSentence = paragraphs[i].split('.')[0].toLowerCase();
    if (transitionWords.some(word => firstSentence.includes(word))) {
      transitionCount++;
    }
  }
  
  const transitionScore = (transitionCount / (paragraphs.length - 1)) * 10;
  
  // Calculate final score
  const finalScore = (structureScore * 0.6 + transitionScore * 0.4);
  
  // Add some randomness
  const variability = (Math.random() * 2 - 1) * 0.8;
  
  return Math.min(10, Math.max(1, finalScore + variability));
};

// Analyzes vocabulary richness - returns a score from 0-10
export const analyzeVocabulary = (text: string): number => {
  // A simplified implementation that checks for vocabulary diversity
  
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  
  if (words.length < 10) {
    return 5; // Not enough text to analyze
  }
  
  // Count unique words
  const uniqueWords = new Set(words);
  
  // Calculate Type-Token Ratio (TTR)
  const ttr = uniqueWords.size / words.length;
  
  // Average word length
  const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;
  
  // Calculate scores
  const diversityScore = ttr * 20; // TTR typically ranges from 0.3 to 0.7
  const complexityScore = Math.min(10, avgWordLength * 2); // Word length as proxy for complexity
  
  // Calculate final score
  const finalScore = (diversityScore * 0.7 + complexityScore * 0.3);
  
  // Add some randomness
  const variability = (Math.random() * 2 - 1) * 0.5;
  
  return Math.min(10, Math.max(1, finalScore + variability));
};

// Analyzes topic relevance - returns a score from 0-10
export const analyzeRelevance = (text: string): number => {
  // This is a placeholder that would normally use more sophisticated NLP
  // Since we don't have a reference topic, we'll return a simulated score
  
  // In a real implementation, this would compare embeddings between the text
  // and a reference topic or analyze keyword density
  
  // We'll simulate a relatively good score with some variability
  const baseScore = 7.5;
  const variability = (Math.random() * 2 - 1) * 1.5;
  
  return Math.min(10, Math.max(1, baseScore + variability));
};

// Calculate overall score from individual scores
export const calculateOverallScore = (scores: number[]): number => {
  if (scores.length === 0) return 0;
  
  // We could use weighted averages here if some aspects are more important
  const weights = [0.3, 0.3, 0.2, 0.2]; // Grammar, Coherence, Vocabulary, Relevance
  
  let weightedSum = 0;
  let weightSum = 0;
  
  for (let i = 0; i < scores.length; i++) {
    weightedSum += scores[i] * (weights[i] || 1);
    weightSum += (weights[i] || 1);
  }
  
  return weightedSum / weightSum;
};