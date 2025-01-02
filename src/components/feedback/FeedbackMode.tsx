import React, { useState, useRef, useEffect } from 'react';
import { SimpleEditor } from '../Editor/SimpleEditor';
import { ChatPanel } from './ChatPanel';
import { Paper } from '../Paper';
import { GripVertical } from 'lucide-react';

interface FeedbackModeProps {
  text: string;
  onTextChange: (text: string) => void;
}

export function FeedbackMode({ text, onTextChange }: FeedbackModeProps) {
  const [chatWidth, setChatWidth] = useState(320);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialX = useRef<number>(0);
  const initialWidth = useRef<number>(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    initialX.current = e.clientX;
    initialWidth.current = chatWidth;
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const delta = e.clientX - initialX.current;
      const newWidth = Math.max(280, Math.min(480, initialWidth.current - delta));
      setChatWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
    } else {
      document.body.style.cursor = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
    };
  }, [isDragging]);

  return (
    <div ref={containerRef} className="flex-1 flex bg-paper-light dark:bg-paper-dark">
      {/* Editor Panel */}
      <div className="flex-1 pl-8 pr-4 py-4">
        <Paper>
          <SimpleEditor
            content={text}
            onChange={onTextChange}
            readOnly={false}
          />
        </Paper>
      </div>

      {/* Resizer */}
      <div
        className={`
          flex items-center justify-center w-8 -mx-4 cursor-col-resize group z-10
          ${isDragging ? 'opacity-100' : 'opacity-0 hover:opacity-100'}
          transition-opacity duration-200
        `}
        onMouseDown={handleMouseDown}
      >
        <div className="w-[2px] h-32 bg-gray-200 dark:bg-luxury-700 rounded-full group-hover:bg-primary group-hover:h-48 transition-all duration-300" />
        <div className="absolute">
          <div className="p-2 bg-white dark:bg-luxury-800 rounded-lg shadow-lg border border-gray-200 dark:border-luxury-700 group-hover:border-primary/50 transition-colors">
            <GripVertical className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors" />
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      <div 
        className="py-4 pr-8"
        style={{ width: chatWidth }}
      >
        <ChatPanel />
      </div>
    </div>
  );
}