import React from 'react';
import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  onShare: () => void;
}

export function ShareButton({ onShare }: ShareButtonProps) {
  return (
    <button
      onClick={onShare}
      className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors duration-200"
      title="Compartilhar"
    >
      <Share2 size={20} />
    </button>
  );
}
