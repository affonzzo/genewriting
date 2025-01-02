import React from 'react';
import { WritingMode } from '../../types';
import { PomodoroTimer } from './PomodoroTimer';
import { BombSettings } from './BombSettings';
import { ReadabilityMetrics } from './ReadabilityMetrics';
import { PomodoroSettings } from '../../utils/pomodoro/types';
import { BombWritingSettings } from '../../utils/bomb-writing/types';
import { usePomodoroVisibility } from '../../utils/pomodoro/visibility';
import { useBombWritingVisibility } from '../../utils/bomb-writing/visibility';
import { Tomato } from '../icons/Tomato';

interface FloatingSidebarProps {
  mode: WritingMode;
  text: string;
  onOpenSettings: (settings: PomodoroSettings, onSave: (settings: PomodoroSettings) => void) => void;
  onStartBombWriting: (settings: BombWritingSettings) => void;
}

export function FloatingSidebar({ mode, text, onOpenSettings, onStartBombWriting }: FloatingSidebarProps) {
  const { isVisible: isPomodoroVisible, setVisible: setPomodoroVisible } = usePomodoroVisibility();
  const { isVisible: isBombVisible } = useBombWritingVisibility();

  const renderComponent = () => {
    switch (mode) {
      case 'free':
        if (!isPomodoroVisible) {
          return (
            <button
              onClick={() => setPomodoroVisible(true)}
              className="p-2 bg-white rounded-lg shadow-md border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Tomato className="w-5 h-5" strikethrough />
            </button>
          );
        }
        return <PomodoroTimer onOpenSettings={onOpenSettings} />;

      case 'bomb':
        if (!isBombVisible) return null;
        return <BombSettings onStart={onStartBombWriting} />;

      case 'line':
        return <ReadabilityMetrics text={text} />;
        
      default:
        return null;
    }
  };

  return (
    <div className="w-[240px]">
      {renderComponent()}
    </div>
  );
}