// components/ai-tools/TitleGenerator.tsx
'use client';

import { useState } from 'react';
import { Loader2, Sparkles, Copy } from 'lucide-react';

type TitleTaglineResponse = {
  titles: { title: string }[];
  taglines: { tagline: string }[];
};

const TitleGenerator = () => {
  const [story, setStory] = useState('');
  const [result, setResult] = useState<TitleTaglineResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResult(null);
    setNotification('');

    try {
      const response = await fetch('/api/generate-title', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ story }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate');
      }

      const data = await response.json();
      setResult(data.content);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setNotification(`Copied: "${text}"`);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Title & Tagline Generator</h3>
      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label htmlFor="story-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Paste your story here
          </label>
          <textarea
            id="story-input"
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Enter your full story text..."
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 min-h-[200px]"
            required
          />
        </div>
        <button type="submit" disabled={isLoading} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
          {isLoading ? 'Generating...' : 'Generate Titles & Taglines'}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      {notification && <p className="mt-4 text-sm text-green-600 dark:text-green-400">{notification}</p>}

      {result && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Generated Titles</h4>
            <ul className="space-y-2">
              {result.titles.map((item, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-900/50 p-2 rounded-md">
                  <span className="text-gray-700 dark:text-gray-300">{item.title}</span>
                  <button onClick={() => handleCopy(item.title)} className="p-1 text-gray-400 hover:text-gray-600"><Copy className="h-4 w-4" /></button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Generated Taglines</h4>
            <ul className="space-y-2">
              {result.taglines.map((item, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-900/50 p-2 rounded-md">
                  <span className="text-gray-700 dark:text-gray-300">{item.tagline}</span>
                  <button onClick={() => handleCopy(item.tagline)} className="p-1 text-gray-400 hover:text-gray-600"><Copy className="h-4 w-4" /></button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TitleGenerator;
