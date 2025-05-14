import React from 'react';
import { ModelStatus } from '../hooks/useTensorflowModels';
import LogoIcon from './LogoIcon';

interface ModelLoaderProps {
  status: ModelStatus;
}

const ModelLoader: React.FC<ModelLoaderProps> = ({ status }) => {
  const getProgressPercentage = () => {
    switch (status) {
      case ModelStatus.INITIALIZING:
        return 5;
      case ModelStatus.DOWNLOADING:
        return 30;
      case ModelStatus.LOADING:
        return 70;
      case ModelStatus.PREPARING:
        return 90;
      default:
        return 0;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case ModelStatus.INITIALIZING:
        return 'Initializing TensorFlow.js...';
      case ModelStatus.DOWNLOADING:
        return 'Downloading AI models...';
      case ModelStatus.LOADING:
        return 'Loading language models...';
      case ModelStatus.PREPARING:
        return 'Preparing analysis engines...';
      default:
        return 'Getting things ready...';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <LogoIcon className="h-16 w-16 text-primary-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-primary-500 mb-2">REALSCORE</h1>
        <p className="text-gray-600 mb-6">Automated Text Analysis</p>
        
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className="bg-primary-500 h-3 rounded-full transition-all duration-300 ease-out" 
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">{getStatusMessage()}</p>
        </div>
        
        <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-md">
          <p className="mb-1">
            <strong>Privacy First:</strong> All analysis happens directly in your browser.
          </p>
          <p>
            Your text never leaves your device, ensuring complete privacy while you write.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModelLoader;