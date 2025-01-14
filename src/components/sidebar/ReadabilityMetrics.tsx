import React, { useMemo } from 'react';
import { Info, Eye, EyeOff } from 'lucide-react';
import { calculateReadabilityMetrics } from '../../utils/readability';
import './ReadabilityMetrics.css';

interface TextWarning {
  type: 'long' | 'very-long';
  count: number;
  message: string;
}

interface ReadabilityMetricsProps {
  text: string;
  highlightVisibility?: {
    longSentences: boolean;
    veryLongSentences: boolean;
  };
  onToggleVisibility?: (type: 'longSentences' | 'veryLongSentences') => void;
}

export function ReadabilityMetrics({ 
  text, 
  highlightVisibility = { longSentences: true, veryLongSentences: true },
  onToggleVisibility 
}: ReadabilityMetricsProps) {
  const metrics = useMemo(() => calculateReadabilityMetrics(text), [text]);

  // Calcula os warnings para orações longas
  const warnings = useMemo(() => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    let longCount = 0;
    let veryLongCount = 0;

    for (const sentence of sentences) {
      const wordCount = sentence.split(/\s+/).filter(word => word.length > 0).length;
      if (wordCount >= 35) {
        veryLongCount++;
      } else if (wordCount >= 25) {
        longCount++;
      }
    }

    const warnings: TextWarning[] = [];
    
    // Sempre adiciona os warnings, mesmo com count 0
    warnings.push({
      type: 'very-long',
      count: veryLongCount,
      message: 'Considere dividir orações com mais de 35 palavras para melhorar a legibilidade.'
    });

    warnings.push({
      type: 'long',
      count: longCount,
      message: 'Considere dividir orações com mais de 25 palavras para melhorar a legibilidade.'
    });

    return warnings;
  }, [text]);

  // Determina o nível de legibilidade geral
  const getReadabilityLevel = () => {
    const avgGrade = (
      metrics.fleschKincaidScore + 
      metrics.gunningFogScore + 
      metrics.ariScore + 
      metrics.colemanLiauScore
    ) / 4;

    if (avgGrade < 6) return { level: 'Nível 20 - Muito Alta Legibilidade', description: 'Texto muito simples, adequado para crianças até 11 anos.', color: 'bg-emerald-50 text-emerald-900' };
    if (avgGrade < 9) return { level: 'Nível 15 - Alta Legibilidade', description: 'Texto simples, adequado para adolescentes entre 12 e 14 anos.', color: 'bg-green-50 text-green-900' };
    if (avgGrade < 12) return { level: 'Nível 10 - Média Legibilidade', description: 'Texto moderado, adequado para adolescentes entre 15 e 16 anos.', color: 'bg-amber-50 text-amber-900' };
    if (avgGrade < 15) return { level: 'Nível 5 - Baixa Legibilidade', description: 'Texto complexo, adequado para adultos com ensino médio completo.', color: 'bg-orange-50 text-orange-900' };
    return { level: 'Nível 1 - Muito Baixa Legibilidade', description: 'Texto muito complexo, adequado para adultos com ensino superior.', color: 'bg-red-50 text-red-900' };
  };

  const readabilityLevel = getReadabilityLevel();

  // Lista de métricas para renderizar
  const metricsList = [
    { 
      name: 'Flesch',
      value: metrics.fleschScore,
      maxValue: 100,
      color: metrics.fleschScore > 75 ? 'bg-emerald-500' : 
             metrics.fleschScore > 50 ? 'bg-green-500' :
             metrics.fleschScore > 25 ? 'bg-yellow-500' : 'bg-red-500',
      description: 'Teste de facilidade de leitura. Quanto maior, mais fácil de ler é o texto.'
    },
    { 
      name: 'Gulpease',
      value: metrics.gulpeaseScore,
      maxValue: 100,
      color: metrics.gulpeaseScore > 80 ? 'bg-emerald-500' : 
             metrics.gulpeaseScore > 60 ? 'bg-green-500' :
             metrics.gulpeaseScore > 40 ? 'bg-yellow-500' : 'bg-red-500',
      description: 'Índice italiano adaptado para português. Valores acima de 80 indicam texto muito fácil, abaixo de 40 muito difícil.'
    },
    { 
      name: 'Flesch-Kincaid',
      value: metrics.fleschKincaidScore,
      maxValue: 20,
      color: metrics.fleschKincaidScore < 6 ? 'bg-emerald-500' :
             metrics.fleschKincaidScore < 9 ? 'bg-green-500' :
             metrics.fleschKincaidScore < 12 ? 'bg-yellow-500' : 'bg-red-500',
      description: 'Nível de escolaridade necessário para compreensão. Baseado no sistema educacional americano.'
    },
    { 
      name: 'Gunning Fog',
      value: metrics.gunningFogScore,
      maxValue: 20,
      color: metrics.gunningFogScore < 6 ? 'bg-emerald-500' :
             metrics.gunningFogScore < 9 ? 'bg-green-500' :
             metrics.gunningFogScore < 12 ? 'bg-yellow-500' : 'bg-red-500',
      description: 'Índice de nebulosidade. Estima anos de educação formal necessários para compreender o texto.'
    },
    { 
      name: 'ARI',
      value: metrics.ariScore,
      maxValue: 20,
      color: metrics.ariScore < 6 ? 'bg-emerald-500' :
             metrics.ariScore < 9 ? 'bg-green-500' :
             metrics.ariScore < 12 ? 'bg-yellow-500' : 'bg-red-500',
      description: 'Índice de leiturabilidade automatizado. Baseado no número de caracteres, palavras e frases.'
    },
    { 
      name: 'Coleman-Liau',
      value: metrics.colemanLiauScore,
      maxValue: 20,
      color: metrics.colemanLiauScore < 6 ? 'bg-emerald-500' :
             metrics.colemanLiauScore < 9 ? 'bg-green-500' :
             metrics.colemanLiauScore < 12 ? 'bg-yellow-500' : 'bg-red-500',
      description: 'Avalia a complexidade do texto baseado no número médio de letras e frases por 100 palavras.'
    }
  ];

  return (
    <div className="fixed right-4 top-20 w-64 bg-white rounded-lg shadow-lg border border-gray-200 text-xs">
      {/* Header Result Card */}
      <div className={`p-3 ${readabilityLevel.color} rounded-t-lg`}>
        <h2 className="font-semibold text-sm">
          {readabilityLevel.level}
        </h2>
        <p className="text-xs mt-0.5 opacity-90">
          {readabilityLevel.description}
        </p>
      </div>

      {/* Metrics List */}
      <div className="p-3 space-y-3">
        {metricsList.map((metric, index) => (
          <div 
            key={index}
            className="group relative"
          >
            <div className="flex items-center justify-between text-gray-700">
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium">
                  {metric.name}
                </span>
                <div className="relative">
                  <Info className="w-3 h-3 text-gray-400 cursor-help" />
                  <div className="absolute left-0 bottom-full mb-1 w-40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-gray-800 text-gray-200 text-[10px] p-1.5 rounded-lg shadow-lg">
                      {metric.description}
                    </div>
                  </div>
                </div>
              </div>
              <span className="text-xs font-semibold">
                {metric.value.toFixed(1)}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="relative h-1 bg-gray-100 rounded-full overflow-hidden mt-1">
              <div 
                className={`absolute h-full left-0 top-0 rounded-full transition-all duration-500 ease-out ${metric.color}`}
                style={{ width: `${(metric.value / metric.maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}

        {/* Basic Stats */}
        <div className="grid grid-cols-2 gap-2 pt-2 mt-2 border-t border-gray-200">
          <div className="bg-gray-50 p-1.5 rounded">
            <h3 className="text-[10px] text-gray-500">Palavras</h3>
            <span className="text-sm font-semibold text-gray-900">
              {metrics.wordCount}
            </span>
          </div>

          <div className="bg-gray-50 p-1.5 rounded">
            <h3 className="text-[10px] text-gray-500">Tempo de Leitura</h3>
            <span className="text-sm font-semibold text-gray-900">
              {(() => {
                const seconds = Math.ceil((metrics.wordCount / 150) * 60);
                if (seconds < 60) {
                  return `${seconds} seg`;
                }
                return `${Math.ceil(seconds / 60)} min`;
              })()}
            </span>
          </div>
        </div>

        {/* Cards de Aviso - Sempre Visíveis */}
        <div className="mt-2 pt-2 border-t border-gray-200">
          {/* Card para Orações Muito Longas */}
          <div className={`p-3 rounded-lg bg-red-100 text-red-800 mb-2 ${warnings.find(w => w.type === 'very-long')?.count ? 'opacity-100' : 'opacity-60'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info className="w-3 h-3 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="font-medium">
                  {warnings.find(w => w.type === 'very-long')?.count || 0} orações muito longas
                </span>
              </div>
              {onToggleVisibility && (
                <button 
                  className="visibility-toggle"
                  onClick={() => onToggleVisibility('veryLongSentences')}
                  title={highlightVisibility.veryLongSentences ? "Esconder orações muito longas" : "Mostrar orações muito longas"}
                >
                  {highlightVisibility.veryLongSentences ? <Eye size={10} className="text-red-500" /> : <EyeOff size={10} className="text-red-300" />}
                </button>
              )}
            </div>
            <p className="text-[10px] mt-1 opacity-75">
              Considere dividir orações com mais de 35 palavras para melhorar a legibilidade.
            </p>
          </div>

          {/* Card para Orações Longas */}
          <div className={`p-3 rounded-lg bg-yellow-100 text-yellow-800 ${warnings.find(w => w.type === 'long')?.count ? 'opacity-100' : 'opacity-60'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info className="w-3 h-3 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span className="font-medium">
                  {warnings.find(w => w.type === 'long')?.count || 0} orações longas
                </span>
              </div>
              {onToggleVisibility && (
                <button 
                  className="visibility-toggle"
                  onClick={() => onToggleVisibility('longSentences')}
                  title={highlightVisibility.longSentences ? "Esconder orações longas" : "Mostrar orações longas"}
                >
                  {highlightVisibility.longSentences ? <Eye size={10} className="text-yellow-500" /> : <EyeOff size={10} className="text-yellow-300" />}
                </button>
              )}
            </div>
            <p className="text-[10px] mt-1 opacity-75">
              Considere dividir orações com mais de 25 palavras para melhorar a legibilidade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}