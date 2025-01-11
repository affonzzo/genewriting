import React, { useState, useCallback } from 'react';
import { BombWritingSettings, BombWritingStats } from '../../utils/bomb-writing/types';
import { useBombWriting } from '../../hooks/useBombWriting';
import { useBombWritingVisibility } from '../../utils/bomb-writing/visibility';
import { useSessionStore } from '../../utils/bomb-writing/sessions';
import { BombTimer } from './BombTimer';
import { StartModal } from './Modals/StartModal';
import { VictoryModal } from './Modals/VictoryModal';
import { DefeatModal } from './Modals/DefeatModal';
import { BombBoundary } from './BombBoundary';
import { Paper } from '../Paper';
import { SimpleEditor } from '../Editor/SimpleEditor';

interface BombWritingEditorProps {
  settings: BombWritingSettings;
  onReset: () => void;
  previousContent: string;
  onComplete: (content: string) => void;
}

export function BombWritingEditor({ 
  settings, 
  onReset, 
  previousContent, 
  onComplete 
}: BombWritingEditorProps) {
  const [showVictory, setShowVictory] = useState(false);
  const [showDefeat, setShowDefeat] = useState(false);
  const [showStart, setShowStart] = useState(true);
  const [stats, setStats] = useState<BombWritingStats | null>(null);
  const { setVisible: setBombSettingsVisible } = useBombWritingVisibility();
  const incrementSessionCount = useSessionStore(state => state.incrementCount);
  const sessionNumber = useSessionStore(state => state.dailyCount + 1);

  const handleVictory = useCallback((stats: BombWritingStats) => {
    setStats(stats);
    setShowVictory(true);
    incrementSessionCount();
  }, [incrementSessionCount]);

  const handleDefeat = useCallback(() => {
    setShowDefeat(true);
  }, []);

  const { state, startSession, handleType, resetSession } = useBombWriting(
    settings,
    handleVictory,
    handleDefeat
  );

  const handleStartNew = useCallback(() => {
    onComplete(state.currentContent);
    setShowVictory(false);
    resetSession(); // Reset antes de mostrar o modal de início
    setShowStart(true);
  }, [state.currentContent, onComplete, resetSession]);

  const handleReconfigure = useCallback(() => {
    onComplete(state.currentContent);
    setBombSettingsVisible(true);
    onReset();
  }, [state.currentContent, onComplete, onReset, setBombSettingsVisible]);

  const handleDefeatReconfigure = useCallback(() => {
    resetSession();
    setBombSettingsVisible(true);
    onReset();
  }, [resetSession, onReset, setBombSettingsVisible]);

  const handleVictoryClose = useCallback(() => {
    onComplete(state.currentContent);
    setShowVictory(false);
    onReset();
  }, [state.currentContent, onComplete, onReset]);

  const handleDefeatClose = useCallback(() => {
    setShowDefeat(false);
    setShowStart(true);
    resetSession();
  }, [resetSession]);

  return (
    <div className="flex-1 flex">
      <div className="flex-1">
        <Paper>
          <div className="flex flex-col min-h-full">
            {/* Conteúdo anterior - sempre bloqueado */}
            {previousContent && (
              <div>
                <div className="opacity-60 pointer-events-none select-none pb-6">
                  <SimpleEditor
                    content={previousContent}
                    onChange={() => {}}
                    readOnly={true}
                    mode="bomb"
                  />
                </div>
                <div className="-mt-4">
                  {state.isSessionActive && <BombBoundary />}
                </div>
              </div>
            )}

            {/* Área de escrita ativa */}
            <div className={`flex-1 ${previousContent ? '-mt-12 pt-6' : ''}`}>
              <SimpleEditor
                content={state.currentContent}
                onChange={handleType}
                readOnly={!state.isSessionActive}
                mode="bomb"
              />
            </div>
          </div>
        </Paper>
      </div>

      {/* Timer */}
      {state.isSessionActive && (
        <div className="fixed right-4 top-24">
          <BombTimer
            timeLeft={state.timeLeft}
            pauseTimeLeft={state.pauseTimeLeft}
            maxPauseTime={settings.maxPauseTime}
          />
        </div>
      )}

      {/* Modais */}
      {showStart && (
        <StartModal
          settings={settings}
          onStart={() => {
            setShowStart(false);
            startSession();
          }}
        />
      )}

      {showVictory && stats && (
        <VictoryModal
          stats={stats}
          sessionNumber={sessionNumber}
          onStartNew={handleStartNew}
          onReconfigure={handleReconfigure}
          onClose={handleVictoryClose}
        />
      )}

      {showDefeat && (
        <DefeatModal
          onRetry={handleDefeatClose}
          onReconfigure={handleDefeatReconfigure}
        />
      )}
    </div>
  );
}