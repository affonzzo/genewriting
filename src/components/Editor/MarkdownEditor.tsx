import React, { useRef, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import './styles.css';

interface MarkdownEditorProps {
  content: string;
  onChange: (content: string) => void;
  readOnly?: boolean;
  isMarkdownView?: boolean;
}

export function MarkdownEditor({ 
  content, 
  onChange, 
  readOnly = false,
  isMarkdownView = false 
}: MarkdownEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    if (isMarkdownView) {
      // No preview mode, mostra o HTML renderizado
      const html = DOMPurify.sanitize(marked(content));
      editor.innerHTML = html;
    } else {
      // No modo de edição, mostra o markdown puro
      if (editor.innerText !== content) {
        editor.innerText = content;
      }
    }
  }, [content, isMarkdownView]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (!readOnly) {
      const newContent = e.currentTarget.innerText || '';
      onChange(newContent);
    }
  };

  return (
    <div className="editor-container">
      <div
        ref={editorRef}
        contentEditable={!readOnly && !isMarkdownView}
        onInput={handleInput}
        className={`${isMarkdownView ? 'preview prose prose-slate max-w-none' : 'editor'}`}
        suppressContentEditableWarning
        spellCheck={false}
        dir="ltr"
      />
    </div>
  );
}