// Example: app/(dashboard)/dashboard/page.tsx
import React from 'react';

const DashboardPage = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Overview of your recent activity and stories.
      </p>
      {/* More content will go here */}
    </div>
  );
};

export default DashboardPage;