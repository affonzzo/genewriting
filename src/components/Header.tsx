import React from 'react';
import { PenLine, Bomb, LineChart, MessageSquare, Sun, Moon, Folder, Home } from 'lucide-react';
import { WritingMode } from '../types';
import { useTheme } from '../hooks/useTheme';
import { FileMenu } from './FileMenu';
import { FileTitle } from './FileTitle';
import { ShareButton } from './ShareButton';
import { ProfileButton } from './ProfileButton';

interface HeaderProps {
  mode: WritingMode;
  setMode: (mode: WritingMode) => void;
  isLocked?: boolean;
  showExplorer: boolean;
  onToggleExplorer: () => void;
  text: string;
  onTextChange: (text: string) => void;
  currentFileName?: string;
  onNewFile?: () => void;
  onSaveFile?: (name: string) => void;
  onSaveFileAs?: (name: string) => void;
  onDuplicateFile?: () => void;
  onDeleteFile?: () => void;
  onRenameFile?: (newName: string) => void;
  onShare?: () => void;
  userPhotoUrl?: string;
  userName?: string;
  onLogout?: () => void;
  onSettings?: () => void;
}

export function Header({ 
  mode, 
  setMode, 
  isLocked = false,
  showExplorer,
  onToggleExplorer,
  text,
  onTextChange,
  currentFileName = '',
  onNewFile,
  onSaveFile,
  onSaveFileAs,
  onDuplicateFile,
  onDeleteFile,
  onRenameFile,
  onShare,
  userPhotoUrl,
  userName,
  onLogout,
  onSettings
}: HeaderProps) {
  const { isDark, toggleTheme } = useTheme();
  
  const handleModeChange = (newMode: WritingMode) => {
    if (isLocked) return;
    setMode(newMode);
  };

  return (
    <header className="bg-white border-b border-gray-200 relative z-40 dark:bg-luxury-900 dark:border-luxury-700">
      <div className="h-16 px-4 flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {/* TODO: Implementar navegação para home */}}
            className="p-1.5 rounded-md transition-colors duration-150 text-gray-600 hover:bg-luxury-50 dark:text-gray-400 dark:hover:bg-luxury-800"
            title="Home"
          >
            <Home className="w-5 h-5" />
          </button>

          <button
            onClick={onToggleExplorer}
            className={`p-1.5 rounded-md transition-colors duration-150
              ${showExplorer 
                ? 'bg-luxury-100 text-luxury-800 dark:bg-luxury-700 dark:text-luxury-200' 
                : 'text-gray-600 hover:bg-luxury-50 dark:text-gray-400 dark:hover:bg-luxury-800'}`}
            title="Toggle Dossiê"
          >
            <Folder className="w-5 h-5" />
          </button>

          <div className="flex items-center">
            <FileMenu 
              text={text}
              currentFileName={currentFileName}
              onNew={onNewFile}
              onSave={onSaveFile}
              onSaveAs={onSaveFileAs}
              onImport={onTextChange}
              onDuplicate={onDuplicateFile}
              onDelete={onDeleteFile}
            />
            <FileTitle 
              currentFileName={currentFileName}
              onRename={onRenameFile || onSaveFileAs || (() => {})}
            />
          </div>
        </div>

        {/* Center - Title */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
          <h1 className="text-2xl font-['Poppins'] dark:text-white">
            <span className="font-semibold">Gene</span>Writing
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {[
              { id: 'free', icon: PenLine, label: 'Free' },
              { id: 'bomb', icon: Bomb, label: 'Bomb' },
              { id: 'line', icon: LineChart, label: 'Editing' },
              { id: 'feedback', icon: MessageSquare, label: 'Chat' }
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => handleModeChange(id as WritingMode)}
                className={`
                  p-1.5 rounded-md transition-colors duration-150
                  ${mode === id 
                    ? 'bg-luxury-100 text-luxury-800 dark:bg-luxury-700 dark:text-luxury-200' 
                    : 'text-gray-600 hover:bg-luxury-50 dark:text-gray-400 dark:hover:bg-luxury-800'
                  }
                  ${isLocked && id !== mode ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                disabled={isLocked && id !== mode}
                title={label}
              >
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 pl-2 border-l border-gray-200 dark:border-luxury-700">
            <ShareButton onShare={onShare} />
            <ProfileButton
              userPhotoUrl={userPhotoUrl}
              userName={userName}
              onLogout={onLogout}
              onSettings={onSettings}
            />
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}