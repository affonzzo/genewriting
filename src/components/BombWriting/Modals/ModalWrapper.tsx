import React from 'react';

interface ModalWrapperProps {
  children: React.ReactNode;
  onClose?: () => void;
  preventOutsideClick?: boolean;
}

export function ModalWrapper({ children, onClose, preventOutsideClick = true }: ModalWrapperProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (preventOutsideClick || !onClose) return;
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-in fade-in duration-300"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}