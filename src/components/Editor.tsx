import React, { useEffect, useState, useCallback } from 'react';
import { WritingMode } from '../types';
import { Paper } from './Paper';
import { SimpleEditor } from './Editor/SimpleEditor';
import { useStore } from '../store';
import { AuthModal } from './AuthModal';
import { supabase } from '../lib/supabase';

interface EditorProps {
  mode: WritingMode;
  text: string;
  onTextChange: (text: string) => void;
  isLocked?: boolean;
  lockedContent?: string;
}

export default function Editor({ 
  mode, 
  text, 
  onTextChange,
  isLocked = false,
  lockedContent = ''
}: EditorProps) {
  const store = useStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  // Verificar se o usuário está logado
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Quando o texto muda e não há arquivo atual, cria um novo
  useEffect(() => {
    if (text.trim() !== '' && !store.currentFile) {
      const newFile = store.createFile(store.currentFolderId);
      store.updateFileContent(newFile.id, text);
    } else if (store.currentFile) {
      store.updateFileContent(store.currentFile.id, text);
    }
  }, [text]);

  // Mostrar modal depois de alguns segundos digitando
  useEffect(() => {
    if (!isAuthenticated && hasStartedTyping && !showAuthModal) {
      const timer = setTimeout(() => {
        setShowAuthModal(true);
      }, 5000); // 5 segundos

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, hasStartedTyping, showAuthModal]);

  const handleChange = useCallback((value: string) => {
    onTextChange(value);
    if (!hasStartedTyping && value.trim() !== '') {
      setHasStartedTyping(true);
    }
  }, [onTextChange, hasStartedTyping]);

  return (
    <>
      <Paper>
        {isLocked && lockedContent && (
          <div className="border-b border-gray-100">
            <SimpleEditor
              content={lockedContent}
              onChange={() => {}}
              readOnly
              mode={mode}
            />
          </div>
        )}
        <SimpleEditor
          content={text}
          onChange={handleChange}
          readOnly={isLocked}
          mode={mode}
        />
      </Paper>
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
}