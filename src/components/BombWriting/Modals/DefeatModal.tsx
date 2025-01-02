import React from 'react';
import { Bomb, Settings } from 'lucide-react';
import { ModalWrapper } from './ModalWrapper';

interface DefeatModalProps {
  onRetry: () => void;
  onReconfigure: () => void;
}

export function DefeatModal({ onRetry, onReconfigure }: DefeatModalProps) {
  return (
    <ModalWrapper>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full mb-4 animate-pulse">
          <Bomb className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          BOOM! Você Falhou! 💥
        </h2>
        <p className="text-gray-600 text-lg mb-4">
          Que patético! Nem consegue manter o foco por alguns segundos?
        </p>
        <p className="text-sm text-red-600 font-medium">
          Todo seu progresso foi pelos ares. Espero que esteja satisfeito(a).
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={onRetry}
          className="w-full py-4 px-6 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl hover:from-red-700 hover:to-rose-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-center">
            <Bomb className="w-5 h-5 mr-2" />
            Tentar Novamente
          </div>
        </button>

        <button
          onClick={onReconfigure}
          className="w-full py-3 px-6 border-2 border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium text-base flex items-center justify-center"
        >
          <Settings className="w-4 h-4 mr-2" />
          Reconfigurar Sessão
        </button>
      </div>
    </ModalWrapper>
  );
}