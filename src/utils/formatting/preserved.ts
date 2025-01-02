import { processNode } from './content/nodeProcessor';
import { cleanFormattedContent } from './content/cleanContent';

/**
 * Formata o conteúdo preservado para manter a formatação correta
 * e remover tags HTML desnecessárias
 */
export function formatPreservedContent(html: string): string {
  const temp = document.createElement('div');
  temp.innerHTML = html;

  const formatted = processNode(temp);
  return cleanFormattedContent(formatted);
}