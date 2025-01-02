import { FormatType } from './types';
import { getCurrentNode, getClosestBlock } from './selection';

export function isFormatActive(format: FormatType): boolean {
  const node = getCurrentNode();
  if (!node) return false;

  const block = getClosestBlock(node);
  if (!block) return false;

  switch (format) {
    // Block formats
    case 'quote':
      return block.tagName === 'BLOCKQUOTE';
    case 'list':
      return !!block.closest('ul');
    case 'heading1':
      return block.tagName === 'H1';
    case 'heading2':
      return block.tagName === 'H2';
    case 'heading3':
      return block.tagName === 'H3';
    
    // Alignment
    case 'alignLeft':
      return document.queryCommandState('justifyLeft');
    case 'alignCenter':
      return document.queryCommandState('justifyCenter');
    case 'alignRight':
      return document.queryCommandState('justifyRight');
    case 'alignJustify':
      return document.queryCommandState('justifyFull');
    
    // Inline formats
    default:
      return document.queryCommandState(format);
  }
}