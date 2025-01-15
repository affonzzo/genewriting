import React, { useState, useCallback } from 'react';
import { WritingMode } from '../types';
import { Header } from './Header';
import Editor from './Editor';
import { FloatingSidebar } from './sidebar/FloatingSidebar';
import { PomodoroSettings } from '../utils/pomodoro/types';
import { BombWritingSettings } from '../utils/bomb-writing/types';
import { HeaderToggle } from './icons/HeaderToggle';
import { BombWritingEditor } from './BombWriting/BombWritingEditor';
import { useAuth } from '../hooks/useAuth';
import { AuthModal } from './auth/AuthModal';
import { FeedbackMode } from './feedback/FeedbackMode';
import { ActionButtons } from './ActionButtons';
import { useStore } from '../store';
import { FileExplorer } from './sidebar/FileExplorer';

interface LayoutProps {
  mode: WritingMode;
  setMode: (mode: WritingMode) => void;
  text: string;
  setText: (text: string) => void;
  onOpenSettings?: () => void;
  onStartBombWriting?: () => void;
  bombSettings?: BombWritingSettings;
  onResetBombWriting?: () => void;
  onBombWritingComplete?: (text: string) => void;
}

export function Layout({ 
  mode, 
  setMode, 
  text, 
  setText,
  onOpenSettings,
  onStartBombWriting,
  bombSettings,
  onResetBombWriting,
  onBombWritingComplete
}: LayoutProps) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showExplorer, setShowExplorer] = useState(false);
  const store = useStore();
  const isBombSessionActive = mode === 'bomb' && bombSettings;

  // Gerenciamento de arquivos
  const handleNewFile = useCallback(() => {
    const newFile = store.createFile(store.currentFolderId);
    setText('');
  }, [store.currentFolderId]);

  const handleSaveFile = useCallback((name?: string) => {
    if (!store.currentFile) {
      const newFile = store.createFile(store.currentFolderId);
      store.updateFileContent(newFile.id, text);
    } else {
      store.updateFileContent(store.currentFile.id, text);
      if (name && name !== store.currentFile.name) {
        store.renameFile(store.currentFile.id, name);
      }
    }
  }, [store.currentFile, store.currentFolderId, text]);

  const handleSaveFileAs = useCallback((name: string) => {
    handleSaveFile(name);
  }, [handleSaveFile]);

  const handleDuplicateFile = useCallback(() => {
    if (!store.currentFile) return;
    store.duplicateFile(store.currentFile.id);
  }, [store.currentFile]);

  const handleDeleteFile = useCallback(() => {
    if (!store.currentFile) return;
    store.deleteFile(store.currentFile.id);
    setText('');
  }, [store.currentFile]);

  const handleRenameFile = useCallback((newName: string) => {
    if (!store.currentFile) {
      handleSaveFile(newName);
    } else {
      store.renameFile(store.currentFile.id, newName);
    }
  }, [store.currentFile, handleSaveFile]);

  const handleShare = useCallback(() => {
    // TODO: Implementar compartilhamento real
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      // TODO: Mostrar toast de sucesso
      console.log('Link copiado!');
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Container */}
      <div className="relative">
        {isHeaderVisible && (
          <Header 
            mode={mode} 
            setMode={setMode} 
            isLocked={isBombSessionActive}
            showExplorer={showExplorer}
            onToggleExplorer={() => setShowExplorer(!showExplorer)}
            text={text}
            onTextChange={setText}
            currentFileName={store.currentFile?.name}
            onNewFile={handleNewFile}
            onSaveFile={handleSaveFile}
            onSaveFileAs={handleSaveFileAs}
            onDuplicateFile={handleDuplicateFile}
            onDeleteFile={handleDeleteFile}
            onRenameFile={handleRenameFile}
            onShare={handleShare}
          />
        )}
        
        <button
          onClick={() => setIsHeaderVisible(!isHeaderVisible)}
          className={`
            absolute left-1/2 -translate-x-1/2 ${isHeaderVisible ? '-bottom-4' : 'top-2'}
            z-50 w-8 h-8 rounded-full 
            bg-white dark:bg-luxury-800 
            shadow-lg border border-gray-200 dark:border-luxury-600
            flex items-center justify-center
            hover:bg-gray-50 dark:hover:bg-luxury-700
            transition-all duration-200
          `}
        >
          <HeaderToggle isOpen={isHeaderVisible} className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* File Explorer */}
        {showExplorer && (
          <div className="w-64 border-r border-gray-200 dark:border-luxury-700 bg-white dark:bg-luxury-800">
            <FileExplorer />
          </div>
        )}

        {/* Editor Container */}
        <div className="flex-1 flex flex-col">
          {mode === 'feedback' ? (
            <FeedbackMode text={text} onTextChange={setText} />
          ) : mode === 'bomb' && bombSettings ? (
            <BombWritingEditor
              settings={bombSettings}
              onReset={onResetBombWriting}
              previousContent={text}
              onComplete={onBombWritingComplete}
            />
          ) : (
            <div className="relative flex-1">
              <Editor 
                mode={mode} 
                text={text} 
                onTextChange={setText}
              />
            </div>
          )}
        </div>

        {/* Right Side Tools */}
        {mode !== 'feedback' && (
          <div className="fixed right-4 top-24 z-40 flex flex-col items-end gap-4">
            <ActionButtons 
              content={text} 
              onAuthClick={() => setShowAuthModal(true)} 
            />
            
            <FloatingSidebar 
              mode={mode} 
              text={text} 
              onOpenSettings={onOpenSettings}
              onStartBombWriting={onStartBombWriting}
            />
          </div>
        )}
      </div>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}