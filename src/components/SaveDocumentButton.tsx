import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useDocuments } from '../hooks/useDocuments';
import { AuthModal } from './auth/AuthModal';

interface SaveDocumentButtonProps {
  content: string;
}

export function SaveDocumentButton({ content }: SaveDocumentButtonProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();
  const { documents, saveDocument } = useDocuments();

  const handleSave = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (documents.length >= 12) {
      alert('Você atingiu o limite de 12 documentos. Delete alguns para continuar.');
      return;
    }

    setIsSaving(true);
    try {
      const title = content.split('\n')[0].slice(0, 50) || 'Untitled';
      await saveDocument(title, content);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <button
        onClick={handleSave}
        disabled={isSaving}
        className={`
          fixed right-12 top-8 z-50 px-4 py-2 bg-white rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.12)] 
          border border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-50 
          transition-all duration-200 flex items-center gap-2
          ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <Upload className="w-4 h-4" />
        <span className="text-sm font-medium">
          {isSaving ? 'Publicando...' : 'Publicar'}
        </span>
      </button>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}