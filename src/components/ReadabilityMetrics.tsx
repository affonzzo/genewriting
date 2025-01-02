import React from 'react';
import { calculateReadabilityMetrics } from '../utils/readability';

interface ReadabilityMetricsProps {
  text: string;
}

export default function ReadabilityMetrics({ text }: ReadabilityMetricsProps) {
  const metrics = calculateReadabilityMetrics(text);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Readability Analysis</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-sm text-gray-500">Flesch Reading Ease</h3>
          <div className="mt-1">
            <span className="text-2xl font-bold">{metrics.fleschScore.toFixed(1)}</span>
            <span className="text-sm text-gray-500 ml-2">
              {metrics.fleschScore > 80
                ? 'Easy to Read'
                : metrics.fleschScore > 60
                ? 'Fairly Easy to Read'
                : 'Moderate to Read'}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-sm text-gray-500">Gunning Fog Index</h3>
          <div className="mt-1">
            <span className="text-2xl font-bold">{metrics.fogIndex.toFixed(1)}</span>
            <span className="text-sm text-gray-500 ml-2">
              Grade Level
            </span>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900">Text Statistics</h3>
          <dl className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-gray-500">Words</dt>
              <dd className="text-lg font-medium">{metrics.wordCount}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Sentences</dt>
              <dd className="text-lg font-medium">{metrics.sentenceCount}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Complex Words</dt>
              <dd className="text-lg font-medium">{metrics.complexWordCount}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Avg. Words per Sentence</dt>
              <dd className="text-lg font-medium">
                {metrics.avgWordsPerSentence.toFixed(1)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}