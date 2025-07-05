// components/ai-tools/GenreSuggestor.tsx
'use client';

import { useState } from 'react';
import { Loader2, Tag } from 'lucide-react';

type GenreResponse = {
  genre: string;
  subgenre: string;
  justification: string;
};

const GenreSuggestor = () => {
  const [story, setStory] = useState('');
  const [result, setResult] = useState<GenreResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/suggest-genre', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ story }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to suggest genre');
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
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Genre Suggestion Tool</h3>
      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label htmlFor="story-input-genre" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Paste your story to find its genre
          </label>
          <textarea
            id="story-input-genre"
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Enter your full story text..."
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 min-h-[200px]"
            required
          />
        </div>
        <button type="submit" disabled={isLoading} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Tag className="mr-2 h-4 w-4" />}
          {isLoading ? 'Analyzing...' : 'Suggest Genre'}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      {result && (
        <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Analysis Result</h4>
          <div className='space-y-2'>
            <p className="text-gray-700 dark:text-gray-300"><strong>Primary Genre:</strong> <span className='font-mono p-1 bg-gray-200 dark:bg-gray-700 rounded text-sm'>{result.genre}</span></p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Subgenre:</strong> <span className='font-mono p-1 bg-gray-200 dark:bg-gray-700 rounded text-sm'>{result.subgenre}</span></p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Justification:</strong> {result.justification}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenreSuggestor;
