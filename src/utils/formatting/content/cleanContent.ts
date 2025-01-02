/**
 * Cleans up formatted content by removing extra whitespace and line breaks
 */
export function cleanFormattedContent(content: string): string {
  return content
    .split('\n')
    .filter((line, index, array) => {
      // Mantém a linha se não for vazia ou se não houver muitas linhas vazias consecutivas
      return line.trim() || (index > 0 && array[index - 1].trim());
    })
    .join('\n')
    .trim();
}