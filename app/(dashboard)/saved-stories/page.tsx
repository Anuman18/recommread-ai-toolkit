// app/(dashboard)/saved-stories/page.tsx
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import StoryList from '@/components/saved-stories/StoryList';
import { Story } from '@/lib/types';

async function getStories(supabase: any): Promise<Story[]> {
  const { data, error } = await supabase
    .from('stories')
    .select('id, created_at, title, content, genre')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching stories:', error);
    return [];
  }
  return data;
}

export default async function SavedStoriesPage() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const stories = await getStories(supabase);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Saved Stories</h2>
      </div>
      <StoryList serverStories={stories} />
    </div>
  );
}
