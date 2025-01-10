import React, { useState, useRef, useEffect } from 'react';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { formatCommands } from '../../utils/formatting';
import { AlignmentIcon } from '../icons/AlignmentIcon';

export function AlignmentDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAlignmentClick = (command: () => void) => {
    command();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-luxury-800"
      >
        <AlignmentIcon />
      </button>

      {isOpen && (
        <div 
          className="fixed ml-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[120px] dark:bg-luxury-900 dark:border-luxury-700"
          style={{
            top: dropdownRef.current?.getBoundingClientRect().top ?? 0,
            left: (dropdownRef.current?.getBoundingClientRect().right ?? 0) + 8
          }}
        >
          <button
            onClick={() => handleAlignmentClick(formatCommands.alignLeft)}
            className="w-full p-1.5 hover:bg-gray-100 dark:hover:bg-luxury-800 flex items-center gap-2"
          >
            <AlignLeft className="w-4 h-4" />
            <span className="text-sm">Esquerda</span>
          </button>
          <button
            onClick={() => handleAlignmentClick(formatCommands.alignCenter)}
            className="w-full p-1.5 hover:bg-gray-100 dark:hover:bg-luxury-800 flex items-center gap-2"
          >
            <AlignCenter className="w-4 h-4" />
            <span className="text-sm">Centro</span>
          </button>
          <button
            onClick={() => handleAlignmentClick(formatCommands.alignRight)}
            className="w-full p-1.5 hover:bg-gray-100 dark:hover:bg-luxury-800 flex items-center gap-2"
          >
            <AlignRight className="w-4 h-4" />
            <span className="text-sm">Direita</span>
          </button>
        </div>
      )}
    </div>
  );
}