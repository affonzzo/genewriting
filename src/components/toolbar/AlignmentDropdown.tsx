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
        className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
        title="Text Alignment"
      >
        <AlignmentIcon />
      </button>
      
      {isOpen && (
        <div 
          className="fixed ml-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[120px]"
          style={{
            top: dropdownRef.current?.getBoundingClientRect().top ?? 0,
            left: (dropdownRef.current?.getBoundingClientRect().right ?? 0) + 8
          }}
        >
          <button
            onClick={() => handleAlignmentClick(formatCommands.alignLeft)}
            className="w-full flex items-center px-3 py-2 hover:bg-gray-100 text-gray-700"
          >
            <AlignLeft className="w-4 h-4 mr-2" />
            <span className="text-sm">Left</span>
          </button>
          <button
            onClick={() => handleAlignmentClick(formatCommands.alignCenter)}
            className="w-full flex items-center px-3 py-2 hover:bg-gray-100 text-gray-700"
          >
            <AlignCenter className="w-4 h-4 mr-2" />
            <span className="text-sm">Center</span>
          </button>
          <button
            onClick={() => handleAlignmentClick(formatCommands.alignRight)}
            className="w-full flex items-center px-3 py-2 hover:bg-gray-100 text-gray-700"
          >
            <AlignRight className="w-4 h-4 mr-2" />
            <span className="text-sm">Right</span>
          </button>
        </div>
      )}
    </div>
  );
}