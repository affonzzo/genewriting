import React from 'react';
import { User } from 'lucide-react';

interface ProfileButtonProps {
  onClick: () => void;
}

export function ProfileButton({ onClick }: ProfileButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors duration-200"
      title="Perfil"
    >
      <User size={20} />
    </button>
  );
}
