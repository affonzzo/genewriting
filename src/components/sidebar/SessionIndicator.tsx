import React from 'react';

interface SessionIndicatorProps {
  currentSession: number;
  totalSessions: number;
  phase: 'work' | 'shortBreak' | 'longBreak';
}

export function SessionIndicator({ currentSession, totalSessions, phase }: SessionIndicatorProps) {
  // Calcula os ângulos para posicionar os indicadores em círculo
  const indicators = Array.from({ length: totalSessions }).map((_, index) => {
    const angle = (360 / totalSessions) * index - 90; // -90 para começar do topo
    const radian = (angle * Math.PI) / 180;
    const radius = 130; // Raio do círculo onde os indicadores serão posicionados
    
    // Calcula posições X e Y
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    
    const completed = index < currentSession - 1;
    const isActive = index === currentSession - 1;
    
    return { x, y, completed, isActive, angle };
  });

  return (
    <div className="absolute inset-0">
      {indicators.map((indicator, index) => (
        <div
          key={index}
          className="absolute left-1/2 top-1/2"
          style={{
            transform: `translate(-50%, -50%) translate(${indicator.x}px, ${indicator.y}px)`,
          }}
        >
          <div
            className={`
              w-3 h-3 rounded-full transition-all duration-300
              ${indicator.completed
                ? phase === 'work'
                  ? 'bg-indigo-500'
                  : phase === 'shortBreak'
                  ? 'bg-emerald-500'
                  : 'bg-blue-500'
                : 'bg-gray-200'
              }
              ${indicator.isActive ? 'scale-125 ring-2 ring-offset-2 ring-indigo-500' : ''}
            `}
          />
        </div>
      ))}
    </div>
  );
}