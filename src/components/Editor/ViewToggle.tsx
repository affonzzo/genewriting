import React from 'react';
import { Eye, Code2 } from 'lucide-react';

interface ViewToggleProps {
  isMarkdownView: boolean;
  onToggle: () => void;
}

export function ViewToggle({ isMarkdownView, onToggle }: ViewToggleProps) {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%+0.75rem)]">
      <div className="flex flex-col bg-white dark:bg-luxury-800/95 rounded-lg shadow-lg border border-gray-200 dark:border-luxury-600 overflow-hidden backdrop-blur-sm w-[40px]">
        <button
          onClick={() => !isMarkdownView && onToggle()}
          className={`
            relative p-2 transition-all duration-300 group
            ${isMarkdownView 
              ? 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400'
              : 'text-primary bg-primary/10 dark:bg-luxury-700'
            }
          `}
          title="Editor"
        >
          <Code2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
        </button>
        
        <div className="h-px bg-gray-200 dark:bg-luxury-600" />
        
        <button
          onClick={() => isMarkdownView && onToggle()}
          className={`
            relative p-2 transition-all duration-300 group
            ${!isMarkdownView 
              ? 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400'
              : 'text-primary bg-primary/10 dark:bg-luxury-700'
            }
          `}
          title="Preview"
        >
          <Eye className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
}