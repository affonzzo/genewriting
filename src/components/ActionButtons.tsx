import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useDocuments } from '../hooks/useDocuments';

interface ActionButtonsProps {
  content: string;
  onAuthClick: () => void;
}

export function ActionButtons({ content, onAuthClick }: ActionButtonsProps) {
  const { user } = useAuth();
  const { documents } = useDocuments();

  // Keep these functions for the File menu to use
  const handleSave = async () => {
    if (!user) {
      onAuthClick();
      return;
    }

    if (documents.length >= 12) {
      alert('Você atingiu o limite de 12 documentos. Delete alguns para continuar.');
      return;
    }
  };

  const handleExport = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'documento.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Return null since we don't need to render any buttons
  return null;
}