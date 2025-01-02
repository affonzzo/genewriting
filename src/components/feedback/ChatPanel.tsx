import React, { useState } from 'react';
import { Send, ChevronDown, Sparkles } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { AgentSelector } from './AgentSelector';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function ChatPanel() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! Como posso ajudar com seu texto?'
    }
  ]);
  const [showAgentSelector, setShowAgentSelector] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col bg-white dark:bg-luxury-800/95 rounded-xl overflow-hidden border border-gray-200 dark:border-luxury-600 shadow-xl dark:shadow-2xl backdrop-blur-xl">
      {/* Header with Agent Selector */}
      <div className="px-3 py-2.5 bg-gray-50/80 dark:bg-gradient-to-r from-luxury-800 to-luxury-700 border-b border-gray-200 dark:border-luxury-600">
        <button
          onClick={() => setShowAgentSelector(!showAgentSelector)}
          className="w-full flex items-center justify-between group"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-luxury-900" />
            </div>
            <div className="text-left">
              <h2 className="text-xs font-medium text-gray-900 dark:text-white">Writing Assistant</h2>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">Powered by AI</p>
            </div>
          </div>
          <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${showAgentSelector ? 'rotate-180' : ''}`} />
        </button>

        {showAgentSelector && <AgentSelector onSelect={() => setShowAgentSelector(false)} />}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-luxury-600 scrollbar-track-transparent">
        {messages.map(msg => (
          <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
        ))}
      </div>

      {/* Input */}
      <div className="p-3 bg-gradient-to-b from-transparent to-gray-50/80 dark:to-luxury-800 border-t border-gray-200 dark:border-luxury-600">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-white dark:bg-luxury-900 text-gray-900 dark:text-white placeholder-gray-500 rounded-lg border border-gray-200 dark:border-luxury-600 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
          />
          <button
            type="submit"
            className="p-2 bg-primary text-luxury-900 rounded-lg hover:bg-[#FFE14D] transition-all duration-200 shadow-lg"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}