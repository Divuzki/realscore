import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TextEditor from './components/TextEditor';
import ScoreSidebar from './components/ScoreSidebar';
import ModelLoader from './components/ModelLoader';
import { useDocumentStorage } from './hooks/useDocumentStorage';
import { useTensorflowModels } from './hooks/useTensorflowModels';
import { Document } from './types/Document';
import EmptyState from './components/EmptyState';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [documentsList, setDocumentsList] = useState<Document[]>([]);
  
  const { 
    loading: modelsLoading, 
    error: modelsError,
    modelStatus,
    analyzeText
  } = useTensorflowModels();
  
  const { 
    saveDocument, 
    getDocuments,
    createNewDocument
  } = useDocumentStorage();

  useEffect(() => {
    const loadDocuments = async () => {
      const docs = await getDocuments();
      setDocumentsList(docs);
      
      // Load the most recent document or create a new one if none exists
      if (docs.length > 0) {
        setCurrentDocument(docs[0]);
      } else {
        handleNewDocument();
      }
    };
    
    loadDocuments();
  }, [getDocuments]);

  const handleNewDocument = async () => {
    const newDoc = await createNewDocument();
    setCurrentDocument(newDoc);
    setDocumentsList([newDoc, ...documentsList]);
  };

  const handleDocumentSelect = (doc: Document) => {
    setCurrentDocument(doc);
  };

  const handleContentChange = async (content: string) => {
    if (!currentDocument) return;
    
    const updatedDoc = {
      ...currentDocument,
      content,
      lastModified: new Date().toISOString()
    };
    
    setCurrentDocument(updatedDoc);
    
    // Analyze the text and update scores
    if (content.trim().length > 10 && !modelsLoading) {
      const scores = await analyzeText(content);
      
      const docWithScores = {
        ...updatedDoc,
        scores
      };
      
      setCurrentDocument(docWithScores);
      await saveDocument(docWithScores);
      
      // Update the document in the list
      setDocumentsList(documentsList.map(doc => 
        doc.id === docWithScores.id ? docWithScores : doc
      ));
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (modelsLoading) {
    return <ModelLoader status={modelStatus} />;
  }

  if (modelsError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-error-500 mb-4">Error Loading Models</h1>
          <p className="text-gray-700">
            There was an error loading the required TensorFlow models. Please refresh the page or try again later.
          </p>
          <button 
            className="mt-6 w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-md transition-colors"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        toggleSidebar={toggleSidebar} 
        sidebarOpen={sidebarOpen}
        onNewDocument={handleNewDocument}
        currentDocument={currentDocument}
        documentsList={documentsList}
        onDocumentSelect={handleDocumentSelect}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {currentDocument ? (
          <>
            <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'mr-80' : 'mr-0'}`}>
              <TextEditor 
                document={currentDocument}
                onContentChange={handleContentChange}
              />
            </main>
            
            <ScoreSidebar 
              isOpen={sidebarOpen}
              document={currentDocument}
            />
          </>
        ) : (
          <EmptyState onNewDocument={handleNewDocument} />
        )}
      </div>
    </div>
  );
}

export default App;