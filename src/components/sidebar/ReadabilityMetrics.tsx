import React from 'react';
import { calculateReadabilityMetrics } from '../../utils/readability';
import { FloatingCard } from './FloatingCard';

interface ReadabilityMetricsProps {
  text: string;
}

export function ReadabilityMetrics({ text }: ReadabilityMetricsProps) {
  const metrics = calculateReadabilityMetrics(text);

  return (
    <FloatingCard title="Readability Analysis">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Flesch Reading Ease</h3>
          <div className="mt-1 flex items-baseline">
            <span className="text-2xl font-bold text-gray-900">{metrics.fleschScore.toFixed(1)}</span>
            <span className="ml-2 text-sm text-gray-500">
              {metrics.fleschScore > 80
                ? 'Easy to Read'
                : metrics.fleschScore > 60
                ? 'Fairly Easy'
                : 'Moderate'}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Gunning Fog Index</h3>
          <div className="mt-1 flex items-baseline">
            <span className="text-2xl font-bold text-gray-900">{metrics.fogIndex.toFixed(1)}</span>
            <span className="ml-2 text-sm text-gray-500">Grade Level</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Words</dt>
              <dd className="mt-1 text-2xl font-semibold text-gray-900">{metrics.wordCount}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Sentences</dt>
              <dd className="mt-1 text-2xl font-semibold text-gray-900">{metrics.sentenceCount}</dd>
            </div>
          </dl>
        </div>
      </div>
    </FloatingCard>
  );
}