import React, { useRef, useEffect, useState } from 'react';
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
      
      // Atualiza o destaque imediatamente após a mudança
      if (mode === 'line' && editorRef.current) {
        const selection = window.getSelection();
        if (!selection?.rangeCount) return;
        
        const range = selection.getRangeAt(0);
        // Salva a posição relativa do cursor
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(editorRef.current);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        const caretOffset = preCaretRange.toString().length;

        // Atualiza o conteúdo
        requestAnimationFrame(() => {
          if (editorRef.current) {
            editorRef.current.innerHTML = highlightText(newContent, highlightVisibility);
            
            // Restaura o cursor na posição correta
            const sel = window.getSelection();
            const newRange = document.createRange();
            
            // Encontra a posição correta para o cursor
            let charCount = 0;
            let done = false;
            
            function findPosition(node: Node) {
              if (done) return;
              
              if (node.nodeType === Node.TEXT_NODE) {
                const nodeLength = node.textContent?.length || 0;
                if (charCount + nodeLength >= caretOffset) {
                  newRange.setStart(node, caretOffset - charCount);
                  newRange.setEnd(node, caretOffset - charCount);
                  done = true;
                }
                charCount += nodeLength;
              } else {
                for (const child of Array.from(node.childNodes)) {
                  findPosition(child);
                }
              }
            }
            
            findPosition(editorRef.current);
            
            if (!done) {
              // Se não encontrou a posição exata, coloca no final
              const lastChild = editorRef.current.lastChild || editorRef.current;
              newRange.selectNodeContents(lastChild);
              newRange.collapse(false);
            }
            
            sel?.removeAllRanges();
            sel?.addRange(newRange);
          }
        });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      const selection = window.getSelection();
      if (!selection?.rangeCount) return;
      
      const range = selection.getRangeAt(0);
      
      // Cria dois <br> para garantir o espaçamento correto
      const br1 = document.createElement('br');
      const br2 = document.createElement('br');
      
      range.deleteContents();
      range.insertNode(br1);
      range.insertNode(br2);
      
      // Cria um nó de texto vazio para posicionar o cursor
      const textNode = document.createTextNode('');
      range.insertNode(textNode);
      
      // Posiciona o cursor após a quebra de linha
      range.setStartAfter(textNode);
      range.setEndAfter(textNode);
      selection.removeAllRanges();
      selection.addRange(range);
      
      // Atualiza o conteúdo e mantém o destaque
      if (editorRef.current) {
        const newContent = editorRef.current.textContent || '';
        onChange(newContent);
        
        // Salva a posição do cursor
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(editorRef.current);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        const caretOffset = preCaretRange.toString().length;
        
        // Atualiza o destaque mantendo o cursor
        requestAnimationFrame(() => {
          if (editorRef.current) {
            const html = highlightText(newContent, highlightVisibility);
            editorRef.current.innerHTML = html;
            
            // Restaura o cursor
            const sel = window.getSelection();
            const newRange = document.createRange();
            let charCount = 0;
            let done = false;
            
            function findPosition(node: Node) {
              if (done) return;
              
              if (node.nodeType === Node.TEXT_NODE) {
                const nodeLength = node.textContent?.length || 0;
                if (charCount + nodeLength >= caretOffset) {
                  newRange.setStart(node, caretOffset - charCount);
                  newRange.setEnd(node, caretOffset - charCount);
                  done = true;
                }
                charCount += nodeLength;
              } else {
                for (const child of Array.from(node.childNodes)) {
                  findPosition(child);
                }
              }
            }
            
            findPosition(editorRef.current);
            
            if (!done) {
              const lastChild = editorRef.current.lastChild || editorRef.current;
              newRange.selectNodeContents(lastChild);
              newRange.collapse(false);
            }
            
            sel?.removeAllRanges();
            sel?.addRange(newRange);
          }
        });
      }
    }
  };

  const toggleVisibility = (type: keyof HighlightVisibility) => {
    setHighlightVisibility(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const selection = window.getSelection();
    let caretOffset = 0;
    
    if (selection?.rangeCount) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(editor);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    }

    // Atualiza o conteúdo com os destaques
    if (mode === 'line') {
      editor.innerHTML = highlightText(content, highlightVisibility);

      // Só tenta restaurar o cursor se havia uma seleção antes
      if (selection?.rangeCount) {
        requestAnimationFrame(() => {
          const sel = window.getSelection();
          const newRange = document.createRange();
          let charCount = 0;
          let done = false;
          
          function findPosition(node: Node) {
            if (done) return;
            
            if (node.nodeType === Node.TEXT_NODE) {
              const nodeLength = node.textContent?.length || 0;
              if (charCount + nodeLength >= caretOffset) {
                newRange.setStart(node, caretOffset - charCount);
                newRange.setEnd(node, caretOffset - charCount);
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
            newRange.selectNodeContents(lastChild);
            newRange.collapse(false);
          }
          
          sel?.removeAllRanges();
          sel?.addRange(newRange);
        });
      }
    } else {
      editor.textContent = content;
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
        translate="no"
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