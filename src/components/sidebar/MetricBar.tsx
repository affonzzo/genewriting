import React from 'react';

interface MetricBarProps {
  value: number;
  maxValue: number;
  color: string;
  glowColor: string;
}

export function MetricBar({ value, maxValue, color, glowColor }: MetricBarProps) {
  const percentage = (value / maxValue) * 100;
  
  return (
    <div className="relative h-1 bg-gray-800/30 rounded-full overflow-hidden mt-1.5 backdrop-blur-sm">
      {/* Glow Effect */}
      <div 
        className={`absolute inset-0 blur-sm ${glowColor} opacity-50`}
        style={{ width: `${percentage}%` }}
      />
      
      {/* Main Bar */}
      <div 
        className={`absolute h-full left-0 top-0 rounded-full ${color} transition-all duration-500 ease-out`}
        style={{ width: `${percentage}%` }}
      />

      {/* Digital Lines Effect */}
      <div className="absolute inset-0 w-full h-full">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-px bg-black/10 backdrop-blur-sm"
            style={{ left: `${i * 10}%` }}
          />
        ))}
      </div>
    </div>
  );
}
