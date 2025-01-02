import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ToolbarButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  tooltip: string;
}

export function ToolbarButton({ icon: Icon, onClick, isActive, tooltip }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      title={tooltip}
      className={`
        p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-luxury-700
        transition-colors duration-200 group
        ${isActive ? 'bg-gray-100 text-gray-900 dark:bg-luxury-700 dark:text-white' : 'text-gray-600 dark:text-gray-400'}
      `}
    >
      <Icon className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
    </button>
  );
}