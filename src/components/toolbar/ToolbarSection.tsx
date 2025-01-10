import React from 'react';
import { Bold, Italic, AlignLeft, AlignCenter, AlignRight, List } from 'lucide-react';
import { AlignmentDropdown } from './AlignmentDropdown';

interface ToolbarSectionProps {
  children: React.ReactNode;
  showDivider?: boolean;
}

export function ToolbarSection({ children, showDivider = true }: ToolbarSectionProps) {
  return (
    <>
      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-luxury-800">
          <Bold className="w-4 h-4" />
        </button>
        <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-luxury-800">
          <Italic className="w-4 h-4" />
        </button>
        <AlignmentDropdown />
        <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-luxury-800">
          <List className="w-4 h-4" />
        </button>
      </div>
      {showDivider && <div className="h-px bg-gray-200 dark:bg-luxury-600 my-1" />}
    </>
  );
}