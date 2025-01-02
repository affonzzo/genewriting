// Selection utilities
export function getSelection(): Selection | null {
  return window.getSelection();
}

export function getCurrentNode(): Node | null {
  const selection = getSelection();
  return selection?.anchorNode || null;
}

export function getParentElement(node: Node | null): Element | null {
  if (!node) return null;
  return node.nodeType === 3 ? node.parentElement : node as Element;
}

export function getClosestBlock(node: Node | null): Element | null {
  const element = getParentElement(node);
  if (!element) return null;
  
  const blockTags = ['P', 'H1', 'H2', 'H3', 'BLOCKQUOTE', 'UL', 'OL'];
  return element.closest(blockTags.join(','));
}