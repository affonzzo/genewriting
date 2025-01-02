import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormatButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
}

export function FormatButton({ icon: Icon, onClick, isActive }: FormatButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-100 ${
        isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600'
      }`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}