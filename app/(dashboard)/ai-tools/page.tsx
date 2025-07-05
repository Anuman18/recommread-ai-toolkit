// app/(dashboard)/ai-tools/page.tsx
import Tabs from '@/components/ui/Tabs';
import StoryGenerator from '@/components/ai-tools/StoryGenerator';
import TitleGenerator from '@/components/ai-tools/TitleGenerator';
import GenreSuggestor from '@/components/ai-tools/GenreSuggestor';
import { BookPlus, Milestone, Tag } from 'lucide-react';

const AIToolsPage = () => {
  const tools = [
    {
      label: 'Story Generator',
      icon: BookPlus,
      content: <StoryGenerator />,
    },
    {
      label: 'Title & Tagline',
      icon: Milestone,
      content: <TitleGenerator />,
    },
    {
      label: 'Genre Suggestor',
      icon: Tag,
      content: <GenreSuggestor />,
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">AI Writing Toolkit</h2>
      <div className="max-w-4xl mx-auto">
        <Tabs tabs={tools} />
      </div>
    </div>
  );
};

export default AIToolsPage;
