import { BlockElement } from '../types/elements';

/**
 * Formata elementos de bloco
 */
export function formatBlockElement(tagName: string, content: string): string {
  switch (tagName as BlockElement) {
    case 'p':
      return `\n${content}\n`;
    case 'br':
      return '\n';
    case 'div':
      return `${content}\n`;
    case 'h1':
      return `\n# ${content}\n`;
    case 'h2':
      return `\n## ${content}\n`;
    case 'h3':
      return `\n### ${content}\n`;
    case 'blockquote':
      return `\n> ${content}\n`;
    case 'ul':
      return content.split('\n')
        .filter(line => line.trim())
        .map(line => `• ${line}`)
        .join('\n');
    case 'li':
      return content;
    default:
      return content;
  }
}