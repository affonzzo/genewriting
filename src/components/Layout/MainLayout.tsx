import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NoteSidebar } from '../sidebar/NoteSidebar';
import { NoteEditor } from '../Editor/NoteEditor';
import { Timer, BombIcon } from 'lucide-react';
import { UserMenu } from '../UserMenu';

export const MainLayout: React.FC = () => {
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [showBombWriting, setShowBombWriting] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="h-14 bg-white border-b border-gray-200 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            GeneWriting
          </h1>
          
          {/* Tools */}
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPomodoro(!showPomodoro)}
              className={`
                p-2 rounded-lg transition-colors duration-200
                ${showPomodoro
                  ? 'bg-red-100 text-red-800'
                  : 'hover:bg-gray-100 text-gray-600'
                }
              `}
            >
              <Timer size={20} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBombWriting(!showBombWriting)}
              className={`
                p-2 rounded-lg transition-colors duration-200
                ${showBombWriting
                  ? 'bg-orange-100 text-orange-800'
                  : 'hover:bg-gray-100 text-gray-600'
                }
              `}
            >
              <BombIcon size={20} />
            </motion.button>
          </div>
        </div>

        {/* User Menu */}
        <UserMenu />
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <NoteSidebar />

        {/* Editor */}
        <main className="flex-1 overflow-hidden">
          <NoteEditor />
        </main>
      </div>
    </div>
  );
};
