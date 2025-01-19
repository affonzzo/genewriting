import React from 'react';
import { 
  Pencil, 
  Bomb, 
  LineChart, 
  MessagesSquare, 
  Sun, 
  Moon, 
  FolderKanban, 
  LayoutDashboard,
  ScrollText,
  Bot,
  BrainCog
} from 'lucide-react';
import { WritingMode } from '../types';
import { useTheme } from '../hooks/useTheme';
import { FileMenu } from './FileMenu';
import { FileTitle } from './FileTitle';
import { ShareButton } from './ShareButton';
import { UserMenu } from './UserMenu';

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
    <header className="bg-white border-b border-brand-gray/20 relative z-40 dark:bg-black dark:border-brand-gray/20">
      <div className="h-16 px-4 flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {/* TODO: Implementar navegação para home */}}
            className="p-1.5 rounded-lg transition-all duration-300 text-brand-gray hover:bg-brand-gold/10 hover:text-brand-gold dark:text-brand-gray dark:hover:bg-brand-gold/10 dark:hover:text-brand-gold"
            title="Home"
          >
            <LayoutDashboard className="w-5 h-5" strokeWidth={1.5} />
          </button>

          <button
            onClick={onToggleExplorer}
            className={`p-1.5 rounded-lg transition-all duration-300
              ${showExplorer 
                ? 'bg-brand-gold/10 text-brand-gold dark:bg-brand-gold/10 dark:text-brand-gold' 
                : 'text-brand-gray hover:bg-brand-gold/10 hover:text-brand-gold dark:text-brand-gray dark:hover:bg-brand-gold/10 dark:hover:text-brand-gold'}`}
            title="Toggle Dossiê"
          >
            <FolderKanban className="w-5 h-5" strokeWidth={1.5} />
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
          <div className="flex items-center">
            <img 
              src="/LogoGene.png" 
              alt="GeneWriting"
              className="h-8 w-auto object-contain" 
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {[
              { 
                id: 'planning', 
                icon: ScrollText, 
                label: 'Planning Mode',
              },
              { 
                id: 'free', 
                icon: Pencil, 
                label: 'Free Writing',
              },
              { 
                id: 'bomb', 
                icon: Bomb, 
                label: 'Bomb Writing',
              },
              { 
                id: 'line', 
                icon: LineChart, 
                label: 'Line Editing',
              },
              { 
                id: 'chat', 
                icon: MessagesSquare, 
                label: 'Chat',
              },
              { 
                id: 'agent', 
                icon: BrainCog, 
                label: 'AI Agent',
              }
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => handleModeChange(id as WritingMode)}
                className={`p-1.5 rounded-lg transition-all duration-300 relative group
                  ${mode === id 
                    ? 'bg-brand-gold text-white dark:bg-brand-gold dark:text-white' 
                    : 'text-brand-gray hover:bg-brand-gold/10 hover:text-brand-gold dark:text-brand-gray dark:hover:bg-brand-gold/10 dark:hover:text-brand-gold'
                  }
                  ${isLocked && id !== mode ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                disabled={isLocked && id !== mode}
                title={label}
              >
                <Icon className="w-5 h-5" strokeWidth={1.5} />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white dark:bg-white dark:text-black text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {label}
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 pl-2 border-l border-brand-gray/20 dark:border-brand-gray/20">
            <ShareButton onShare={onShare} />
            <UserMenu />
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg text-brand-gray hover:bg-brand-gold/10 hover:text-brand-gold dark:text-brand-gray dark:hover:bg-brand-gold/10 dark:hover:text-brand-gold transition-all duration-300"
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? (
                <Sun className="w-4 h-4" strokeWidth={1.5} />
              ) : (
                <Moon className="w-4 h-4" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}