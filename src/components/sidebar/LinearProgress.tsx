import React from 'react';
import { PomodoroPhase } from '../../utils/pomodoro/types';

interface LinearProgressProps {
  progress: number;
  totalSessions: number;
  currentSession: number;
  phase: PomodoroPhase;
}

export function LinearProgress({
  progress,
  totalSessions,
  currentSession,
  phase
}: LinearProgressProps) {
  // Calcula o número total de segmentos incluindo a pausa longa
  const totalSegments = totalSessions * 2;
  
  // Calcula o índice atual (considerando trabalho e pausas)
  const currentIndex = (currentSession - 1) * 2 + (phase !== 'work' ? 1 : 0);

  // Gera os segmentos da barra
  const segments = Array.from({ length: totalSegments }).map((_, index) => {
    const isBreak = index % 2 === 1;
    const isLongBreak = index === totalSegments - 1;
    const isCurrentSegment = index === currentIndex;
    const isCompleted = index < currentIndex;

    // Define as cores dos segmentos
    let bgColor = isBreak 
      ? (isLongBreak ? 'bg-green-500' : 'bg-blue-500')
      : 'bg-red-500';

    // Define o tamanho relativo dos segmentos
    // Períodos de foco são maiores (1fr)
    // Pausas curtas são menores (20px)
    // Pausa longa é um pouco maior que as pausas curtas (30px)
    const flexBasis = isBreak 
      ? (isLongBreak ? '30px' : '20px')
      : '1fr';

    return (
      <div
        key={index}
        style={{ flexBasis }}
        className={`
          h-2 rounded-full overflow-hidden bg-gray-200
          ${isBreak ? 'flex-shrink-0' : 'flex-grow'}
        `}
      >
        <div
          className={`h-full transition-all duration-300 ${bgColor}`}
          style={{ 
            width: isCompleted ? '100%' : isCurrentSegment ? `${progress * 100}%` : '0%',
          }}
        />
      </div>
    );
  });

  return (
    <div className="w-full">
      <div className="flex gap-1">
        {segments}
      </div>
    </div>
  );
}