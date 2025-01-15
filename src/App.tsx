import React, { useState } from 'react';
import { WritingMode } from './types';
import { AuthProvider } from './providers/AuthProvider';
import { Layout } from './components/Layout';
import { Modal } from './components/Modal';
import { PomodoroSettingsContent } from './components/sidebar/PomodoroSettingsContent';
import { PomodoroSettings } from './utils/pomodoro/types';
import { BombWritingSettings } from './utils/bomb-writing/types';
import { useEditor } from './hooks/useEditor';

export default function App() {
  const [mode, setMode] = useState<WritingMode>('free');
  const [showSettings, setShowSettings] = useState(false);
  const [pomodoroSettings, setPomodoroSettings] = useState<PomodoroSettings | null>(null);
  const [onSaveSettings, setOnSaveSettings] = useState<((settings: PomodoroSettings) => void) | null>(null);
  const [bombSettings, setBombSettings] = useState<BombWritingSettings | null>(null);
  const editor = useEditor();

  const handleOpenSettings = (settings: PomodoroSettings, onSave: (settings: PomodoroSettings) => void) => {
    setPomodoroSettings(settings);
    setOnSaveSettings(() => onSave);
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
    setPomodoroSettings(null);
    setOnSaveSettings(null);
  };

  const handleStartBombWriting = (settings: BombWritingSettings) => {
    setBombSettings(settings);
  };

  const handleResetBombWriting = () => {
    setBombSettings(null);
  };

  const handleBombWritingComplete = (newContent: string) => {
    editor.setText((prevText) => {
      // Se já existe texto, adiciona uma quebra de linha antes do novo conteúdo
      return prevText ? `${prevText}\n\n${newContent}` : newContent;
    });
  };

  return (
    <AuthProvider>
      <Layout
        mode={mode}
        setMode={setMode}
        text={editor.text}
        setText={editor.setText}
        onOpenSettings={handleOpenSettings}
        onStartBombWriting={handleStartBombWriting}
        bombSettings={bombSettings}
        onResetBombWriting={handleResetBombWriting}
        onBombWritingComplete={handleBombWritingComplete}
        currentFileName={editor.currentFile?.name}
        onNewFile={editor.handleNewFile}
        onSaveFile={editor.handleSaveFile}
        onSaveFileAs={editor.handleSaveFileAs}
        onDuplicateFile={editor.handleDuplicateFile}
        onDeleteFile={editor.handleDeleteFile}
        onRenameFile={editor.handleRenameFile}
      />

      {pomodoroSettings && onSaveSettings && (
        <Modal
          isOpen={showSettings}
          onClose={handleCloseSettings}
          title="Configuração da Sessão"
        >
          <PomodoroSettingsContent
            settings={pomodoroSettings}
            onSave={(settings) => {
              onSaveSettings(settings);
              handleCloseSettings();
            }}
            onClose={handleCloseSettings}
          />
        </Modal>
      )}
    </AuthProvider>
  );
}