import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileExplorer } from './FileExplorer';
import { ReadabilityMetrics } from './ReadabilityMetrics';
import { useNoteStore } from '../../stores/noteStore';
import {
  Search,
  FolderTree,
  BarChart2,
  Clock,
  Tag,
  Settings,
  Plus,
  X
} from 'lucide-react';

const SidebarTab: React.FC<{
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ icon, label, active, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`
      flex items-center p-2 rounded-lg cursor-pointer
      transition-colors duration-200 ease-in-out
      ${active
        ? 'bg-blue-100 text-blue-800'
        : 'hover:bg-gray-100 text-gray-700'
      }
    `}
  >
    <span className="mr-2">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </motion.div>
);

export const NoteSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('files');
  const [searchQuery, setSearchQuery] = useState('');
  const { createNote, createFolder } = useNoteStore();

  const handleCreateNew = () => {
    // Modal ou popover para criar nova nota/pasta
  };

  const sidebarContent = {
    files: <FileExplorer />,
    metrics: <ReadabilityMetrics />,
    recent: <div>Recent Notes</div>,
    tags: <div>Tags</div>,
    settings: <div>Settings</div>,
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      {/* Barra de Pesquisa */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              w-full pl-10 pr-4 py-2
              bg-gray-50 border border-gray-200
              rounded-lg text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500
              transition-all duration-200
            "
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <X size={14} className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Botão de Nova Nota/Pasta */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleCreateNew}
        className="
          mx-4 mt-4 mb-2 px-4 py-2
          bg-blue-600 hover:bg-blue-700
          text-white rounded-lg
          flex items-center justify-center
          transition-colors duration-200
        "
      >
        <Plus size={18} className="mr-2" />
        <span className="text-sm font-medium">New Note</span>
      </motion.button>

      {/* Navegação */}
      <nav className="px-2 py-4 space-y-1">
        <SidebarTab
          icon={<FolderTree size={18} />}
          label="Files"
          active={activeTab === 'files'}
          onClick={() => setActiveTab('files')}
        />
        <SidebarTab
          icon={<BarChart2 size={18} />}
          label="Metrics"
          active={activeTab === 'metrics'}
          onClick={() => setActiveTab('metrics')}
        />
        <SidebarTab
          icon={<Clock size={18} />}
          label="Recent"
          active={activeTab === 'recent'}
          onClick={() => setActiveTab('recent')}
        />
        <SidebarTab
          icon={<Tag size={18} />}
          label="Tags"
          active={activeTab === 'tags'}
          onClick={() => setActiveTab('tags')}
        />
        <SidebarTab
          icon={<Settings size={18} />}
          label="Settings"
          active={activeTab === 'settings'}
          onClick={() => setActiveTab('settings')}
        />
      </nav>

      {/* Conteúdo da Tab Ativa */}
      <div className="flex-grow overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {sidebarContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
