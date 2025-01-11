import React, { useRef, useEffect } from 'react';
import './styles.css';
import { ReadabilityMetrics } from '../sidebar/ReadabilityMetrics';
import { calculateReadabilityMetrics } from '../../utils/readability';
import { WritingMode } from '../../types';

interface SimpleEditorProps {
  content: string;
  onChange: (content: string) => void;
  readOnly?: boolean;
  mode: WritingMode;
}

// Função para marcar palavras complexas e frases longas
function highlightText(text: string) {
  const sentences = text.split(/([.!?]+)/).filter(s => s.trim());
  let result = '';

  for (let i = 0; i < sentences.length; i += 2) {
    const sentence = sentences[i];
    const punctuation = sentences[i + 1] || '';
    
    // Verifica se é uma frase longa
    const words = sentence.split(/\s+/);
    if (words.length > 30) {
      result += `<span class="long-sentence">${sentence}</span>${punctuation}`;
    } else {
      // Marca palavras complexas
      const markedSentence = sentence.replace(/\b\w+\b/g, (word) => {
        const syllables = countSyllables(word);
        return syllables >= 3 ? `<span class="complex-word">${word}</span>` : word;
      });
      result += markedSentence + punctuation;
    }
  }

  return result;
}

// Função auxiliar para contar sílabas
function countSyllables(word: string): number {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const syllables = word.match(/[aeiouy]{1,2}/g);
  return syllables ? syllables.length : 1;
}

// Função para salvar a posição do cursor
function saveCaretPosition(element: HTMLElement) {
  const selection = window.getSelection();
  if (!selection?.rangeCount) return null;
  
  const range = selection.getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(element);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  return preCaretRange.toString().length;
}

// Função para restaurar a posição do cursor
function restoreCaretPosition(element: HTMLElement, pos: number) {
  const range = document.createRange();
  const selection = window.getSelection();
  if (!selection) return;

  let currentPos = 0;
  let found = false;

  function traverse(node: Node) {
    if (found) return;
    
    if (node.nodeType === Node.TEXT_NODE) {
      const nodeLength = node.textContent?.length || 0;
      if (currentPos + nodeLength >= pos) {
        range.setStart(node, pos - currentPos);
        range.setEnd(node, pos - currentPos);
        found = true;
        return;
      }
      currentPos += nodeLength;
    } else {
      for (const child of Array.from(node.childNodes)) {
        traverse(child);
      }
    }
  }

  traverse(element);
  
  if (!found) {
    // Se não encontrou a posição exata, coloca no final
    const lastChild = element.lastChild;
    if (lastChild) {
      range.setStartAfter(lastChild);
      range.setEndAfter(lastChild);
    }
  }

  selection.removeAllRanges();
  selection.addRange(range);
}

export function SimpleEditor({ 
  content, 
  onChange,
  readOnly = false,
  mode,
}: SimpleEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const lastCaretPosition = useRef<number | null>(null);

  // Atualiza o conteúdo quando a prop muda
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    // Salva a posição do cursor antes de atualizar o conteúdo
    if (document.activeElement === editor) {
      lastCaretPosition.current = saveCaretPosition(editor);
    }

    if (mode === 'line') {
      const markedText = highlightText(content);
      if (editor.innerHTML !== markedText) {
        editor.innerHTML = markedText || '';
      }
    } else {
      if (editor.textContent !== content) {
        editor.textContent = content || '';
      }
    }

    // Restaura a posição do cursor
    if (lastCaretPosition.current !== null && document.activeElement === editor) {
      restoreCaretPosition(editor, lastCaretPosition.current);
      lastCaretPosition.current = null;
    }
  }, [content, mode]);

  // Atualiza o texto quando o usuário digita
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
        data-mode={mode}
        style={{
          direction: 'ltr',
          unicodeBidi: 'plaintext'
        }}
      />
      {mode === 'line' && <ReadabilityMetrics text={content} />}
    </div>
  );
}