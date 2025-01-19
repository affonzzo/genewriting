import React, { useRef, useState } from 'react';
import { 
  ChevronDown, 
  FileText, 
  FilePlus2, 
  Save, 
  SaveAll, 
  FileInput, 
  Copy, 
  Trash2 
} from 'lucide-react';

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
          flex items-center gap-1 px-2 py-1.5 rounded-lg transition-all duration-300
          text-brand-gray hover:bg-brand-gold/10 hover:text-brand-gold 
          dark:text-brand-gray dark:hover:bg-brand-gold/10 dark:hover:text-brand-gold
        `}
      >
        <FileText className="w-5 h-5" />
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-brand-gray/20 py-1 min-w-[200px]
            dark:bg-black dark:border-brand-gray/20 dark:shadow-2xl"
        >
          <div className="space-y-1 p-1">
            <button
              onClick={() => {
                onNew?.();
                setIsOpen(false);
              }}
              disabled={!onNew}
              className="
                w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-300 disabled:opacity-50
                text-brand-gray hover:bg-brand-gold/10 hover:text-brand-gold 
                dark:text-brand-gray dark:hover:bg-brand-gold/10 dark:hover:text-brand-gold
              "
            >
              <FilePlus2 className="w-4 h-4" />
              Novo arquivo
            </button>

            <button
              onClick={() => {
                onSave?.();
                setIsOpen(false);
              }}
              disabled={!onSave}
              className="
                w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-300 disabled:opacity-50
                text-brand-gray hover:bg-brand-gold/10 hover:text-brand-gold 
                dark:text-brand-gray dark:hover:bg-brand-gold/10 dark:hover:text-brand-gold
              "
            >
              <Save className="w-4 h-4" />
              Salvar
            </button>

            <button
              onClick={() => {
                onSaveAs?.(currentFileName || '');
                setIsOpen(false);
              }}
              disabled={!onSaveAs}
              className="
                w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-300 disabled:opacity-50
                text-brand-gray hover:bg-brand-gold/10 hover:text-brand-gold 
                dark:text-brand-gray dark:hover:bg-brand-gold/10 dark:hover:text-brand-gold
              "
            >
              <SaveAll className="w-4 h-4" />
              Salvar como...
            </button>

            <button
              onClick={handleImportClick}
              disabled={!onImport}
              className="
                w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-300 disabled:opacity-50
                text-brand-gray hover:bg-brand-gold/10 hover:text-brand-gold 
                dark:text-brand-gray dark:hover:bg-brand-gold/10 dark:hover:text-brand-gold
              "
            >
              <FileInput className="w-4 h-4" />
              Importar...
            </button>

            <button
              onClick={() => {
                // TODO: Implement export
                setIsOpen(false);
              }}
              className="
                w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-300
                text-brand-gray hover:bg-brand-gold/10 hover:text-brand-gold 
                dark:text-brand-gray dark:hover:bg-brand-gold/10 dark:hover:text-brand-gold
              "
            >
              <FileInput className="w-4 h-4 rotate-180" />
              Exportar
            </button>

            <button
              onClick={() => {
                onDuplicate?.();
                setIsOpen(false);
              }}
              disabled={!onDuplicate}
              className="
                w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-300 disabled:opacity-50
                text-brand-gray hover:bg-brand-gold/10 hover:text-brand-gold 
                dark:text-brand-gray dark:hover:bg-brand-gold/10 dark:hover:text-brand-gold
              "
            >
              <Copy className="w-4 h-4" />
              Duplicar
            </button>

            <button
              onClick={() => {
                onDelete?.();
                setIsOpen(false);
              }}
              disabled={!onDelete}
              className="
                w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-300 disabled:opacity-50
                text-red-600 hover:bg-red-50 hover:text-red-700
                dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300
              "
            >
              <Trash2 className="w-4 h-4" />
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
