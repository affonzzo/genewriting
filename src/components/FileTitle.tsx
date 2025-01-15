import React, { useState, useRef, useEffect } from 'react';

interface FileTitleProps {
  currentFileName?: string;
  onRename: (newName: string) => void;
}

export function FileTitle({ currentFileName = '', onRename }: FileTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(currentFileName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditValue(currentFileName);
  }, [currentFileName]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleFinishEditing = () => {
    setIsEditing(false);
    if (editValue.trim() && editValue !== currentFileName) {
      onRename(editValue.trim());
    } else {
      setEditValue(currentFileName);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleFinishEditing();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(currentFileName);
    }
  };

  const handleBlur = () => {
    handleFinishEditing();
  };

  return (
    <div className="relative flex items-center">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="
            w-48 px-2 py-1 text-sm bg-transparent border-b-2 border-primary-500
            focus:outline-none focus:border-primary-600
            text-gray-900 dark:text-gray-100
          "
          placeholder="Nome do arquivo"
        />
      ) : (
        <button
          onClick={handleStartEditing}
          className="
            px-2 py-1 text-sm text-gray-900 dark:text-gray-100
            hover:bg-luxury-50 dark:hover:bg-luxury-800/50 rounded
            transition-colors duration-150
          "
        >
          {currentFileName || 'Sem título'}.md
        </button>
      )}
    </div>
  );
}
