import React from 'react';
import { PomodoroPhase } from '../../utils/pomodoro/types';

interface CircularProgressProps {
  progress: number;
  totalSessions: number;
  currentSession: number;
  phase: PomodoroPhase;
  children?: React.ReactNode;
}

export function CircularProgress({
  progress,
  totalSessions,
  currentSession,
  phase,
  children
}: CircularProgressProps) {
  const size = 160;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress * circumference);

  // Cores para cada fase
  const getPhaseColor = (isBreak: boolean, isLongBreak: boolean) => {
    if (isLongBreak) return '#10b981'; // Verde para pausa longa
    if (isBreak) return '#3b82f6'; // Azul para pausa curta
    return '#ef4444'; // Vermelho para pomodoro
  };

  // Calcula os segmentos para trabalho e pausas
  const segments = Array.from({ length: totalSessions * 2 - 1 }).map((_, index) => {
    const isBreak = index % 2 === 1;
    const sessionIndex = Math.floor(index / 2);
    const segmentAngle = 360 / (totalSessions * 2 - 1);
    const startAngle = (segmentAngle * index) - 90;
    const currentIndex = (currentSession - 1) * 2 + (phase !== 'work' ? 1 : 0);
    const isCurrentSegment = index === currentIndex;
    const isCompleted = index < currentIndex;
    const isLongBreak = isBreak && sessionIndex === totalSessions - 1;

    return {
      startAngle,
      endAngle: startAngle + segmentAngle,
      isActive: isCurrentSegment,
      isCompleted,
      isBreak,
      isLongBreak,
      sessionIndex
    };
  });

  const polarToCartesian = (angle: number) => {
    const radian = (angle * Math.PI) / 180;
    const x = size/2 + radius * Math.cos(radian);
    const y = size/2 + radius * Math.sin(radian);
    return { x, y };
  };

  const createArcPath = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(startAngle);
    const end = polarToCartesian(endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    
    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 1, end.x, end.y
    ].join(' ');
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Círculo base */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f3f4f6"
          strokeWidth={strokeWidth}
          className="opacity-25"
        />

        {/* Segmentos */}
        {segments.map((segment, index) => (
          <path
            key={index}
            d={createArcPath(segment.startAngle, segment.endAngle)}
            fill="none"
            stroke={segment.isCompleted 
              ? getPhaseColor(segment.isBreak, segment.isLongBreak)
              : 'rgba(229, 231, 235, 0.4)'}
            strokeWidth={strokeWidth}
            className="transition-all duration-300"
          />
        ))}

        {/* Progresso atual */}
        {!Number.isNaN(progress) && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={getPhaseColor(phase !== 'work', phase === 'longBreak')}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-300"
          />
        )}

        {/* Marcadores de sessão */}
        {segments.map((segment, index) => {
          const point = polarToCartesian(segment.startAngle);
          return (
            <circle
              key={`marker-${index}`}
              cx={point.x}
              cy={point.y}
              r={2}
              fill={segment.isCompleted || segment.isActive 
                ? getPhaseColor(segment.isBreak, segment.isLongBreak)
                : '#9ca3af'}
              className="transition-all duration-300"
            />
          );
        })}
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}