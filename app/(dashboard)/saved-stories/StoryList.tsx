// components/saved-stories/StoryList.tsx
'use client';

import { useState, useEffect } from 'react';
import { Story } from '@/lib/types';
import { createClient } from '@/lib/supabase/client';
import { Trash2, Eye, X } from 'lucide-react';

type StoryListProps = {
  serverStories: Story[];
};

export default function StoryList({ serverStories }: StoryListProps) {
  const [stories, setStories] = useState<Story[]>(serverStories);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [storyToDelete, setStoryToDelete] = useState<Story | null>(null);
  const [notification, setNotification] = useState('');

  const supabase = createClient();

  useEffect(() => {
    setStories(serverStories);
  }, [serverStories]);

  const handleDeleteClick = (story: Story) => {
    setStoryToDelete(story);
  };

  const confirmDelete = async () => {
    if (!storyToDelete) return;

    const { error } = await supabase
      .from('stories')
      .delete()
      .match({ id: storyToDelete.id });

    if (error) {
      setNotification(`Error deleting story: ${error.message}`);
    } else {
      setStories(stories.filter((s) => s.id !== storyToDelete.id));
      setNotification('Story deleted successfully.');
    }
    setStoryToDelete(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (stories.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No Saved Stories Yet</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Use the AI Story Generator to create and save your first story!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {stories.map((story) => (
            <li key={story.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 truncate">{story.title || 'Untitled Story'}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Saved on {formatDate(story.created_at)}
                  </p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button onClick={() => setSelectedStory(story)} className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Eye className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDeleteClick(story)} className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* View Story Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedStory.title}</h3>
              <button onClick={() => setSelectedStory(null)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedStory.content}</p>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {storyToDelete && (
         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
             <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Confirm Deletion</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Are you sure you want to delete the story "{storyToDelete.title}"? This action cannot be undone.
                </p>
             </div>
             <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-3 flex justify-end space-x-3">
                <button onClick={() => setStoryToDelete(null)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-600 dark:text-gray-200 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-50 dark:hover:bg-gray-500">
                  Cancel
                </button>
                <button onClick={confirmDelete} className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700">
                  Delete
                </button>
             </div>
           </div>
         </div>
      )}

      {notification && (
        <div className="fixed bottom-5 right-5 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
          {notification}
        </div>
      )}
    </>
  );
}
