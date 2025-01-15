import React, { useRef, useState } from 'react';
import { ChevronDown, File, FilePlus, Save, SaveAll, Import, Copy, Trash } from 'lucide-react';

interface FileMenuProps {
  text: string;
  currentFileName?: string;
  onNew?: () => void;
  onSave?: (name?: string) => void;
  onSaveAs?: (name: string) => void;
  onImport?: (text: string) => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
}

export function FileMenu({
  text,
  currentFileName,
  onNew,
  onSave,
  onSaveAs,
  onImport,
  onDuplicate,
  onDelete
}: FileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onImport) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        onImport(text);
      }
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentFileName || 'untitled'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          p-1.5 rounded-md transition-colors duration-150 flex items-center gap-1
          text-gray-600 hover:bg-luxury-50 dark:text-gray-400 dark:hover:bg-luxury-800
        `}
      >
        <File className="w-5 h-5" />
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="
          absolute top-full left-0 mt-1 w-48
          bg-white dark:bg-luxury-800
          border border-gray-200 dark:border-luxury-700
          rounded-md shadow-lg
          z-50
        ">
          <div className="py-1">
            <button
              onClick={() => { onNew?.(); setIsOpen(false); }}
              className="
                w-full px-4 py-2 text-sm text-left flex items-center gap-2
                text-gray-700 dark:text-gray-200
                hover:bg-luxury-50 dark:hover:bg-luxury-700
              "
            >
              <FilePlus className="w-4 h-4" />
              Novo arquivo
            </button>

            <button
              onClick={() => { onSave?.(); setIsOpen(false); }}
              className="
                w-full px-4 py-2 text-sm text-left flex items-center gap-2
                text-gray-700 dark:text-gray-200
                hover:bg-luxury-50 dark:hover:bg-luxury-700
              "
            >
              <Save className="w-4 h-4" />
              Salvar
            </button>

            <button
              onClick={() => { onSaveAs?.(currentFileName || 'Sem título'); setIsOpen(false); }}
              className="
                w-full px-4 py-2 text-sm text-left flex items-center gap-2
                text-gray-700 dark:text-gray-200
                hover:bg-luxury-50 dark:hover:bg-luxury-700
              "
            >
              <SaveAll className="w-4 h-4" />
              Salvar como...
            </button>

            <hr className="my-1 border-gray-200 dark:border-luxury-700" />

            <button
              onClick={handleImportClick}
              className="
                w-full px-4 py-2 text-sm text-left flex items-center gap-2
                text-gray-700 dark:text-gray-200
                hover:bg-luxury-50 dark:hover:bg-luxury-700
              "
            >
              <Import className="w-4 h-4" />
              Importar...
            </button>

            <button
              onClick={handleExport}
              className="
                w-full px-4 py-2 text-sm text-left flex items-center gap-2
                text-gray-700 dark:text-gray-200
                hover:bg-luxury-50 dark:hover:bg-luxury-700
              "
            >
              <Import className="w-4 h-4 rotate-180" />
              Exportar
            </button>

            <hr className="my-1 border-gray-200 dark:border-luxury-700" />

            <button
              onClick={() => { onDuplicate?.(); setIsOpen(false); }}
              className="
                w-full px-4 py-2 text-sm text-left flex items-center gap-2
                text-gray-700 dark:text-gray-200
                hover:bg-luxury-50 dark:hover:bg-luxury-700
              "
            >
              <Copy className="w-4 h-4" />
              Duplicar
            </button>

            <button
              onClick={() => { onDelete?.(); setIsOpen(false); }}
              className="
                w-full px-4 py-2 text-sm text-left flex items-center gap-2
                text-red-600 dark:text-red-400
                hover:bg-red-50 dark:hover:bg-red-900/20
              "
            >
              <Trash className="w-4 h-4" />
              Excluir
            </button>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.txt"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
