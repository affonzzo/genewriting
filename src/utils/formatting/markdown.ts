/**
 * Converte HTML para texto formatado simples
 */
export function htmlToFormattedText(html: string): string {
  const temp = document.createElement('div');
  temp.innerHTML = html;

  function processNode(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent?.replace(/\s+/g, ' ') || '';
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();
      const content = Array.from(element.childNodes)
        .map(child => processNode(child))
        .join('');

      switch (tagName) {
        case 'p':
          return `\n${content}\n`;
        case 'h1':
          return `\n${content}\n`;
        case 'h2':
          return `\n${content}\n`;
        case 'h3':
          return `\n${content}\n`;
        case 'blockquote':
          return `\n${content}\n`;
        case 'ul':
          return content.split('\n')
            .filter(line => line.trim())
            .map(line => `• ${line}`)
            .join('\n');
        case 'li':
          return `${content}\n`;
        case 'br':
          return '\n';
        case 'strong':
        case 'b':
          return content;
        case 'em':
        case 'i':
          return content;
        case 'u':
          return content;
        default:
          return content;
      }
    }

    return '';
  }

  const formatted = processNode(temp)
    .split('\n')
    .filter((line, index, array) => {
      return line.trim() || (index > 0 && array[index - 1].trim());
    })
    .join('\n')
    .trim();

  return formatted;
}