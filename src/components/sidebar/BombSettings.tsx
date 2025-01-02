import React, { useState } from 'react';
import { Timer, Bomb } from 'lucide-react';
import { FloatingCard } from './FloatingCard';
import { BombWritingSettings } from '../../utils/bomb-writing/types';
import { useBombWritingVisibility } from '../../utils/bomb-writing/visibility';

interface BombSettingsProps {
  onStart: (settings: BombWritingSettings) => void;
}

export function BombSettings({ onStart }: BombSettingsProps) {
  const [sessionLength, setSessionLength] = useState(15);
  const [maxPauseTime, setMaxPauseTime] = useState(5);
  const { setVisible } = useBombWritingVisibility();

  const handleStart = () => {
    onStart({
      totalTime: sessionLength,
      maxPauseTime: maxPauseTime
    });
  };

  return (
    <FloatingCard>
      <div className="relative space-y-5 p-1">
        {/* Header com botão de fechar */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setVisible(false)}
            className="p-2 bg-red-50 rounded-lg text-red-500 hover:bg-red-100 transition-colors"
          >
            <Bomb className="w-4 h-4" />
          </button>
          <h3 className="text-sm font-medium bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
            Sessão de Bomb Writing
          </h3>
        </div>

        <div className="space-y-4">
          <div className="group relative">
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Duração da Sessão
            </label>
            <div className="relative">
              <input
                type="number"
                value={sessionLength}
                onChange={(e) => setSessionLength(Number(e.target.value))}
                className="block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm 
                         focus:ring-2 focus:ring-red-500/20 focus:border-red-500/40 
                         transition-all duration-200"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                min
              </span>
            </div>
          </div>

          <div className="group relative">
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Tempo Máx. de Pausa
            </label>
            <div className="relative">
              <input
                type="number"
                value={maxPauseTime}
                onChange={(e) => setMaxPauseTime(Number(e.target.value))}
                className="block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm 
                         focus:ring-2 focus:ring-red-500/20 focus:border-red-500/40 
                         transition-all duration-200"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                seg
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleStart}
          className="w-full mt-2 group relative flex items-center justify-center px-4 py-2.5 
                   bg-gradient-to-r from-red-500 to-rose-500 
                   hover:from-red-600 hover:to-rose-600
                   text-white text-sm font-medium rounded-lg
                   transition-all duration-300 transform hover:-translate-y-0.5
                   focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-1"
        >
          <Timer className="w-4 h-4 mr-2 transition-transform group-hover:rotate-12" />
          Iniciar Sessão
        </button>

        <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-br from-red-500/5 to-rose-500/5 rounded-full blur-xl" />
        <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-rose-500/5 to-red-500/5 rounded-full blur-lg" />
      </div>
    </FloatingCard>
  );
}