export function calculateStats(
  content: string,
  activeWritingTime: number
): { wordsCount: number; averageWPM: number } {
  // Remove HTML tags e espaços extras
  const cleanContent = content.replace(/<[^>]*>/g, '').trim();
  
  // Divide por espaços e filtra palavras vazias
  const words = cleanContent.split(/\s+/).filter(word => word.length > 0);
  const wordsCount = words.length;
  
  // Converte o tempo ativo de segundos para minutos
  const minutesActive = activeWritingTime / 60;
  
  // Calcula WPM usando apenas o tempo ativo de escrita
  const averageWPM = Math.round(wordsCount / Math.max(minutesActive, 1));

  return {
    wordsCount,
    averageWPM
  };
}