// Formatting commands and their configurations
export const formatCommands = {
  bold: () => document.execCommand('bold', false),
  italic: () => document.execCommand('italic', false),
  underline: () => document.execCommand('underline', false),
  
  list: () => {
    // Toggle list state
    const isInList = isFormatActive('insertUnorderedList');
    if (isInList) {
      // If already in a list, convert back to paragraph
      document.execCommand('insertUnorderedList', false);
      document.execCommand('formatBlock', false, '<p>');
    } else {
      document.execCommand('insertUnorderedList', false);
    }
  },

  quote: () => {
    // Toggle blockquote state
    const isQuote = isFormatActive('blockquote');
    if (isQuote) {
      document.execCommand('formatBlock', false, '<p>');
    } else {
      document.execCommand('formatBlock', false, '<blockquote>');
    }
  },
  
  alignLeft: () => document.execCommand('justifyLeft', false),
  alignCenter: () => document.execCommand('justifyCenter', false),
  alignRight: () => document.execCommand('justifyRight', false),
  alignJustify: () => document.execCommand('justifyFull', false),
  
  heading1: () => {
    const isH1 = isFormatActive('h1');
    document.execCommand('formatBlock', false, isH1 ? '<p>' : '<h1>');
  },
  heading2: () => {
    const isH2 = isFormatActive('h2');
    document.execCommand('formatBlock', false, isH2 ? '<p>' : '<h2>');
  },
  heading3: () => {
    const isH3 = isFormatActive('h3');
    document.execCommand('formatBlock', false, isH3 ? '<p>' : '<h3>');
  },
  paragraph: () => document.execCommand('formatBlock', false, '<p>'),
  
  undo: () => document.execCommand('undo', false),
  redo: () => document.execCommand('redo', false)
};

// Check if a format is currently active
export function isFormatActive(format: string): boolean {
  const selection = window.getSelection();
  if (!selection?.anchorNode) return false;

  switch (format) {
    case 'blockquote':
      return !!getParentOfType(selection.anchorNode, 'BLOCKQUOTE');
    case 'h1':
      return !!getParentOfType(selection.anchorNode, 'H1');
    case 'h2':
      return !!getParentOfType(selection.anchorNode, 'H2');
    case 'h3':
      return !!getParentOfType(selection.anchorNode, 'H3');
    case 'insertUnorderedList':
      return !!getParentOfType(selection.anchorNode, 'UL');
    default:
      return document.queryCommandState(format);
  }
}

// Helper to find parent element of specific type
function getParentOfType(node: Node, type: string): Element | null {
  let current = node.parentElement;
  while (current) {
    if (current.tagName === type) return current;
    current = current.parentElement;
  }
  return null;
}