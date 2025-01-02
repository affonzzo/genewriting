import React from 'react';
import { Save, Download, Upload, FolderOpen, FileOutput } from 'lucide-react';

interface FileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onSaveAs: () => void;
  onOpen: () => void;
  onExport: () => void;
  onPublish: () => void;
}

export function FileMenu({ 
  isOpen, 
  onClose,
  onSave,
  onSaveAs,
  onOpen,
  onExport,
  onPublish
}: FileMenuProps) {
  if (!isOpen) return null;

  const menuItems = [
    { label: 'Abrir', icon: FolderOpen, onClick: onOpen },
    { label: 'Salvar', icon: Save, onClick: onSave },
    { label: 'Salvar como', icon: FileOutput, onClick: onSaveAs },
    { label: 'Exportar', icon: Download, onClick: onExport },
    { label: 'Publicar', icon: Upload, onClick: onPublish },
  ];

  return (
    <>
      <div 
        className="fixed inset-0 z-50"
        onClick={onClose}
      />
      
      <div className="absolute top-full left-0 mt-1 bg-white dark:bg-luxury-800 rounded-lg shadow-lg border border-gray-200 dark:border-luxury-600 py-1 min-w-[180px] z-50">
        {menuItems.map((item, index) => (
          <button
            key={item.label}
            onClick={() => {
              item.onClick();
              onClose();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-luxury-700 transition-colors"
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}