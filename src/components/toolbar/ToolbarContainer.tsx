import React from 'react';
import { ToolbarToggle } from './ToolbarToggle';

interface ToolbarContainerProps {
  children: React.ReactNode;
  isVisible: boolean;
  onToggleVisibility: () => void;
}

export function ToolbarContainer({ children, isVisible, onToggleVisibility }: ToolbarContainerProps) {
  return (
    <div className="w-[48px] shrink-0 py-4 pl-4">
      <div className="sticky top-4 bg-white dark:bg-luxury-800/95 rounded-lg shadow-lg border border-gray-200 dark:border-luxury-600 backdrop-blur-sm">
        <div className="p-1.5">
          <ToolbarToggle isVisible={isVisible} onToggle={onToggleVisibility} />
        </div>

        <div className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isVisible ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
        `}>
          {children}
        </div>
      </div>
    </div>
  );
}