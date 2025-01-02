import { InlineElement } from '../types/elements';

/**
 * Formata elementos inline
 */
export function formatInlineElement(tagName: string, content: string): string {
  switch (tagName as InlineElement) {
    case 'strong':
    case 'b':
      return `**${content}**`;
    case 'em':
    case 'i':
      return `*${content}*`;
    case 'u':
      return `_${content}_`;
    default:
      return content;
  }
}