// components/layout/Header.tsx
import React from 'react';

const Header = () => {
  return (
    <header className="sticky top-0 z-30 flex w-full bg-white dark:bg-gray-800 drop-shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Welcome Back</h1>
        </div>
        <div>
          {/* User profile button will go here */}
        </div>
      </div>
    </header>
  );
};

export default Header;