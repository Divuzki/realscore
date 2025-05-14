import { useState, useEffect, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import { load as loadUSE } from '@tensorflow-models/universal-sentence-encoder';
import { Scores } from '../types/Document';
import {
  analyzeSyntax,
  analyzeCoherence,
  analyzeVocabulary,
  analyzeRelevance,
  calculateOverallScore
} from '../utils/textAnalysisUtils';

export enum ModelStatus {
  IDLE = 'idle',
  INITIALIZING = 'initializing',
  DOWNLOADING = 'downloading',
  LOADING = 'loading',
  PREPARING = 'preparing',
  READY = 'ready',
  ERROR = 'error'
}

export const useTensorflowModels = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modelStatus, setModelStatus] = useState<ModelStatus>(ModelStatus.IDLE);
  const [useModel, setUseModel] = useState<any>(null);

  // Initialize TensorFlow.js and load models
  useEffect(() => {
    const initializeTensorflow = async () => {
      try {
        setModelStatus(ModelStatus.INITIALIZING);
        
        // Initialize TensorFlow.js
        await tf.ready();
        
        setModelStatus(ModelStatus.DOWNLOADING);
        
        // Load the Universal Sentence Encoder model
        setModelStatus(ModelStatus.LOADING);
        const model = await loadUSE();
        setUseModel(model);
        
        setModelStatus(ModelStatus.PREPARING);
        
        // Warm up the model with a simple inference
        await model.embed('Warming up the model');
        
        setModelStatus(ModelStatus.READY);
        setLoading(false);
      } catch (err) {
        console.error('Error loading TensorFlow models:', err);
        setError('Failed to load TensorFlow models');
        setModelStatus(ModelStatus.ERROR);
        setLoading(false);
      }
    };

    initializeTensorflow();
  }, []);

  // Analyze text and generate scores
  const analyzeText = useCallback(async (text: string): Promise<Scores> => {
    if (!useModel) {
      throw new Error('Models are not loaded yet');
    }

    try {
      // Remove HTML tags
      const plainText = text.replace(/<[^>]*>/g, '');
      
      // Get embeddings from the Universal Sentence Encoder
      const embeddings = await useModel.embed(plainText);
      
      // Perform various analyses (these are simplified implementations)
      const grammarScore = analyzeSyntax(plainText);
      const coherenceScore = analyzeCoherence(plainText);
      const vocabularyScore = analyzeVocabulary(plainText);
      const relevanceScore = analyzeRelevance(plainText);
      
      // Calculate overall score
      const overallScore = calculateOverallScore([
        grammarScore,
        coherenceScore,
        vocabularyScore,
        relevanceScore
      ]);
      
      // Clean up tensors to prevent memory leaks
      tf.dispose(embeddings);
      
      return {
        grammar: grammarScore,
        coherence: coherenceScore,
        vocabulary: vocabularyScore,
        relevance: relevanceScore,
        overall: overallScore,
        confidence: 0.85 // Simplified confidence score
      };
    } catch (err) {
      console.error('Error analyzing text:', err);
      throw err;
    }
  }, [useModel]);

  return {
    loading,
    error,
    modelStatus,
    analyzeText
  };
};