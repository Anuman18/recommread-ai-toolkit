// components/ai-tools/StoryGenerator.tsx
'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { BookPlus, Copy, Loader2, Save } from 'lucide-react';

const StoryGenerator = () => {
  const [topic, setTopic] = useState('');
  const [genre, setGenre] = useState('Fantasy');
  const [tone, setTone] = useState('Epic');
  const [generatedStory, setGeneratedStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  const supabase = createClient();

  const handleGenerateStory = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setGeneratedStory('');
    setNotification('');

    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, genre, tone }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate story');
      }

      const data = await response.json();
      setGeneratedStory(data.story);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveStory = async () => {
    if (!generatedStory) return;
    setNotification('');
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase.from('stories').insert({
        user_id: user.id,
        title: topic || 'Untitled Story',
        content: generatedStory,
        genre: genre,
      });

      if (error) {
        setNotification(`Error saving story: ${error.message}`);
      } else {
        setNotification('Story saved successfully to your "Saved Stories"! ✨');
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedStory);
    setNotification('Story copied to clipboard!');
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">AI Story Generator</h3>
      <form onSubmit={handleGenerateStory} className="space-y-4">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            What should the story be about?
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., A lost knight searching for a mythical sword"
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Genre</label>
            <select id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option>Fantasy</option>
              <option>Sci-Fi</option>
              <option>Mystery</option>
              <option>Horror</option>
              <option>Romance</option>
              <option>Thriller</option>
            </select>
          </div>
          <div>
            <label htmlFor="tone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tone</label>
            <select id="tone" value={tone} onChange={(e) => setTone(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option>Epic</option>
              <option>Humorous</option>
              <option>Mysterious</option>
              <option>Somber</option>
              <option>Whimsical</option>
              <option>Tense</option>
            </select>
          </div>
        </div>
        <button type="submit" disabled={isLoading} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BookPlus className="mr-2 h-4 w-4" />}
          {isLoading ? 'Generating...' : 'Generate Story'}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      
      {generatedStory && (
        <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Generated Story</h4>
            <div className="flex space-x-2">
              <button onClick={handleCopy} className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><Copy className="h-4 w-4" /></button>
              <button onClick={handleSaveStory} className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><Save className="h-4 w-4" /></button>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{generatedStory}</p>
        </div>
      )}
      
      {notification && <p className="mt-4 text-sm text-green-600 dark:text-green-400">{notification}</p>}
    </div>
  );
};

export default StoryGenerator;