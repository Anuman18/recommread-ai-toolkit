// components/ai-tools/StoryRewriter.tsx
'use client';

import { useState } from 'react';
import { Loader2, Wand2, Copy, Save } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const StoryRewriter = () => {
  const [story, setStory] = useState('');
  const [instruction, setInstruction] = useState('Make it more emotional and engaging');
  const [rewrittenStory, setRewrittenStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  const supabase = createClient();

  const handleRewrite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setRewrittenStory('');
    setNotification('');

    try {
      const response = await fetch('/api/rewrite-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ story, instruction }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to rewrite story');
      }

      const data = await response.json();
      setRewrittenStory(data.rewrittenStory);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rewrittenStory);
    setNotification('Rewritten story copied to clipboard!');
  };
  
  const handleSave = async () => {
    if (!rewrittenStory) return;
    setNotification('');
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase.from('stories').insert({
        user_id: user.id,
        title: 'Rewritten Story', // Or derive a new title
        content: rewrittenStory,
      });

      if (error) {
        setNotification(`Error saving story: ${error.message}`);
      } else {
        setNotification('Rewritten story saved successfully!');
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Story Rewriter</h3>
      <form onSubmit={handleRewrite} className="space-y-4">
        <div>
          <label htmlFor="story-input-rewrite" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Paste your story here
          </label>
          <textarea
            id="story-input-rewrite"
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Enter your full story text..."
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 min-h-[200px]"
            required
          />
        </div>
        <div>
          <label htmlFor="instruction" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rewrite Instruction</label>
          <select id="instruction" value={instruction} onChange={(e) => setInstruction(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option>Make it more emotional and engaging</option>
            <option>Shorten it by 50% while keeping the core plot</option>
            <option>Improve the grammar and fix spelling mistakes</option>
            <option>Change the perspective from third-person to first-person</option>
            <option>Add more descriptive details and imagery</option>
          </select>
        </div>
        <button type="submit" disabled={isLoading} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
          {isLoading ? 'Rewriting...' : 'Rewrite Story'}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      
      {rewrittenStory && (
        <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Rewritten Story</h4>
            <div className="flex space-x-2">
              <button onClick={handleCopy} className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><Copy className="h-4 w-4" /></button>
              <button onClick={handleSave} className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><Save className="h-4 w-4" /></button>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{rewrittenStory}</p>
        </div>
      )}

      {notification && <p className="mt-4 text-sm text-green-600 dark:text-green-400">{notification}</p>}
    </div>
  );
};

export default StoryRewriter;
