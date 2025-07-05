// components/layout/Sidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, LayoutDashboard, BrainCircuit, User } from 'lucide-react';

const sidebarNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/ai-tools', label: 'AI Tools', icon: BrainCircuit },
  { href: '/saved-stories', label: 'Saved Stories', icon: BookOpen },
  { href: '/profile', label: 'Profile', icon: User },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 p-4 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="mb-10">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">RecommRead</span>
        </Link>
      </div>
      <nav className="flex-grow">
        <ul>
          {sidebarNavItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center p-3 my-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  pathname === item.href ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-white' : ''
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        {/* Placeholder for Dark/Light mode toggle or other footer items */}
      </div>
    </aside>
  );
};

export default Sidebar;