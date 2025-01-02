import React from 'react';
import { WritingMode } from '../types';
import PomodoroTimer from './PomodoroTimer';
import BombSettings from './BombSettings';
import ReadabilityMetrics from './ReadabilityMetrics';

interface SidebarProps {
  mode: WritingMode;
  text: string;
}

export default function Sidebar({ mode, text }: SidebarProps) {
  return (
    <div className="w-80 space-y-6">
      {mode === 'free' && <PomodoroTimer />}
      {mode === 'bomb' && <BombSettings />}
      {mode === 'line' && <ReadabilityMetrics text={text} />}
    </div>
  );
}