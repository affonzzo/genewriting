import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isAssistant = role === 'assistant';

  return (
    <div className={`flex gap-2 ${isAssistant ? '' : 'flex-row-reverse'}`}>
      {/* Avatar */}
      <div className={`
        w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0
        ${isAssistant ? 'bg-primary text-luxury-900' : 'bg-luxury-700 text-primary'}
      `}>
        {isAssistant ? (
          <Bot className="w-3.5 h-3.5" />
        ) : (
          <User className="w-3.5 h-3.5" />
        )}
      </div>

      {/* Message */}
      <div className={`
        rounded-lg p-2 max-w-[85%]
        ${isAssistant 
          ? 'bg-luxury-800 text-white' 
          : 'bg-primary text-luxury-900'
        }
      `}>
        <p className="text-xs whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}