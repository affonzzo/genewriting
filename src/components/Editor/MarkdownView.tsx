import React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface MarkdownViewProps {
  content: string;
  className?: string;
  onEdit?: (content: string) => void;
  readOnly?: boolean;
}

export function MarkdownView({ content, className = '', onEdit, readOnly = false }: MarkdownViewProps) {
  // Configure marked options
  marked.setOptions({
    gfm: true,
    breaks: true,
    headerIds: false,
    mangle: false
  });

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (onEdit) {
      onEdit(e.currentTarget.innerText);
    }
  };

  // Sanitize and render markdown
  const sanitizedHtml = DOMPurify.sanitize(marked(content));

  return (
    <div className="relative min-h-full">
      {/* Editor */}
      {!readOnly && (
        <div
          contentEditable
          onInput={handleInput}
          className="absolute inset-0 font-mono text-gray-800 focus:outline-none"
          suppressContentEditableWarning
        >
          {content}
        </div>
      )}

      {/* Preview (only shown when readonly) */}
      {readOnly && (
        <div 
          className={`prose prose-slate max-w-none ${className}`}
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      )}
    </div>
  );
}