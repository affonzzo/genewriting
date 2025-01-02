import React from 'react';
import { Trophy, X, Settings, Play } from 'lucide-react';
import { BombWritingStats } from '../../../utils/bomb-writing/types';
import { ModalWrapper } from './ModalWrapper';
import { StatsDisplay } from './StatsDisplay';

interface VictoryModalProps {
  stats: BombWritingStats;
  sessionNumber: number;
  onStartNew: () => void;
  onReconfigure: () => void;
  onClose: () => void;
}

export function VictoryModal({ 
  stats, 
  sessionNumber,
  onStartNew, 
  onReconfigure, 
  onClose 
}: VictoryModalProps) {
  return (
    <ModalWrapper preventOutsideClick={false} onClose={onClose}>
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute right-0 top-0 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full mb-4 animate-bounce">
            <Trophy className="w-8 h-8 text-yellow-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Vitória Explosiva! 🎉
          </h2>
          <p className="text-gray-600 text-lg">
            Você dominou o caos e transformou a pressão em produtividade!
          </p>
        </div>

        <StatsDisplay stats={stats} sessionNumber={sessionNumber} />

        <div className="space-y-3">
          <button
            onClick={onStartNew}
            className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-center">
              <Play className="w-5 h-5 mr-2" />
              Nova Sessão Explosiva
            </div>
          </button>

          <button
            onClick={onReconfigure}
            className="w-full py-3 px-6 border-2 border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium text-base flex items-center justify-center"
          >
            <Settings className="w-4 h-4 mr-2" />
            Reconfigurar Próxima Sessão
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}