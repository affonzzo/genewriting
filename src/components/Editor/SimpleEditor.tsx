import React, { useRef, useState, useEffect } from 'react';
import { ReadabilityMetrics } from '../sidebar/ReadabilityMetrics';
import './styles.css';

interface SimpleEditorProps {
  content: string;
  onChange: (content: string) => void;
  readOnly?: boolean;
  mode?: 'line' | 'paragraph';
}

interface HighlightVisibility {
  longSentences: boolean;
  veryLongSentences: boolean;
}

// Função para marcar orações longas
function highlightText(text: string, visibility: HighlightVisibility) {
  if (!text) return '';

  // Regex para capturar orações completas
  const sentences = text.split(/([.!?]+)/g);
  let result = '';
  
  // Processa as orações
  for (let i = 0; i < sentences.length; i += 2) {
    const sentence = sentences[i];
    const punctuation = sentences[i + 1] || '';
    
    if (!sentence?.trim()) {
      result += punctuation;
      continue;
    }

    // Conta palavras na oração
    const wordCount = sentence.split(/\s+/).filter(word => word.length > 0).length;

    // Aplica o destaque apropriado baseado no número de palavras
    if (wordCount >= 35 && visibility.veryLongSentences) {
      result += `<span class="very-long-sentence">${sentence}</span>${punctuation}`;
    } else if (wordCount >= 25 && visibility.longSentences) {
      result += `<span class="long-sentence">${sentence}</span>${punctuation}`;
    } else {
      result += sentence + punctuation;
    }
  }

  return result;
}

export function SimpleEditor({ 
  content, 
  onChange,
  readOnly = false,
  mode = 'line',
}: SimpleEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [highlightVisibility, setHighlightVisibility] = useState<HighlightVisibility>({
    longSentences: true,
    veryLongSentences: true
  });

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (!readOnly) {
      const newContent = e.currentTarget.textContent || '';
      onChange(newContent);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      // Não faz nada, deixa o comportamento padrão do contentEditable
      return;
    }
  };

  const toggleVisibility = (type: keyof HighlightVisibility) => {
    setHighlightVisibility(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  useEffect(() => {
    if (editorRef.current && editorRef.current.textContent !== content) {
      editorRef.current.textContent = content;
    }
  }, [content]);

  useEffect(() => {
    if (editorRef.current && mode === 'line') {
      const editor = editorRef.current;
      const selection = window.getSelection();
      let cursorOffset = 0;
      
      // Salva a posição do cursor
      if (selection?.rangeCount) {
        const range = selection.getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(editor);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        cursorOffset = preCaretRange.toString().length;
      }

      // Aplica o highlighting
      editor.innerHTML = highlightText(editor.textContent || '', highlightVisibility);

      // Restaura o cursor
      if (selection?.rangeCount) {
        const range = document.createRange();
        let charCount = 0;
        let done = false;

        function findPosition(node: Node) {
          if (done) return;
          
          if (node.nodeType === Node.TEXT_NODE) {
            const nodeLength = node.textContent?.length || 0;
            if (charCount + nodeLength >= cursorOffset) {
              range.setStart(node, cursorOffset - charCount);
              range.setEnd(node, cursorOffset - charCount);
              done = true;
            }
            charCount += nodeLength;
          } else {
            for (const child of Array.from(node.childNodes)) {
              findPosition(child);
            }
          }
        }

        findPosition(editor);
        
        if (!done) {
          const lastChild = editor.lastChild || editor;
          range.selectNodeContents(lastChild);
          range.collapse(false);
        }

        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, [content, mode, highlightVisibility]);

  return (
    <div className="editor-container">
      <div
        ref={editorRef}
        contentEditable={!readOnly}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className="editor"
        suppressContentEditableWarning
        spellCheck
        data-placeholder="Comece a escrever..."
        data-mode={mode}
      />
      {mode === 'line' && (
        <ReadabilityMetrics 
          text={content} 
          highlightVisibility={highlightVisibility}
          onToggleVisibility={toggleVisibility}
        />
      )}
    </div>
  );
}