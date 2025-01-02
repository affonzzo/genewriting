import React from 'react';

interface BombIconProps {
  className?: string;
  strikethrough?: boolean;
}

export function BombIcon({ className = "w-4 h-4", strikethrough = false }: BombIconProps) {
  return (
    <div className="relative">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        {/* Pavio da bomba */}
        <path 
          d="M14 6c1.5-2 2-2.5 3-2.5 1.5 0 2.5 1 2.5 2.5 0 1.5-1 2-2 3" 
          className="stroke-red-600"
        />
        
        {/* Corpo da bomba */}
        <circle 
          cx="12" 
          cy="13" 
          r="7" 
          className="fill-red-500 stroke-red-600" 
        />
        
        {/* Base do pavio */}
        <path 
          d="M14.5 8.5L13 11" 
          className="stroke-red-600" 
          strokeWidth="2.5"
        />
      </svg>
      {strikethrough && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-0.5 bg-gray-400 rotate-45 transform origin-center" />
        </div>
      )}
    </div>
  );
}