// components/ai-tools/ToneAnalyzer.tsx
'use client';

import { useState } from 'react';
import { Loader2, BarChart3 } from 'lucide-react';

type Tone = {
  tone: string;
  score: number;
  justification: string;
};

type ToneAnalysisResponse = {
  tones: Tone[];
};

const ToneAnalyzer = () => {
  const [story, setStory] = useState('');
  const [result, setResult] = useState<ToneAnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/analyze-tone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ story }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze tone');
      }

      const data = await response.json();
      setResult(data.content);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Tone Analyzer</h3>
      <form onSubmit={handleAnalyze} className="space-y-4">
        <div>
          <label htmlFor="story-input-tone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Paste your story to analyze its tone
          </label>
          <textarea
            id="story-input-tone"
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Enter your full story text..."
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 min-h-[200px]"
            required
          />
        </div>
        <button type="submit" disabled={isLoading} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BarChart3 className="mr-2 h-4 w-4" />}
          {isLoading ? 'Analyzing...' : 'Analyze Tone'}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      {result && (
        <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Tone Analysis</h4>
          <div className="space-y-4">
            {result.tones.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-base font-medium text-blue-700 dark:text-blue-400">{item.tone}</span>
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-400">{item.score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${item.score}%` }}></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">"{item.justification}"</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToneAnalyzer;
