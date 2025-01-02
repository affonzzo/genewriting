import { Selection } from './types';

function normalizeContent(html: string): string {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.innerHTML;
}

export function handleEditorInput(
  element: HTMLDivElement,
  onTextChange: (text: string) => void
) {
  // Store current selection
  const selection = window.getSelection();
  const range = selection?.getRangeAt(0);
  
  // Get and normalize content
  const content = normalizeContent(element.innerHTML);
  
  // Update parent state
  onTextChange(content);
  
  // Restore selection
  if (range && selection) {
    try {
      selection.removeAllRanges();
      selection.addRange(range);
    } catch (e) {
      console.warn('Failed to restore selection:', e);
    }
  }
}