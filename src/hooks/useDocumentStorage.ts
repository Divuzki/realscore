import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import localforage from 'localforage';
import { Document } from '../types/Document';

// Initialize localforage
localforage.config({
  name: 'realscore',
  storeName: 'documents'
});

export const useDocumentStorage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create a new document
  const createNewDocument = useCallback(async (): Promise<Document> => {
    setLoading(true);
    setError(null);
    
    try {
      const now = new Date().toISOString();
      const newDocument: Document = {
        id: uuidv4(),
        title: 'Untitled Document',
        content: '',
        created: now,
        lastModified: now
      };
      
      await localforage.setItem(`document:${newDocument.id}`, newDocument);
      
      // Update the document list
      const documentList = await getDocumentList();
      await localforage.setItem('document:list', [newDocument.id, ...documentList]);
      
      return newDocument;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create document';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Save a document
  const saveDocument = useCallback(async (document: Document): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      document.lastModified = new Date().toISOString();
      await localforage.setItem(`document:${document.id}`, document);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save document';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get a document by ID
  const getDocument = useCallback(async (id: string): Promise<Document | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const document = await localforage.getItem<Document>(`document:${id}`);
      return document;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get document';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get list of document IDs (ordered by most recent first)
  const getDocumentList = useCallback(async (): Promise<string[]> => {
    try {
      const list = await localforage.getItem<string[]>('document:list');
      return list || [];
    } catch (err) {
      console.error('Failed to get document list:', err);
      return [];
    }
  }, []);

  // Get all documents
  const getDocuments = useCallback(async (): Promise<Document[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const documentIds = await getDocumentList();
      const documents: Document[] = [];
      
      for (const id of documentIds) {
        const doc = await getDocument(id);
        if (doc) {
          documents.push(doc);
        }
      }
      
      // Sort by last modified date (newest first)
      return documents.sort((a, b) => 
        new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get documents';
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, [getDocument, getDocumentList]);

  // Delete a document
  const deleteDocument = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Remove from document list
      const documentList = await getDocumentList();
      const updatedList = documentList.filter(docId => docId !== id);
      await localforage.setItem('document:list', updatedList);
      
      // Remove the document itself
      await localforage.removeItem(`document:${id}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete document';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getDocumentList]);

  return {
    loading,
    error,
    createNewDocument,
    saveDocument,
    getDocument,
    getDocuments,
    deleteDocument
  };
};