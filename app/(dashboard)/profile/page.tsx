// app/(dashboard)/profile/page.tsx
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import SignOutButton from '@/components/layout/SignOutButton';

export default async function ProfilePage() {
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

  const { data: { user } } = await supabase.auth.getUser();
  const { data: stories, error } = await supabase.from('stories').select('id');

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Profile</h2>
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{user?.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">User ID</label>
            <p className="text-sm font-mono text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 p-2 rounded">{user?.id}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Saved Stories</label>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{stories?.length ?? 0}</p>
          </div>
          <div className="pt-4">
            <SignOutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
