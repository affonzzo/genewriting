import React from 'react';

export function MenuToggle({ className = "w-4 h-4", isOpen = true }: { className?: string, isOpen?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Three horizontal lines */}
      <line x1="4" y1="8" x2="20" y2="8" />
      <line x1="4" y1="16" x2="20" y2="16" />
      {/* Diagonal line when closed */}
      {!isOpen && (
        <line x1="4" y1="4" x2="20" y2="20" className="text-gray-600" />
      )}
    </svg>
  );
}