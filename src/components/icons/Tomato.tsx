import React from 'react';

export function Tomato({ className = "w-4 h-4", strikethrough = false }: { className?: string, strikethrough?: boolean }) {
  return (
    <div className="relative">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        {/* Leaf */}
        <path d="M12 4c0 0-3-2-3 0s2 3 3 3" fill="#4ade80" stroke="#4ade80" />
        {/* Tomato body */}
        <circle cx="12" cy="13" r="8" fill="#ef4444" stroke="#ef4444" />
      </svg>
      {strikethrough && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-0.5 bg-gray-600 rotate-45 transform origin-center" />
        </div>
      )}
    </div>
  );
}