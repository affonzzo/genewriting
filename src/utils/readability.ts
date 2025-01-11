import { COMMON_WORDS_5000 } from './readability/commonWordsPt';

interface ReadabilityMetrics {
  fleschScore: number;          // 0-100
  fleschKincaidScore: number;   // 0-20
  gunningFogScore: number;      // 0-20
  ariScore: number;             // 0-20
  colemanLiauScore: number;     // 0-20
  gulpeaseScore: number;        // 0-100
  wordCount: number;
  sentenceCount: number;
  syllableCount: number;
  letterCount: number;
  complexWordCount: number;
  complexWords: string[];
  avgWordsPerSentence: number;
  avgSyllablesPerWord: number;
  avgLettersPerWord: number;
  longSentences: { text: string; wordCount: number }[];
}

export function calculateReadabilityMetrics(text: string): ReadabilityMetrics {
  // Split text into words and sentences
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const sentenceCount = sentences.length;
  const avgWordsPerSentence = wordCount / (sentenceCount || 1);

  // Calculate letter count (excluding spaces and punctuation)
  const letterCount = text.replace(/[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]/g, '').length;
  const avgLettersPerWord = letterCount / (wordCount || 1);

  // Calculate syllable count
  const syllableCount = words.reduce((sum, word) => sum + countSyllables(word), 0);
  const avgSyllablesPerWord = syllableCount / (wordCount || 1);

  // Identify complex words (not in top 5000 or 3+ syllables)
  const complexWords = words.filter(word => {
    const normalized = word.toLowerCase();
    return !COMMON_WORDS_5000.includes(normalized) || countSyllables(normalized) >= 3;
  });
  const complexWordCount = complexWords.length;

  // Identify long sentences (>30 words)
  const longSentences = sentences
    .map(sentence => ({
      text: sentence.trim(),
      wordCount: sentence.split(/\s+/).filter(word => word.length > 0).length
    }))
    .filter(s => s.wordCount > 30);

  // Calculate Flesch Reading Ease PT-BR (0-100)
  const fleschScore = 226.835 - (1.015 * avgWordsPerSentence) - (72.2 * avgSyllablesPerWord);

  // Calculate Gulpease (0-100)
  const gulpeaseScore = 89 + ((300 * sentenceCount - 10 * letterCount) / wordCount);

  // Calculate Flesch-Kincaid PT-BR (0-20)
  const fleschKincaidScore = 0.36 * avgWordsPerSentence +
    10.4 * avgSyllablesPerWord -
    18;

  // Calculate Gunning Fog Adaptado (0-20)
  const gunningFogScore = 0.49 * avgWordsPerSentence +
    19 * (complexWordCount / wordCount);

  // Calculate ARI PT-BR (0-20)
  const ariScore = 4.6 * avgLettersPerWord +
    0.44 * avgWordsPerSentence -
    20;

  // Calculate Coleman-Liau PT-BR (0-20)
  const colemanLiauScore = 5.4 * avgLettersPerWord -
    21 * (sentenceCount / wordCount) -
    14;

  return {
    fleschScore: Math.max(0, Math.min(100, fleschScore)),
    gulpeaseScore: Math.max(0, Math.min(100, gulpeaseScore)),
    fleschKincaidScore: Math.max(0, Math.min(20, fleschKincaidScore)),
    gunningFogScore: Math.max(0, Math.min(20, gunningFogScore)),
    ariScore: Math.max(0, Math.min(20, ariScore)),
    colemanLiauScore: Math.max(0, Math.min(20, colemanLiauScore)),
    wordCount,
    sentenceCount,
    syllableCount,
    letterCount,
    complexWordCount,
    complexWords,
    avgWordsPerSentence,
    avgSyllablesPerWord,
    avgLettersPerWord,
    longSentences,
  };
}

function countSyllables(word: string): number {
  // Função específica para contar sílabas em português
  word = word.toLowerCase();
  
  // Remove pontuação e números
  word = word.replace(/[^a-záàâãéèêíïóôõöúçñ]/g, '');
  
  if (word.length <= 3) return 1;

  // Conta vogais, mas considera ditongos e tritongos
  let count = 0;
  const vowels = 'aáàâãeéèêiíïoóôõöuú';
  let isPreviousVowel = false;

  for (let i = 0; i < word.length; i++) {
    const isVowel = vowels.includes(word[i]);
    
    if (isVowel) {
      if (!isPreviousVowel) {
        count++;
      }
      // Casos especiais de hiatos
      else if (
        (word[i-1] === 'i' && 'aáàâãeéèêoóôõö'.includes(word[i])) ||
        (word[i-1] === 'u' && 'aáàâãeéèêiíï'.includes(word[i]))
      ) {
        count++;
      }
    }
    
    isPreviousVowel = isVowel;
  }

  // Ajusta para palavras terminadas em 'em/ens'
  if (word.match(/[aeo]m$|ens$/)) {
    count--;
  }

  return Math.max(1, count);
}