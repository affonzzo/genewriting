import React from 'react';
import { Info } from 'lucide-react';
import { calculateReadabilityMetrics } from '../../utils/readability';

interface ReadabilityMetricsProps {
  text: string;
}

export function ReadabilityMetrics({ text }: ReadabilityMetricsProps) {
  const metrics = calculateReadabilityMetrics(text);

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
      description: 'Índice de facilidade de leitura. Quanto maior, mais fácil de ler é o texto.'
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
            <h3 className="text-[10px] text-gray-500">Sentenças</h3>
            <span className="text-sm font-semibold text-gray-900">
              {metrics.sentenceCount}
            </span>
          </div>
          <div className="bg-gray-50 p-1.5 rounded">
            <h3 className="text-[10px] text-gray-500">Sílabas</h3>
            <span className="text-sm font-semibold text-gray-900">
              {metrics.syllableCount}
            </span>
          </div>
          <div className="bg-gray-50 p-1.5 rounded">
            <h3 className="text-[10px] text-gray-500">Complexas</h3>
            <span className="text-sm font-semibold text-gray-900">
              {metrics.complexWordCount}
            </span>
          </div>
        </div>

        {/* Long Sentences Warning */}
        {metrics.longSentences.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="bg-red-50 p-2 rounded">
              <div className="flex items-start gap-1.5">
                <Info className="w-3 h-3 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-medium text-red-800">
                    {metrics.longSentences.length} frase{metrics.longSentences.length !== 1 && 's'} longa{metrics.longSentences.length !== 1 && 's'}
                  </h3>
                  <p className="mt-0.5 text-[10px] text-red-700">
                    Considere dividir frases com mais de 30 palavras para melhorar a legibilidade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}