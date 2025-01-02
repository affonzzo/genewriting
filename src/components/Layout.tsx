import React, { useState } from 'react';
import { WritingMode } from '../types';
import { Header } from './Header';
import Editor from './Editor';
import { FloatingSidebar } from './sidebar/FloatingSidebar';
import { PomodoroSettings } from '../utils/pomodoro/types';
import { BombWritingSettings } from '../utils/bomb-writing/types';
import { HeaderToggle } from './icons/HeaderToggle';
import { BombWritingEditor } from './BombWriting/BombWritingEditor';
import { Toolbar } from './toolbar/Toolbar';
import { ViewToggle } from './Editor/ViewToggle';
import { useViewToggle } from '../hooks/useViewToggle';
import { useAuth } from '../hooks/useAuth';
import { AuthModal } from './auth/AuthModal';
import { FeedbackMode } from './feedback/FeedbackMode';
import { ActionButtons } from './ActionButtons';

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
  const isBombSessionActive = mode === 'bomb' && bombSettings;
  const { isMarkdownView, toggleView } = useViewToggle();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Container */}
      <div className="relative">
        {isHeaderVisible && (
          <Header 
            mode={mode} 
            setMode={setMode} 
            isLocked={isBombSessionActive}
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
                isMarkdownView={isMarkdownView}
              />
              
              {/* Toolbar */}
              <Toolbar />
              
              {/* View Toggle */}
              {!isBombSessionActive && (
                <ViewToggle 
                  isMarkdownView={isMarkdownView} 
                  onToggle={toggleView} 
                />
              )}
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