export interface Scores {
  grammar: number;     // Score for grammar and syntax
  coherence: number;   // Score for text coherence and organization
  vocabulary: number;  // Score for vocabulary richness
  relevance: number;   // Score for topic relevance
  overall: number;     // Overall quality score
  confidence: number;  // Confidence in the scores
}

export interface Document {
  id: string;
  title: string;
  content: string;
  created: string;     // ISO string
  lastModified: string; // ISO string
  scores?: Scores;     // Optional scores object
}