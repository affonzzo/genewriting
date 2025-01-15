import React, { useEffect, useState } from 'react';
import { useEditor } from '../../hooks/useEditor';
import { AuthModal } from '../AuthModal';
import { supabase } from '../../lib/supabase';

export function NoteEditor() {
  const { text, setText } = useEditor();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Verificar se o usuário está logado
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

  // Mostrar modal depois de alguns segundos digitando
  useEffect(() => {
    if (!isAuthenticated && hasStartedTyping && !showAuthModal) {
      console.log('Iniciando timer para mostrar modal...');
      const timer = setTimeout(() => {
        console.log('Mostrando modal...');
        setShowAuthModal(true);
      }, 5000); // 5 segundos

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, hasStartedTyping, showAuthModal]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    if (!hasStartedTyping && value.trim() !== '') {
      console.log('Usuário começou a digitar...');
      setHasStartedTyping(true);
    }
  };

  return (
    <>
      <div className="flex-1 overflow-auto">
        <div className="h-full">
          <textarea
            className="w-full h-full p-4 bg-white text-gray-900 resize-none focus:outline-none"
            value={text}
            onChange={handleChange}
            placeholder="Comece a escrever..."
          />
        </div>
      </div>
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => {
          console.log('Fechando modal...');
          setShowAuthModal(false);
        }} 
      />
    </>
  );
}
