import { BLOCK_ELEMENTS } from '../types/elements';
import { formatBlockElement } from './blockFormatting';
import { formatInlineElement } from './inlineFormatting';

/**
 * Processa um nó do DOM e retorna seu conteúdo formatado
 */
export function processNode(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent || '';
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node as Element;
    const tagName = element.tagName.toLowerCase();
    const content = Array.from(element.childNodes)
      .map(child => processNode(child))
      .join('');

    if (BLOCK_ELEMENTS.includes(tagName as any)) {
      return formatBlockElement(tagName, content);
    }
    
    return formatInlineElement(tagName, content);
  }

  return '';
}