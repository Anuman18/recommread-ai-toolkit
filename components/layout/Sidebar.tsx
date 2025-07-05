// components/layout/Sidebar.tsx
// ... other imports
import { ThemeToggle } from './ThemeToggle';

export const Sidebar = () => {
  // ... existing code
  return (
    <aside>
      {/* ... existing nav code ... */}
      <div className="mt-auto">
        <ThemeToggle />
      </div>
    </aside>
  );
};
