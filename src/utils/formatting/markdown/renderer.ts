import { marked } from 'marked';

/**
 * Configura e renderiza Markdown para HTML
 */
export function renderMarkdown(content: string): string {
  marked.setOptions({
    gfm: true,
    breaks: true,
    smartLists: true
  });

  return marked(content);
}