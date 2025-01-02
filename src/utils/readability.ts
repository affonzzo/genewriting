interface ReadabilityMetrics {
  fleschScore: number;
  fogIndex: number;
  wordCount: number;
  sentenceCount: number;
  complexWordCount: number;
  complexWords: string[];
  avgWordsPerSentence: number;
}

export function calculateReadabilityMetrics(text: string): ReadabilityMetrics {
  // Split text into words and sentences
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  
  // Calculate basic metrics
  const wordCount = words.length;
  const sentenceCount = sentences.length;
  const avgWordsPerSentence = wordCount / (sentenceCount || 1);

  // Identify complex words (words with 3 or more syllables)
  const complexWords = words.filter(word => countSyllables(word) >= 3);
  const complexWordCount = complexWords.length;

  // Calculate Flesch Reading Ease score
  // Formula: 206.835 - 1.015 × (words/sentences) - 84.6 × (syllables/words)
  const totalSyllables = words.reduce((sum, word) => sum + countSyllables(word), 0);
  const fleschScore = 206.835 - 
    1.015 * avgWordsPerSentence - 
    84.6 * (totalSyllables / wordCount);

  // Calculate Gunning Fog Index
  // Formula: 0.4 × ((words/sentences) + 100 × (complex words/words))
  const fogIndex = 0.4 * (
    avgWordsPerSentence + 
    100 * (complexWordCount / wordCount)
  );

  return {
    fleschScore: Math.max(0, Math.min(100, fleschScore)),
    fogIndex: Math.max(0, fogIndex),
    wordCount,
    sentenceCount,
    complexWordCount,
    complexWords,
    avgWordsPerSentence,
  };
}

function countSyllables(word: string): number {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;

  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');

  const syllables = word.match(/[aeiouy]{1,2}/g);
  return syllables ? syllables.length : 1;
}