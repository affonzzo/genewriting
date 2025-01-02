import React from 'react';
import { MenuToggle } from '../icons/MenuToggle';

interface ToolbarToggleProps {
  isVisible: boolean;
  onToggle: () => void;
}

export function ToolbarToggle({ isVisible, onToggle }: ToolbarToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-luxury-700 transition-colors duration-200 text-gray-600 dark:text-gray-400 group"
      title={isVisible ? "Hide toolbar" : "Show toolbar"}
    >
      <MenuToggle isOpen={isVisible} className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
    </button>
  );
}