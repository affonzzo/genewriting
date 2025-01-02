import React from 'react';
import { PenLine, Bomb, LineChart, MessageSquare, Sun, Moon } from 'lucide-react';
import { WritingMode } from '../types';
import { useTheme } from '../hooks/useTheme';
import { DocumentHeader } from './header/DocumentHeader';

interface HeaderProps {
  mode: WritingMode;
  setMode: (mode: WritingMode) => void;
  isLocked?: boolean;
  filename?: string;
  onFilenameChange?: (name: string) => void;
}

export function Header({ 
  mode, 
  setMode, 
  isLocked = false,
  filename = 'Untitled',
  onFilenameChange = () => {}
}: HeaderProps) {
  const { isDark, toggleTheme } = useTheme();
  
  const handleModeChange = (newMode: WritingMode) => {
    if (isLocked) return;
    setMode(newMode);
  };

  return (
    <header className="bg-white border-b border-gray-200 relative z-40 dark:bg-luxury-900 dark:border-luxury-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 relative">
          <DocumentHeader 
            filename={filename}
            onFilenameChange={onFilenameChange}
          />

          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-['Poppins'] dark:text-white">
            <span className="font-semibold">Gene</span>Writing
          </h1>

          <nav className="flex items-center space-x-1 ml-auto">
            {[
              { id: 'free', icon: PenLine, label: 'Free' },
              { id: 'bomb', icon: Bomb, label: 'Bomb' },
              { id: 'line', icon: LineChart, label: 'Editing' },
              { id: 'feedback', icon: MessageSquare, label: 'Chat' }
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => handleModeChange(id as WritingMode)}
                disabled={isLocked}
                className={`
                  px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5
                  ${mode === id
                    ? 'bg-primary text-white'
                    : isLocked
                    ? 'text-gray-400 cursor-not-allowed dark:text-gray-600'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }
                  transition-colors duration-200
                `}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{label}</span>
              </button>
            ))}

            <button
              onClick={toggleTheme}
              className="ml-2 p-1.5 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}