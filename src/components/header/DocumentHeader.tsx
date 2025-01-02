import React, { useState } from 'react';
import { FileMenu } from './FileMenu';

interface DocumentHeaderProps {
  filename: string;
  onFilenameChange: (name: string) => void;
  onSave?: () => void;
  onSaveAs?: () => void;
  onOpen?: () => void;
  onExport?: () => void;
  onPublish?: () => void;
}

export function DocumentHeader({ 
  filename,
  onFilenameChange,
  onSave = () => {},
  onSaveAs = () => {},
  onOpen = () => {},
  onExport = () => {},
  onPublish = () => {}
}: DocumentHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(filename);
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);

  const handleSubmit = () => {
    if (editValue.trim()) {
      onFilenameChange(editValue.trim());
    }
    setIsEditing(false);
  };

  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
      <button
        className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-luxury-800 rounded-md transition-colors"
      >
        Início
      </button>

      <div className="relative">
        <button
          onClick={() => setIsFileMenuOpen(true)}
          className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-luxury-800 rounded-md transition-colors"
        >
          Arquivo
        </button>

        <FileMenu 
          isOpen={isFileMenuOpen}
          onClose={() => setIsFileMenuOpen(false)}
          onSave={onSave}
          onSaveAs={onSaveAs}
          onOpen={onOpen}
          onExport={onExport}
          onPublish={onPublish}
        />
      </div>

      <div className="h-4 w-px bg-gray-200 dark:bg-luxury-700 mx-1" />

      {isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          className="px-2 py-1 text-sm bg-white dark:bg-luxury-800 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30"
          autoFocus
        />
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="px-2 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-luxury-800 rounded-md transition-colors"
        >
          {filename || 'Untitled'}
        </button>
      )}
    </div>
  );
}