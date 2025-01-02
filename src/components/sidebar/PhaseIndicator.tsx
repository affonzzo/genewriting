import React from 'react';
import { Brain, Coffee } from 'lucide-react';

interface PhaseIndicatorProps {
  phase: 'work' | 'shortBreak' | 'longBreak';
}

export function PhaseIndicator({ phase }: PhaseIndicatorProps) {
  const getPhaseInfo = () => {
    switch (phase) {
      case 'work':
        return {
          icon: Brain,
          label: 'Foco',
          color: 'text-indigo-600'
        };
      case 'shortBreak':
        return {
          icon: Coffee,
          label: 'Pausa Curta',
          color: 'text-emerald-600'
        };
      case 'longBreak':
        return {
          icon: Coffee,
          label: 'Pausa Longa',
          color: 'text-blue-600'
        };
    }
  };

  const { icon: Icon, label, color } = getPhaseInfo();

  return (
    <div className={`flex items-center space-x-2 ${color}`}>
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </div>
  );
}