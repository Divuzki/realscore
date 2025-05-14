import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Document } from '../types/Document';

interface TextEditorProps {
  document: Document;
  onContentChange: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ document, onContentChange }) => {
  const quillRef = useRef<ReactQuill>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Debounce content change to prevent too frequent analysis
  const handleChange = (content: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = setTimeout(() => {
      onContentChange(content);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Custom toolbar configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
  ];

  return (
    <div className="h-full flex flex-col p-4">
      <div className="mb-4">
        <input
          type="text"
          value={document.title || ''}
          onChange={(e) => {
            const updatedDoc = {
              ...document,
              title: e.target.value,
              lastModified: new Date().toISOString()
            };
            onContentChange(document.content);
          }}
          placeholder="Document Title"
          className="w-full text-2xl font-bold border-none focus:outline-none focus:ring-0 bg-transparent"
        />
      </div>
      
      <div className="flex-1 overflow-auto bg-white rounded-lg shadow-sm border border-gray-200">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={document.content}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          placeholder="Start writing to receive real-time analysis..."
          className="h-[calc(100%-2rem)]"
        />
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500 mt-3">
        <div>
          {document.content ? (
            <>
              <span className="mr-3">
                Words: {document.content.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean).length}
              </span>
              <span>
                Characters: {document.content.replace(/<[^>]*>/g, '').length}
              </span>
            </>
          ) : (
            <span>Words: 0 | Characters: 0</span>
          )}
        </div>
        <div className="text-xs">
          Last saved: {new Date(document.lastModified).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default TextEditor;