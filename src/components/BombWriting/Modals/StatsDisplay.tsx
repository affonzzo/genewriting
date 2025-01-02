import React from 'react';
import { FileText, Gauge, Hash } from 'lucide-react';
import { BombWritingStats } from '../../../utils/bomb-writing/types';

interface StatsDisplayProps {
  stats: BombWritingStats;
  sessionNumber: number;
}

export function StatsDisplay({ stats, sessionNumber }: StatsDisplayProps) {
  const statItems = [
    {
      icon: FileText,
      value: stats.wordsCount,
      label: "Palavras",
      color: "text-blue-600"
    },
    {
      icon: Gauge,
      value: stats.averageWPM,
      label: "PPM",
      color: "text-indigo-600"
    },
    {
      icon: Hash,
      value: sessionNumber,
      label: "Sessão do Dia",
      color: "text-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {statItems.map((item, index) => (
        <div key={index} className="bg-gray-50 rounded-xl p-4 text-center transform hover:scale-105 transition-transform">
          <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-2`} />
          <div className="text-xl font-bold text-gray-900">{item.value}</div>
          <div className="text-sm text-gray-600">{item.label}</div>
        </div>
      ))}
    </div>
  );
}