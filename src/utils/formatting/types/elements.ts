/**
 * Define tipos para elementos HTML suportados
 */
export type BlockElement = 'p' | 'br' | 'div' | 'h1' | 'h2' | 'h3' | 'blockquote' | 'ul' | 'li';
export type InlineElement = 'strong' | 'b' | 'em' | 'i' | 'u';

export const BLOCK_ELEMENTS: BlockElement[] = ['p', 'br', 'div', 'h1', 'h2', 'h3', 'blockquote', 'ul', 'li'];
export const INLINE_ELEMENTS: InlineElement[] = ['strong', 'b', 'em', 'i', 'u'];