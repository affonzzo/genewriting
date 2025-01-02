import React, { useState, useCallback } from 'react';
import { WritingMode } from './types';
import { Layout } from './components/Layout';
import { Modal } from './components/Modal';
import { PomodoroSettingsContent } from './components/sidebar/PomodoroSettingsContent';
import { PomodoroSettings } from './utils/pomodoro/types';
import { BombWritingSettings } from './utils/bomb-writing/types';

export default function App(): JSX.Element {
  const [mode, setMode] = useState<WritingMode>('free');
  const [text, setText] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [pomodoroSettings, setPomodoroSettings] = useState<PomodoroSettings | null>(null);
  const [onSaveSettings, setOnSaveSettings] = useState<((settings: PomodoroSettings) => void) | null>(null);
  const [bombSettings, setBombSettings] = useState<BombWritingSettings | null>(null);

  const handleOpenSettings = useCallback((settings: PomodoroSettings, onSave: (settings: PomodoroSettings) => void): void => {
    if (!settings) {
      console.error('Invalid settings provided');
      return;
    }
    setPomodoroSettings(settings);
    setOnSaveSettings(() => onSave);
    setShowSettings(true);
  }, []);

  const handleCloseSettings = (): void => {
    setShowSettings(false);
    setPomodoroSettings(null);
    setOnSaveSettings(null);
  };

  const handleStartBombWriting = (settings: BombWritingSettings): void => {
    setBombSettings(settings);
  };

  const handleResetBombWriting = (): void => {
    setBombSettings(null);
  };

  const handleBombWritingComplete = useCallback((newContent: string): void => {
    if (typeof newContent !== 'string') {
      console.error('Invalid content type received');
      return;
    }
    setText((prevText) => {
      const trimmedNew = newContent.trim();
      if (!trimmedNew) return prevText;
      return prevText ? `${prevText.trim()}\n\n${trimmedNew}` : trimmedNew;
    });
  }, []);

  return (
    <React.StrictMode>
      <Layout
        mode={mode}
        setMode={setMode}
        text={text}
        setText={setText}
        onOpenSettings={handleOpenSettings}
        onStartBombWriting={handleStartBombWriting}
        bombSettings={bombSettings}
        onResetBombWriting={handleResetBombWriting}
        onBombWritingComplete={handleBombWritingComplete}
      />

      {pomodoroSettings && onSaveSettings ? (
        <Modal
          isOpen={showSettings}
          onClose={handleCloseSettings}
          title="Configuração da Sessão"
        >
          <PomodoroSettingsContent
            settings={pomodoroSettings}
            onSave={(settings) => {
              if (settings) {
                onSaveSettings(settings);
                handleCloseSettings();
              }
            }}
            onClose={handleCloseSettings}
          />
        </Modal>
      ) : null}
    </React.StrictMode>
  );
}