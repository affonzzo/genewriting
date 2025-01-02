import React from 'react';
import { Bomb, Timer, AlertTriangle } from 'lucide-react';
import { ModalWrapper } from './ModalWrapper';
import { BombWritingSettings } from '../../../utils/bomb-writing/types';
import { useBombWritingVisibility } from '../../../utils/bomb-writing/visibility';

interface StartModalProps {
  settings: BombWritingSettings;
  onStart: () => void;
}

export function StartModal({ settings, onStart }: StartModalProps) {
  const { setVisible } = useBombWritingVisibility();

  const handleStart = () => {
    // Oculta o card de configuração antes de iniciar a sessão
    setVisible(false);
    // Inicia a sessão
    onStart();
  };

  return (
    <ModalWrapper>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full mb-4">
          <Bomb className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Pronto para Começar? 💪
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Você terá {settings.totalTime} minutos para escrever sem parar por mais de {settings.maxPauseTime} segundos.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-center text-amber-700 mb-2">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <span className="font-medium">Regras Importantes</span>
          </div>
          <ul className="text-left text-sm text-amber-600 space-y-1">
            <li>• O texto anterior será bloqueado</li>
            <li>• Não pare de digitar por mais de {settings.maxPauseTime} segundos</li>
            <li>• Se pausar por muito tempo, perderá seu progresso</li>
            <li>• Foque em colocar seus pensamentos para fora, não na perfeição</li>
          </ul>
        </div>
      </div>

      <button
        onClick={handleStart}
        className="w-full py-4 px-6 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl hover:from-red-700 hover:to-rose-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        <div className="flex items-center justify-center">
          <Timer className="w-5 h-5 mr-2" />
          Começar a Escrever
        </div>
      </button>
    </ModalWrapper>
  );
}