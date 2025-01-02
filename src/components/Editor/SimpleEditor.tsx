import React, { useRef, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { formatCommands } from '../../utils/formatting/commands';
import './styles.css';

interface SimpleEditorProps {
  content: string;
  onChange: (content: string) => void;
  readOnly?: boolean;
  isMarkdownView?: boolean;
}

export function SimpleEditor({ 
  content, 
  onChange, 
  readOnly = false,
  isMarkdownView = false 
}: SimpleEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    if (isMarkdownView) {
      const html = content 
        ? DOMPurify.sanitize(marked(content))
        : '<div class="text-gray-400">Comece a escrever...</div>';
      editor.innerHTML = html;
    } else {
      if (editor.textContent !== content) {
        editor.textContent = content || '';
      }
    }
  }, [content, isMarkdownView]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (!readOnly) {
      const newContent = e.currentTarget.textContent || '';
      onChange(newContent);
    }
  };

  return (
    <div className="editor-container">
      <div
        ref={editorRef}
        contentEditable={!readOnly && !isMarkdownView}
        onInput={handleInput}
        className={isMarkdownView ? 'preview prose prose-slate max-w-none' : 'editor'}
        suppressContentEditableWarning
        spellCheck
        translate="no"
        style={{
          direction: 'ltr',
          unicodeBidi: 'plaintext'
        }}
      />
    </div>
  );
}