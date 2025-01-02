import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface HeaderToggleProps {
  isVisible: boolean;
  onToggle: () => void;
}

export function HeaderToggle({ isVisible, onToggle }: HeaderToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        absolute left-1/2 -translate-x-1/2 ${isVisible ? '-bottom-4' : 'top-2'}
        z-50 w-8 h-8 rounded-full 
        bg-white dark:bg-luxury-800 
        shadow-lg border border-gray-200 dark:border-luxury-600
        flex items-center justify-center
        hover:bg-gray-50 dark:hover:bg-luxury-700
        transition-all duration-200
      `}
    >
      {isVisible ? (
        <ChevronUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      ) : (
        <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      )}
    </button>
  );
}