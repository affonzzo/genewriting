export const formatCommands = {
  // Inline formatting
  bold: () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    
    const range = selection.getRangeAt(0);
    const text = range.toString();
    if (!text) return;
    
    const newText = `**${text}**`;
    range.deleteContents();
    range.insertNode(document.createTextNode(newText));
    
    // Restore selection
    selection.removeAllRanges();
    selection.addRange(range);
  },
  
  italic: () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    
    const range = selection.getRangeAt(0);
    const text = range.toString();
    if (!text) return;
    
    const newText = `*${text}*`;
    range.deleteContents();
    range.insertNode(document.createTextNode(newText));
    
    // Restore selection
    selection.removeAllRanges();
    selection.addRange(range);
  },
  
  underline: () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    
    const range = selection.getRangeAt(0);
    const text = range.toString();
    if (!text) return;
    
    const newText = `_${text}_`;
    range.deleteContents();
    range.insertNode(document.createTextNode(newText));
    
    // Restore selection
    selection.removeAllRanges();
    selection.addRange(range);
  },

  // Block formatting
  list: () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    
    const range = selection.getRangeAt(0);
    const text = range.toString();
    if (!text) return;
    
    const lines = text.split('\n');
    const formattedText = lines.map(line => `- ${line}`).join('\n');
    
    range.deleteContents();
    range.insertNode(document.createTextNode(formattedText));
  },

  // ... rest of the commands remain the same ...
};