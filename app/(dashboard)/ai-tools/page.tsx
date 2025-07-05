// app/(dashboard)/ai-tools/page.tsx
import Tabs from '@/components/ui/Tabs';
import StoryGenerator from '@/components/ai-tools/StoryGenerator';
import TitleGenerator from '@/components/ai-tools/TitleGenerator';
import GenreSuggestor from '@/components/ai-tools/GenreSuggestor';
import StoryRewriter from '@/components/ai-tools/StoryRewriter';
import ToneAnalyzer from '@/components/ai-tools/ToneAnalyzer';
import { BookPlus, Milestone, Tag, Wand2, BarChart3 } from 'lucide-react';

const AIToolsPage = () => {
  const tools = [
    { label: 'Story Generator', icon: BookPlus, content: <StoryGenerator /> },
    { label: 'Title & Tagline', icon: Milestone, content: <TitleGenerator /> },
    { label: 'Genre Suggestor', icon: Tag, content: <GenreSuggestor /> },
    { label: 'Story Rewriter', icon: Wand2, content: <StoryRewriter /> },
    { label: 'Tone Analyzer', icon: BarChart3, content: <ToneAnalyzer /> },
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
