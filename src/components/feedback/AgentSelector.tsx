import React from 'react';
import { Bot, Brain, Wand2, Sparkles } from 'lucide-react';

interface AgentSelectorProps {
  onSelect: () => void;
}

export function AgentSelector({ onSelect }: AgentSelectorProps) {
  const agents = [
    {
      id: 'writing',
      name: 'Writing Assistant',
      description: 'Ajuda com escrita e estrutura',
      icon: Sparkles,
      color: 'text-primary bg-luxury-900'
    },
    {
      id: 'academic',
      name: 'Academic Reviewer',
      description: 'Textos acadêmicos e científicos',
      icon: Brain,
      color: 'text-primary bg-luxury-900'
    },
    {
      id: 'story',
      name: 'Story Consultant',
      description: 'Narrativas e personagens',
      icon: Bot,
      color: 'text-primary bg-luxury-900'
    },
    {
      id: 'creative',
      name: 'Creative Coach',
      description: 'Criatividade e ideias',
      icon: Wand2,
      color: 'text-primary bg-luxury-900'
    }
  ];

  return (
    <div className="absolute left-0 right-0 mt-2 p-1.5 bg-luxury-900 rounded-lg border border-luxury-700 shadow-xl z-50">
      <div className="space-y-0.5">
        {agents.map(agent => (
          <button
            key={agent.id}
            onClick={onSelect}
            className="w-full flex items-center gap-2 p-1.5 hover:bg-luxury-800 rounded-lg transition-colors group"
          >
            <div className={`w-6 h-6 rounded-lg ${agent.color} flex items-center justify-center`}>
              <agent.icon className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <h3 className="text-xs font-medium text-white group-hover:text-primary transition-colors">
                {agent.name}
              </h3>
              <p className="text-[10px] text-gray-400">{agent.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}