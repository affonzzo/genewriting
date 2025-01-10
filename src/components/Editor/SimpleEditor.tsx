import React, { useRef, useEffect } from 'react';
import './styles.css';

interface SimpleEditorProps {
  content: string;
  onChange: (content: string) => void;
  readOnly?: boolean;
}

export function SimpleEditor({ 
  content, 
  onChange,
  readOnly = false,
}: SimpleEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    if (editor.textContent !== content) {
      editor.textContent = content || '';
    }
  }, [content]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (!readOnly) {
      const newContent = e.currentTarget.textContent || '';
      // Se o conteúdo estiver vazio, garante que o editor fique realmente vazio
      if (!newContent.trim()) {
        e.currentTarget.textContent = '';
      }
      onChange(newContent);
    }
  };

  return (
    <div className="editor-container">
      <div
        ref={editorRef}
        contentEditable={!readOnly}
        onInput={handleInput}
        className="editor"
        suppressContentEditableWarning
        spellCheck
        translate="no"
        data-placeholder="Comece a escrever..."
        style={{
          direction: 'ltr',
          unicodeBidi: 'plaintext'
        }}
      />
    </div>
  );
}