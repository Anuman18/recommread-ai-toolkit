// components/layout/Header.tsx
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import SignOutButton from './SignOutButton'

export default async function Header() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-30 flex w-full bg-white dark:bg-gray-800 drop-shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {user ? `Welcome, ${user.email?.split('@')[0]}` : 'Welcome'}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <SignOutButton />
          ) : (
            // You could put a "Sign In" link here if you wanted
            null
          )}
        </div>
      </div>
    </header>
  )
}