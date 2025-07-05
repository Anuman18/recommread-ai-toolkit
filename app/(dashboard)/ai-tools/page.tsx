// app/(dashboard)/ai-tools/page.tsx
import StoryGenerator from '@/components/ai-tools/StoryGenerator';
import React from 'react';

const AIToolsPage = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">AI Tools</h2>
      
      {/* We can add a tabbed interface here later to switch between tools */}
      <div className="max-w-4xl mx-auto">
        <StoryGenerator />
      </div>
    </div>
  );
};

export default AIToolsPage;