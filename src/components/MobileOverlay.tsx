import React from 'react';

interface MobileOverlayProps {
  isVisible: boolean;
  onClick: () => void;
}

const MobileOverlay: React.FC<MobileOverlayProps> = ({ isVisible, onClick }) => {
  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
      onClick={onClick}
      aria-hidden="true"
    />
  );
};

export default MobileOverlay;