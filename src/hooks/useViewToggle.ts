import { useState, useCallback } from 'react';

export function useViewToggle() {
  const [isMarkdownView, setIsMarkdownView] = useState(false);

  const toggleView = useCallback(() => {
    setIsMarkdownView(prev => !prev);
  }, []);

  return {
    isMarkdownView,
    toggleView
  };
}