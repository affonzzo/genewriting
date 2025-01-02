import React from 'react';
import { Timer, Bomb, Keyboard } from 'lucide-react';
import { FloatingCard } from '../sidebar/FloatingCard';

interface BombTimerProps {
  timeLeft: number;
  pauseTimeLeft: number;
  maxPauseTime: number;
}

export function BombTimer({ timeLeft, pauseTimeLeft, maxPauseTime }: BombTimerProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calcula a porcentagem do tempo de pausa
  const pauseProgress = ((maxPauseTime - pauseTimeLeft) / maxPauseTime) * 100;
  const isLowPauseTime = pauseTimeLeft <= 3;
  const isDangerZone = pauseTimeLeft <= maxPauseTime * 0.3;

  // Classes para animação de tremor
  const shakeClass = isDangerZone ? 'animate-[shake_0.82s_cubic-bezier(.36,.07,.19,.97)_both_infinite]' : '';

  return (
    <FloatingCard>
      <div 
        className={`relative overflow-hidden ${shakeClass}`}
        data-bomb-timer
      >
        {/* Background Gradient Animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-rose-500/5 animate-pulse" />

        <div className="relative space-y-5 p-1">
          {/* Header */}
          <div className="flex items-center gap-2">
            <div className={`
              p-2 rounded-lg 
              ${isLowPauseTime 
                ? 'bg-red-100 text-red-600 animate-pulse' 
                : 'bg-red-50 text-red-500'}
            `}>
              <Bomb className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-400">Status</h3>
              <p className="text-sm font-semibold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                Sessão em Andamento
              </p>
            </div>
          </div>

          {/* Main Timer */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Timer className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-medium text-gray-400">Tempo Restante</span>
            </div>
            <div className="text-4xl font-mono font-bold text-gray-900 text-center tabular-nums">
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Typing Timer */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Keyboard className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-medium text-gray-500">
                  Tolerância de Pausa
                </span>
              </div>
              <span className={`
                font-mono font-bold text-sm tabular-nums
                ${isLowPauseTime ? 'text-red-600' : 'text-gray-700'}
              `}>
                {pauseTimeLeft}s
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`
                  h-full transition-all duration-200
                  ${isDangerZone
                    ? 'bg-red-500 animate-pulse'
                    : pauseProgress < 30
                    ? 'bg-green-500'
                    : pauseProgress < 60
                    ? 'bg-yellow-500'
                    : 'bg-red-500'}
                `}
                style={{ width: `${pauseProgress}%` }}
              />
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-br from-red-500/5 to-rose-500/5 rounded-full blur-xl" />
          <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-rose-500/5 to-red-500/5 rounded-full blur-lg" />
        </div>
      </div>
    </FloatingCard>
  );
}